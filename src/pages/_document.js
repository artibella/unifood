import { Html, Head, Main, NextScript } from 'next/document';
import * as gtag from '../lib/gtag';

export default function Document() {
  let tagManagerSrc = '';
  if (gtag.GA_TRACKING_ID) {
    tagManagerSrc = `https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`;
  }
  return (
    <Html lang="en">
      <Head>
        <link href="/favicon.ico" rel="icon" />
        <meta name="description" content="Unifood, a Uniform cooking demo site" />
      </Head>
      {tagManagerSrc && (
        <>
          <script async src={tagManagerSrc}></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
              `,
            }}
          />
        </>
      )}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
