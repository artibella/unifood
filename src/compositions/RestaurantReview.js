import { UniformComposition, UniformSlot, createUniformApiEnhancer } from '@uniformdev/canvas-react';
import Head from 'next/head';
import appRenderer from './appRenderer';

export default function RestaurantReview({ composition }) {
  const contextualEditingEnhancer = createUniformApiEnhancer({
    apiUrl: '/api/preview',
  });
  return (
    <>
      <Head>
        <title>{composition.parameters.title?.value}</title>
      </Head>
      <UniformComposition
        data={composition}
        resolveRenderer={appRenderer}
        contextualEditingEnhancer={contextualEditingEnhancer}
      >
        <div className="container mx-auto px-16">
          <section>
            <UniformSlot name="hero" />
          </section>
          <section>
            <div className="my-8">
              <UniformSlot name="authors" emptyPlaceholder={<div className="h-12 w-80"></div>} />
            </div>
          </section>
          <section className="lg:grid lg:grid-cols-3 lg:gap-4">
            <div className="review lg:col-span-2">
              <UniformSlot name="review" />
            </div>
            <aside className="restaurant">
              <UniformSlot name="restaurantDetails" />
            </aside>
          </section>
        </div>
      </UniformComposition>
    </>
  );
}
