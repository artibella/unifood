import React from 'react';
import { enhance, CanvasClient } from "@uniformdev/canvas";
import { Composition, createApiEnhancer, Slot, useCompositionInstance } from "@uniformdev/canvas-react";
import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from "@uniformdev/canvas";
import { canvasClient, getCompositionList } from '../../lib/canvas';
import { getEnhancers } from '../../lib/enhancers/enhancers';
import appRenderer from '../../compositions/appRenderer';
import { useLivePreviewNextStaticProps } from '../../hooks/useLivePreviewNextStaticProps';
import HowtoDetail from '../../compositions/HowtoDetail';
import { getHowtoArticleSlugs } from '../../lib/enhancers/contentstack';


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
      {({ title, body, intro }) => (
        <HowtoDetail title={title} body={body} intro={intro} />
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
  const { composition } = await canvasClient.getCompositionBySlug({
    slug: `/howtos/howto-detail`,
    state: preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
    unstable_resolveData: true,
    unstable_dynamicVariables: {
      slug: slug
    }
  });

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
  const articleSlugs = await getHowtoArticleSlugs();

  const staticPaths = articleSlugs.map((article) => {
    return `/howtos/${article.url}`;
  });

  return { paths: staticPaths, fallback: false };
}
