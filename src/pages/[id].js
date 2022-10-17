import React from 'react';
import { enhance, CanvasClient } from "@uniformdev/canvas";
import { Composition, createApiEnhancer, Slot, useCompositionInstance } from "@uniformdev/canvas-react";
import { useLivePreviewNextStaticProps } from "../hooks/useLivePreviewNextStaticProps";
import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from "@uniformdev/canvas";
import { canvasClient, edgeCanvasClient, getCompositionList } from '../lib/canvas';
import { getEnhancers } from '../lib/enhancers/enhancers';
import appRenderer from '../compositions/appRenderer';

export default function CanvasComposition ({ composition }) {
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
      <section>
      <Slot name="hero" />
      </section>
      <section>
        <Slot name="sections" />
      </section>
    </Composition>
  )
};

export const getStaticProps = async context => {
  const slug = context?.params?.id;
  const { preview } = context;

  // create the Canvas client
  const client = canvasClient;

  // fetch the composition from Canvas
  const { composition } = await edgeCanvasClient.getCompositionBySlug({
    slug: `/${slug}`,
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

export async function getStaticPaths() {
  const compositions = await getCompositionList();
  const pages = compositions || [];

  const paths = pages.filter((c) => {
    // eslint-disable-next-line no-underscore-dangle
    const slug = c.composition._slug;
    const isPattern = c.pattern;
    const hasSlug = slug && slug.length > 0
    const isRoot = slug === '/';
    const isFirstLevel = slug?.split('/').length === 2;
    return hasSlug && !isPattern && isFirstLevel && !isRoot;
  })




  // eslint-disable-next-line no-underscore-dangle
  const staticPaths = paths.map((p) => {
    return `${p.composition._slug}`;
  });
  console.log(staticPaths);
  return { paths: staticPaths, fallback: false };
}
