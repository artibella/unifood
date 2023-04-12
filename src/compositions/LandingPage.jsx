import { UniformComposition, UniformSlot, createUniformApiEnhancer } from '@uniformdev/canvas-react';
import Head from 'next/head';
import appRenderer from './appRenderer';

export default function LandingPage({ composition }) {
  const placeHolder = <div className="h-96"></div>;
  const contextualEditingEnhancer = createUniformApiEnhancer({
    apiUrl: '/api/preview',
  });
  return (
    <>
      <Head>
        <title>{composition?._name}</title>
      </Head>
      <div>
        <UniformComposition
          data={composition}
          resolveRenderer={appRenderer}
          contextualEditingEnhancer={contextualEditingEnhancer}
        >
          <section>
            <UniformSlot name="hero" emptyPlaceholder={placeHolder} />
          </section>
          <section>
            <UniformSlot name="sections" emptyPlaceholder={placeHolder} />
          </section>
        </UniformComposition>
      </div>
    </>
  );
}
