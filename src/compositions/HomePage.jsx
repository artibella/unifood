import { UniformComposition, UniformSlot, createUniformApiEnhancer } from '@uniformdev/canvas-react';
import Head from 'next/head';
import appRenderer from './appRenderer';

export default function HomePage({ composition }) {
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
          <div className="container mx-auto px-16">
            <UniformSlot name="mainNavigation" />

            <section>
              <UniformSlot name="mainHero" emptyPlaceholder={placeHolder} />
            </section>

            <section>
              <UniformSlot name="sections" emptyPlaceholder={placeHolder} />
            </section>
          </div>
        </UniformComposition>
      </div>
    </>
  );
}
