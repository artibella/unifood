import React from 'react';
import { enhance } from "@uniformdev/canvas";
import { Composition, createApiEnhancer, useContextualEditing } from "@uniformdev/canvas-react";
import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from "@uniformdev/canvas";
import { canvasClient } from '../../lib/canvas';
import { getEnhancers } from '../../lib/enhancers/enhancers';
import appRenderer from '../../compositions/appRenderer';
import HowtoDetail from '../../compositions/HowtoDetail';
import { getHowtoArticleSlugs } from '../../lib/enhancers/contentstack';


export default function HowtoComposition({ composition: initialCompositionValue }) {
  // enable contextual editing
  const { composition } = useContextualEditing({ 
    initialCompositionValue,
    enhance: createApiEnhancer({
      apiUrl: '/api/preview',
    })
  });

  return (
    <Composition data={composition} resolveRenderer={appRenderer}>
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
    slug: `howto-detail`,
    state: process.env.NODE_ENV === "development" || preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
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
