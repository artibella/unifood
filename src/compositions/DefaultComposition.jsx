import { UniformComposition, createUniformApiEnhancer } from '@uniformdev/canvas-react';
import Head from 'next/head';
import appRenderer from './appRenderer';

export default function DefaultComposition({ composition }) {
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
        ></UniformComposition>
      </div>
    </>
  );
}
