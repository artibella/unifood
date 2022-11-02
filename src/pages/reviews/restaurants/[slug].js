import React from 'react';
import { enhance, CanvasClient } from "@uniformdev/canvas";
import { Composition, createApiEnhancer, Slot, useCompositionInstance } from "@uniformdev/canvas-react";
import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from "@uniformdev/canvas";
import { canvasClient, edgeCanvasClient, getCompositionList } from '../../../lib/canvas';
import { getEnhancers } from '../../../lib/enhancers/enhancers';
import appRenderer from '../../../compositions/appRenderer';
import { useLivePreviewNextStaticProps } from '../../../hooks/useLivePreviewNextStaticProps';
import RestaurantReview from '../../../compositions/RestaurantReview';
import { projectMapClient } from '../../../lib/projectMap';
import getConfig from 'next/config';

const {
  serverRuntimeConfig: {
    projectId,
    projectMapId,
  },
} = getConfig();


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
    <RestaurantReview composition={compositionInstance} />
  )
};

export const getStaticProps = async context => {
  const slug = context?.params?.slug;
  const { preview } = context;

  // create the Canvas client
  const client = canvasClient;

  // fetch the composition from Canvas
  const { composition } = await edgeCanvasClient.getCompositionBySlug({
    slug: `/reviews/restaurants/${slug}`,
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
  const startNode = '/reviews/restaurants';
  const {nodes} = await projectMapClient.getNodes({
    projectId,
    projectMapId,
    path: startNode,
    depth: 1
  });  

  const paths = nodes.filter((node) => {
    const isCompositonNode = node.type === 'composition';
    const hasComposition = node.compositionId;
    return isCompositonNode && hasComposition && node.path !== startNode
  })

  const staticPaths = paths.map((node) => {
    return `${node.path}`;
  });

  return { 
    paths: staticPaths || [], 
    fallback: false 
  };
}