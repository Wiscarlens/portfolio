'use client';

import { useState } from 'react';

// icons
import { BsArrowRight } from 'react-icons/bs';

// framer
import { motion } from 'framer-motion';

// variants
import { fadeIn } from '../../variants';


type Status = 'idle' | 'sending' | 'sent' | 'error';

/** Mirrors the server's rules so the user sees the reason instantly, with
 *  no round trip and no cost against their send allowance. The server
 *  re-checks everything regardless — this is UX, not security.
 *
 *  Done in JS rather than relying on the `minlength` attribute, whose
 *  tooShort constraint only applies under conditions browsers treat
 *  inconsistently; it reported valid on an 8-character value in testing. */
const EMAIL = /^[^@\s]+@[^@\s]+\.[A-Za-z]{2,}$/;

const validate = (data: Record<string, string>) => {
  const errors: Record<string, string> = {};
  if (!data.name?.trim()) errors.name = 'Name is required.';
  if (!data.email?.trim()) errors.email = 'Email is required.';
  else if (!EMAIL.test(data.email.trim()))
    errors.email = 'That email address is not valid.';
  if (!data.message?.trim()) errors.message = 'Message is required.';
  else if (data.message.trim().length < 10)
    errors.message = 'Please write at least 10 characters.';
  return errors;
};

const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p className='mt-1.5 text-left text-xs text-accent'>{message}</p>
  ) : null;

const ContactContent = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    const localErrors = validate(data);
    if (Object.keys(localErrors).length) {
      setStatus('error');
      setFieldErrors(localErrors);
      setFeedback('Please fix the highlighted fields.');
      return;
    }

    setStatus('sending');
    setFeedback('');
    setFieldErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const payload = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        // Surface which field failed. Without this the user sees only
        // "Please check the form" and has to guess.
        setFieldErrors(payload.errors ?? {});
        setFeedback(payload.error ?? 'Something went wrong. Please try again.');
        return;
      }

      form.reset();
      setFieldErrors({});
      setStatus('sent');
      setFeedback("Got it. I'll get back to you soon.");
    } catch {
      setStatus('error');
      setFeedback('Could not reach the server. Check your connection.');
    }
  };

  return (
    <div className='min-h-screen xl:h-full bg-primary/30'>
      <div className='container mx-auto pt-36 pb-28 xl:py-32 text-center xl:text-left flex items-start xl:items-center justify-center min-h-screen xl:h-full'>
        {/* text & form */}
        <div className='flex flex-col w-full max-w-[700px]'>
          {/* text */}
          <motion.h1
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h2 text-center mb-12'
          >
            Let&apos;s <span className='text-accent'>connect.</span>
          </motion.h1>
          {/* form — submits via mailto so it works without a backend */}
          <motion.form
            variants={fadeIn('up', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
            onSubmit={handleSubmit}
            noValidate={false}
            className='flex-1 flex flex-col gap-6 w-full mx-auto'
          >
            {/* Honeypot. Hidden from people, irresistible to bots; the server
                silently discards any submission that fills it. Not display:none,
                which some bots detect and skip. */}
            <div className='absolute -left-[9999px] w-px h-px overflow-hidden' aria-hidden='true'>
              <label htmlFor='company'>Company</label>
              <input
                id='company'
                type='text'
                name='company'
                tabIndex={-1}
                autoComplete='off'
              />
            </div>
            {/* input group */}
            <div className='flex flex-col sm:flex-row gap-6 w-full'>
              <div className='flex-1'>
                <input
                  type='text'
                  name='name'
                  placeholder='name'
                  className='input'
                  required
                  maxLength={100}
                />
                <FieldError message={fieldErrors.name} />
              </div>
              <div className='flex-1'>
                <input
                  type='email'
                  name='email'
                  placeholder='email'
                  className='input lowercase'
                  required
                  maxLength={254}
                  // type='email' alone accepts "a@b": the HTML spec's grammar
                  // allows a bare hostname with no dot. Require a dot and a
                  // 2+ character TLD on top of it. Deliberately permissive
                  // about the rest — plus-tags, subdomains and long TLDs are
                  // all legitimate, and over-strict rules reject real people.
                  pattern='[^@\s]+@[^@\s]+\.[A-Za-z]{2,}'
                  title='Enter a full email address, like name@example.com'
                  autoComplete='email'
                  inputMode='email'
                  // Phone keyboards capitalise the first letter, producing
                  // "Wiscarlens@Gmail.Com". Normalise as they type; length
                  // never changes so the caret stays put.
                  autoCapitalize='none'
                  spellCheck={false}
                  onChange={(event) => {
                    event.currentTarget.value =
                      event.currentTarget.value.toLowerCase();
                  }}
                />
                <FieldError message={fieldErrors.email} />
              </div>
            </div>
            <input
              type='text'
              name='subject'
              placeholder='subject'
              className='input'
              maxLength={150}
            />
            <div>
              <textarea
                name='message'
                placeholder='message'
                className='textarea'
                required
                // Enforced server-side too; having it here means the browser
                // catches a short message before it costs a round trip.
                minLength={10}
                maxLength={5000}
              ></textarea>
              <FieldError message={fieldErrors.message} />
            </div>
            <div className='flex flex-col gap-4 items-center xl:items-start'>
              <button
                type='submit'
                disabled={status === 'sending'}
                className='btn rounded-full border border-white/50 max-w-[170px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-white/50'
              >
                <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500'>
                  {status === 'sending' ? 'Sending…' : "Let's talk"}
                </span>
                <BsArrowRight className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]' />
              </button>

              {/* aria-live so screen readers announce the result without
                  moving focus away from the form. */}
              <div role='status' aria-live='polite' className='min-h-[24px]'>
                {feedback && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-sm ${
                      status === 'error' ? 'text-accent' : 'text-white/70'
                    }`}
                  >
                    {feedback}
                  </motion.p>
                )}
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default ContactContent;
