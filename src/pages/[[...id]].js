import React from 'react';
import getConfig from 'next/config';
import { enhance } from '@uniformdev/canvas';
import { canvasClient } from '../lib/canvas';
import { getEnhancers } from '../lib/enhancers/enhancers';
import { projectMapClient } from '../lib/projectMap';
import { compositionRenderer } from '../compositions/compositionRenderer';
import { withUniformGetStaticProps, withUniformGetStaticPaths } from '@uniformdev/canvas-next/project-map';

const {
  serverRuntimeConfig: { projectMapId },
} = getConfig();

export default function DynamicComposition({ composition }) {
  // get composition type
  const CompositionType = compositionRenderer(composition);

  return <CompositionType composition={composition} />;
}

export const getStaticProps = withUniformGetStaticProps({
  param: 'id', // to match with file name
  client: canvasClient,
  projectMapId: projectMapId,
  requestOptions: {
    unstable_resolveData: true,
  },
  callback: async (context, composition) => {
    if (composition) {
      // run enhancers
      await enhance({ composition, enhancers: getEnhancers(), context });
    } else {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        composition,
      },
    };
  },
});

export const getStaticPaths = withUniformGetStaticPaths({
  client: projectMapClient,
  callback: async nodes => {
    const skipPathNames = ['/howtos/'];
    return nodes.filter(node => !skipPathNames.find(path => node.path.startsWith(path)));
  },
});
