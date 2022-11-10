import React from 'react';
import Head from 'next/head';
import getConfig from "next/config";
import { enhance, CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from "@uniformdev/canvas";
import { Composition, createApiEnhancer, Slot, useCompositionInstance } from "@uniformdev/canvas-react";
import { useLivePreviewNextStaticProps } from "../hooks/useLivePreviewNextStaticProps";
import { edgeCanvasClient, canvasClient, getCompositionList } from '../lib/canvas';
import { getEnhancers } from '../lib/enhancers/enhancers';
import appRenderer from '../compositions/appRenderer';
import { projectMapClient } from '../lib/projectMap';
import { compositionRenderer } from '../compositions/compositionRenderer';

const {
  serverRuntimeConfig: {
    projectId,
    projectMapId,
  },
} = getConfig();


export default function DynamicComposition({ composition }) {
  useLivePreviewNextStaticProps({
    compositionId: composition?._id,
    projectId: projectId,
  });
  const { composition: compositionInstance } = useCompositionInstance({
    composition,
    enhance: createApiEnhancer({
      apiUrl: '/api/preview'
    }),
  });
  const CompositionType = compositionRenderer(compositionInstance);
  return (
    <CompositionType composition={compositionInstance} />
  )
};


export const getStaticProps = async context => {
  const slug = context?.params?.id || '';
  const slugString = Array.isArray(slug) ? slug.join('/') : slug;  
  const { preview } = context;

  // const { composition } = await canvasClient.getCompositionByProjectMapNodePath({
  //   projectMapId,
  //   projectMapNodePath: slugString ? `/${slugString}` : '/',
  //   state:
  //     process.env.NODE_ENV === "development" || preview
  //       ? CANVAS_DRAFT_STATE
  //       : CANVAS_PUBLISHED_STATE,
  //   }
  // );

  // fetch the composition from Canvas
  const { composition } = await edgeCanvasClient.getCompositionBySlug({
    slug: `/${slugString}`,
    state: preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
  });


  // return 404 if no composition is found
  if (!composition) {
    return { notFound: true };
  }

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
  const reservedSlugs = [
    '/howtos',
    '/reviews'
  ];

  const { nodes } = await projectMapClient.getNodes({
    projectId,
    projectMapId,
  }); 
  
  // TODO: this needs improvement to scale beyond 100 compositions
  const { compositions } = await canvasClient.getCompositionList({
    projectId,
    state: CANVAS_PUBLISHED_STATE
  });
  const compositonIds = compositions.map((item) => item.composition._id);

  const paths = nodes.filter((node) => {
    const path = node.path;
    const hasComposition = node.type === 'composition' && node.compositionId && 
    compositonIds.includes(node.compositionId);
    const isReservedSlug = reservedSlugs.filter(slug => path.includes(slug)).length > 0;
    return hasComposition && !isReservedSlug;
  })
  
  const staticPaths = paths.map((node) => {
    return `${node.path}`;
  });

  return { 
    paths: staticPaths || [], 
    fallback: true 
  };
}
