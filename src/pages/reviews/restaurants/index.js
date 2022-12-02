import React from 'react';
import { enhance } from "@uniformdev/canvas";
import { Composition, Slot, useContextualEditing, createApiEnhancer } from "@uniformdev/canvas-react";
import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from "@uniformdev/canvas";
import { canvasClient } from '../../../lib/canvas';
import { getEnhancers } from '../../../lib/enhancers/enhancers';
import appRenderer from '../../../compositions/appRenderer';

export default function CanvasComposition({ composition: initialCompositionValue }) {
  // enable contextual editing
  const { composition } = useContextualEditing({ 
    initialCompositionValue,
    enhance: createApiEnhancer({
      apiUrl: '/api/preview',
    })
  });

  return (
    <Composition data={composition} resolveRenderer={appRenderer}>
      {({ title }) => (
        <div className="container mx-auto px-16">
          <section>
            <h1 className='text-3xl mb-16'>{title}</h1>
            <Slot name="hero" />
          </section>
          <section>
            <Slot name="sections" />
          </section>
        </div>
      )}
    </Composition>
  )
};

export const getStaticProps = async context => {
  const { preview } = context;
  // fetch the composition from Canvas
  const { composition } = await canvasClient.getCompositionBySlug({
    slug: `/reviews/restaurants`,
    state: preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
    unstable_resolveData: true
  });

  await enhance({
    composition,
    enhancers: getEnhancers(),
    context: { preview },
  });
  return {
    props: {
      composition,
    },
  };

};
