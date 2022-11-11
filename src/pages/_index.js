import { getEnhancers } from "../lib/enhancers/enhancers";
import { enhance } from "@uniformdev/canvas";
import { Composition, createApiEnhancer, Slot, useCompositionInstance } from "@uniformdev/canvas-react";
import { useLivePreviewNextStaticProps } from "../hooks/useLivePreviewNextStaticProps";
import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from "@uniformdev/canvas";
import { canvasClient } from "../lib/canvas";

import appRenderer from "../compositions/appRenderer";


export default function Home({ composition }) {
  useLivePreviewNextStaticProps({
    compositionId: composition?._id,
    projectId: process.env.UNIFORM_PROJECT_ID,
  });
  const { composition: compositionInstance } = useCompositionInstance({
    composition,
    enhance: createApiEnhancer({
      apiUrl: '/api/preview',
    }),
  });
  return (
    <Composition data={compositionInstance} resolveRenderer={appRenderer}>
      {({ title }) => (
        <div className="container mx-auto px-16">
          <Slot name="mainNavigation" />

          <section>
              <h1 className="text-8xl font-bold text-center mb-16">{title}</h1>
              {/* add slot component */}
              <Slot name="mainHero" />
          </section>

          <section>
            <Slot name="sections" />
          </section>
        </div>
      )}
    </Composition>
  );
}

// read the value of preview from the Next.js context
export async function getStaticProps({ preview }) {
  // fetch the composition from Canvas
  const { composition } = await canvasClient.getCompositionBySlug({
    slug: "/",
    state: preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
  });

  await enhance({
    composition,
    enhancers: getEnhancers(),
    context: { preview },
  });

  // set `composition` as a prop to the route
  return {
    props: {
      composition,
    },
  };
}
