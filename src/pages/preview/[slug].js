import React from 'react';
import { enhance } from "@uniformdev/canvas";
import { useContextualEditing, createApiEnhancer } from "@uniformdev/canvas-react";
import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from "@uniformdev/canvas";
import { canvasClient } from '../../lib/canvas';
import { getEnhancers } from '../../lib/enhancers/enhancers';
import getConfig from 'next/config';
import { compositionRenderer } from '../../compositions/compositionRenderer';

const {
  serverRuntimeConfig: {
    projectId,
    projectMapId,
  },
} = getConfig();


export default function PreviewComposition({ composition: initialCompositionValue }) {
  // enable contextual editing
  const { composition } = useContextualEditing({ 
    initialCompositionValue,
    enhance: createApiEnhancer({
      apiUrl: '/api/preview',
    })
  });

  const CompositionType = compositionRenderer(composition);
  return (
    <CompositionType composition={composition} />
  )
};

export const getStaticProps = async context => {
  const slug = context?.params?.slug;
  const { preview } = context;

  // create the Canvas client
  const client = canvasClient;

  // fetch the composition by the slug from Canvas
  const { composition } = await canvasClient.getCompositionBySlug({
    slug: `${slug}`,
    state: process.env.NODE_ENV === "development" || preview
    ? CANVAS_DRAFT_STATE
    : CANVAS_PUBLISHED_STATE,
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


export async function getStaticPaths() {
  return { 
    paths: [], 
    fallback: true 
  };
}