import React from 'react';
import { enhance, CanvasClient } from "@uniformdev/canvas";
import { Composition, createApiEnhancer, Slot, useCompositionInstance } from "@uniformdev/canvas-react";
import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from "@uniformdev/canvas";
import { canvasClient, edgeCanvasClient, getCompositionList } from '../../lib/canvas';
import { getEnhancers } from '../../lib/enhancers/enhancers';
import appRenderer from '../../compositions/appRenderer';
import { useLivePreviewNextStaticProps } from '../../hooks/useLivePreviewNextStaticProps';

export default function CanvasComposition({ composition }) {
  useLivePreviewNextStaticProps({
    compositionId: composition?._id,
    projectId: process.env.UNIFORM_PROJECT_ID,
  });
  const { composition: compositionInstance } = useCompositionInstance({
    composition,
    enhance: createApiEnhancer({
      apiUrl: '/api/preview'
    }),
  });
  return (
    <Composition data={compositionInstance} resolveRenderer={appRenderer}>
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
  const { composition } = await edgeCanvasClient.getCompositionBySlug({
    slug: `howtos`,
    state: preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
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
