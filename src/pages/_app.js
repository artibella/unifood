import { UniformContext } from "@uniformdev/context-react";
import { Context, enableContextDevTools } from "@uniformdev/context";
import manifest from "../lib/contextManifest.json";

import "../styles/globals.css";
import "../styles/page.css";
import Layout from "../components/layout";

const context = new Context({ 
  manifest,
  defaultConsent: true,
  plugins: [
    enableContextDevTools(),
  ]
 });


function MyApp({ Component, pageProps, scoring }) {
  return (
    <UniformContext context={context}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UniformContext>
  );
}

export default MyApp;