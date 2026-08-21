import '../styles/globals.css';

// next head
import Head from 'next/head';

// components
import Layout from '../components/Layout';
import Transition from '../components/Transition';

// router
import { useRouter } from 'next/router';

// framer motion
import { AnimatePresence, motion } from 'framer-motion';

// structured data
import { siteGraph } from '../lib/structuredData';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <Head>
        {/* Viewport lives here rather than _document — Next.js requires it. */}
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        {/* Site-wide entity graph (Person + WebSite), emitted on every page. */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph()) }}
        />
      </Head>
      <Layout>
        <AnimatePresence mode='wait'>
          <motion.div key={router.route} className='h-full'>
            <Transition />
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </>
  );
}

export default MyApp;
