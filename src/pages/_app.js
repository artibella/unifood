import { UniformContext } from '@uniformdev/context-react';
import Layout from '../components/layout';
import { createUniformContext } from '../lib/context/uniformContext';

import '../styles/globals.css';
import '../styles/page.css';
// import fonts
import { Source_Serif_Pro, Inter } from 'next/font/google';

const sourceSerif = Source_Serif_Pro({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-source-serif-pro',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const clientContext = createUniformContext();

function UnifoodApp({ Component, pageProps, serverUniformContext }) {
  return (
    <UniformContext context={serverUniformContext ?? clientContext}>
      <main className={`${sourceSerif.variable} ${inter.variable} font-sans`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </UniformContext>
  );
}

export default UnifoodApp;
