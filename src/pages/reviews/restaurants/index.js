import React from 'react';
import { enhance, CanvasClient } from "@uniformdev/canvas";
import { Composition, createApiEnhancer, Slot, useCompositionInstance } from "@uniformdev/canvas-react";
import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from "@uniformdev/canvas";
import { canvasClient, edgeCanvasClient, getCompositionList } from '../../../lib/canvas';
import { getEnhancers } from '../../../lib/enhancers/enhancers';
import appRenderer from '../../../compositions/appRenderer';
import { useLivePreviewNextStaticProps } from '../../../hooks/useLivePreviewNextStaticProps';

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
  const slug = context?.params?.slug;
  const { preview } = context;

  // create the Canvas client
  const client = canvasClient;

  // fetch the composition from Canvas
  const { composition } = await edgeCanvasClient.getCompositionBySlug({
    slug: `/reviews/restaurants`,
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

// export async function getStaticPaths() {
//   const compositions = await getCompositionList({ type: 'restaurantReview' });
//   const pages = compositions || [];

//   const paths = pages.filter((c) => {
//     // eslint-disable-next-line no-underscore-dangle
//     const slug = c.composition._slug;
//     const isPattern = c.pattern;
//     const hasSlug = slug && slug.length > 0
//     return hasSlug && !isPattern;
//   })

//   // eslint-disable-next-line no-underscore-dangle
//   const staticPaths = paths.map((p) => {
//     return `${p.composition._slug}`;
//   });
//   return { paths: staticPaths, fallback: false };
// }
