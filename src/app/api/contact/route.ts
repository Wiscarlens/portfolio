import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
// Never cache a POST endpoint's module output.
export const dynamic = 'force-dynamic';

/** Same rule the input enforces: a dot and a 2+ character TLD. */
const EMAIL = /^[^@\s]+@[^@\s]+\.[A-Za-z]{2,}$/;

const LIMITS = { name: 100, email: 254, subject: 150, message: 5000 };

// Two in-process limiters, both per IP per 10 minutes.
//
// `delivered` is the one that matters: 5 messages that actually reach
// Discord. `requests` is a looser flood guard so a bot can't hammer the
// endpoint with junk for free.
//
// They are separate because a person who mistypes and resubmits should not
// burn their allowance on validation failures — that locks them out of a
// rule they were never shown. Only a message on its way out counts.
//
// Both reset on restart and are per-container. Fine for a single instance;
// move to Redis before running replicas.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_DELIVERED = 5;
const MAX_REQUESTS = 30;

const buckets = { delivered: new Map<string, number[]>(), requests: new Map<string, number[]>() };

function recent(map: Map<string, number[]>, ip: string): number[] {
  const now = Date.now();
  const times = (map.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  map.set(ip, times);
  // Opportunistic cleanup so the maps can't grow without bound.
  if (map.size > 500) {
    for (const [key, ts] of map) {
      if (ts.every((t) => now - t >= WINDOW_MS)) map.delete(key);
    }
  }
  return times;
}

/** Record an attempt and report whether it exceeded the cap. */
function exceeded(map: Map<string, number[]>, ip: string, max: number): boolean {
  const times = recent(map, ip);
  times.push(Date.now());
  return times.length > max;
}

const clean = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST(request: Request) {
  const webhook = process.env.CONTACT_DISCORD_WEBHOOK_URL;
  if (!webhook) {
    console.error('CONTACT_DISCORD_WEBHOOK_URL is not set');
    return NextResponse.json(
      { error: 'The contact form is not configured right now.' },
      { status: 503 }
    );
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  // Flood guard only. Validation failures are cheap and must not cost the
  // sender their delivery allowance.
  if (exceeded(buckets.requests, ip, MAX_REQUESTS)) {
    return NextResponse.json(
      { error: 'Too many requests. Try again in a few minutes.' },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 });
  }

  // Honeypot: a field hidden from people and irresistible to bots. Respond
  // 200 so the bot believes it succeeded and doesn't retry with variations.
  if (clean(body.company, 100) !== '') {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email).toLowerCase();
  const subject = clean(body.subject, LIMITS.subject);
  const message = clean(body.message, LIMITS.message);

  // Re-validate server-side: `required` and `pattern` are client-side hints
  // that anyone can bypass by POSTing directly.
  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Name is required.';
  if (!email) errors.email = 'Email is required.';
  else if (!EMAIL.test(email)) errors.email = 'That email address is not valid.';
  if (!message) errors.message = 'Message is required.';
  else if (message.length < 10) errors.message = 'Please write a little more.';

  if (Object.keys(errors).length) {
    return NextResponse.json({ error: 'Please check the form.', errors }, { status: 400 });
  }

  if (exceeded(buckets.delivered, ip, MAX_DELIVERED)) {
    return NextResponse.json(
      { error: 'Too many messages. Try again in a few minutes.' },
      { status: 429 }
    );
  }

  const discord = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'wiscarlens.com',
      // Without this a visitor could type @everyone and ping the server.
      allowed_mentions: { parse: [] },
      embeds: [
        {
          title: subject || 'New contact form message',
          description: message.slice(0, 4000),
          color: 0xf13024,
          fields: [
            { name: 'Name', value: name, inline: true },
            { name: 'Email', value: email, inline: true },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  }).catch(() => null);

  if (!discord || !discord.ok) {
    console.error('Discord webhook failed', discord?.status);
    return NextResponse.json(
      { error: "That didn't send. Please email info@wiscarlens.com instead." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
