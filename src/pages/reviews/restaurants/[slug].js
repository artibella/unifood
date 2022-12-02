import React from 'react';
import { enhance } from "@uniformdev/canvas";
import { useContextualEditing, createApiEnhancer } from "@uniformdev/canvas-react";
import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from "@uniformdev/canvas";
import { canvasClient } from '../../../lib/canvas';
import { getEnhancers } from '../../../lib/enhancers/enhancers';
import RestaurantReview from '../../../compositions/RestaurantReview';
import { projectMapClient } from '../../../lib/projectMap';
import getConfig from 'next/config';

const {
  serverRuntimeConfig: {
    projectId,
    projectMapId,
  },
} = getConfig();


export default function RestaurantReviewComposition({ composition: initialCompositionValue }) {
  // enable contextual editing
  const { composition } = useContextualEditing({ 
    initialCompositionValue,
    enhance: createApiEnhancer({
      apiUrl: '/api/preview',
    })
  });

  return (
    <RestaurantReview composition={composition} />
  )
};

export const getStaticProps = async context => {
  const slug = context?.params?.slug;
  const { preview } = context;

  // create the Canvas client
  const client = canvasClient;

  const { composition } = await canvasClient.unstable_getCompositionByNodePath({
    projectMapId, 
    projectMapNodePath: `/reviews/restaurants/${slug}`,
    state:
      process.env.NODE_ENV === "development" || preview
        ? CANVAS_DRAFT_STATE
        : CANVAS_PUBLISHED_STATE,
    unstable_resolveData: true
      
    }
  );

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