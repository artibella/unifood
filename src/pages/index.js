import { getEnhancers } from "../lib/enhancers/enhancers";
import { enhance, CanvasClient, EnhancerBuilder } from "@uniformdev/canvas";
import { Composition, Slot } from "@uniformdev/canvas-react";
import { useLivePreviewNextStaticProps } from "../hooks/useLivePreviewNextStaticProps";
import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from "@uniformdev/canvas";
import RecipeHero from "../components/recipehero";
import MainNavigation from "../components/mainnavigation";
import RecipeList from "../components/recipe-list";


const resolveRenderer = (component) => {
  // choose the component based on the Canvas component type
  // (you can also use a Map, switch, next/dynamic, etc here)
  if (component.type === "recipeHero") {
    return RecipeHero;
  }

  if (component.type === "mainNavigation") {
    return MainNavigation;
  }

  if (component.type === "recipeList") {
    return RecipeList;
  }
  return null;
};

export default function Home({ composition }) {
  useLivePreviewNextStaticProps({
    compositionId: composition?._id,
    projectId: process.env.UNIFORM_PROJECT_ID,
  });
  return (
    <Composition data={composition} resolveRenderer={resolveRenderer}>
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
  // create the Canvas client
  const client = new CanvasClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiHost: process.env.UNIFORM_CLI_BASE_URL
  });

  // fetch the composition from Canvas
  const { composition } = await client.getCompositionBySlug({
    slug: "/",
    state: preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
  });

  await enhance({
    composition,
    enhancers: getEnhancers(),
    // make sure to set the preview context
    context: { preview },
  });

  // set `composition` as a prop to the route
  return {
    props: {
      composition,
    },
  };
}
