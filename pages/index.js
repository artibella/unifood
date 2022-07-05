import {
  createContentfulEnhancer,
  ContentfulClientList,
  CANVAS_CONTENTFUL_PARAMETER_TYPES,
} from "@uniformdev/canvas-contentful";
import { enhance, CanvasClient, EnhancerBuilder } from "@uniformdev/canvas";
import { createClient } from "contentful";
import { Composition, Slot } from "@uniformdev/canvas-react";
import { useLivePreviewNextStaticProps } from "../hooks/useLivePreviewNextStaticProps";
import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from "@uniformdev/canvas";
import RecipeHero from "../components/recipehero";
import MainNavigation from "../components/mainnavigation";


const resolveRenderer = (component) => {
  // choose the component based on the Canvas component type
  // (you can also use a Map, switch, next/dynamic, etc here)
  if (component.type === "recipeHero") {
    return RecipeHero;
  }

  if (component.type === "mainNavigation") {
    return MainNavigation;
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
        <>
          <Slot name="mainNavigation" />

          <article>
              <h1 className="text-3xl font-bold underline">{title}</h1>
              {/* add slot component */}
              <Slot name="mainHero" />
            </article>
        </>
      )}
    </Composition>
  );
}

// read the value of preview from the Next.js context
export async function getStaticProps({ preview }) {
  console.log({ preview });
  // create the Canvas client
  const client = new CanvasClient({
    // if this weren't a tutorial, ↙ should be in an environment variable :)
    apiKey: process.env.UNIFORM_API_KEY,
    // if this weren't a tutorial, ↙ should be in an environment variable :)
    projectId: process.env.UNIFORM_PROJECT_ID,
  });

  // fetch the composition from Canvas
  const { composition } = await client.getCompositionBySlug({
    // if you used something else as your slug, use that here instead
    slug: "/",
    state: preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
  });

  const contentfulClient = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
  });

  const contentfulPreviewClient = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
    host: "preview.contentful.com",
  });

  // ADD: the previewClient to the ContentfulClientList
  // NOTE: the ContentfulClientList allows you to use Canvas data that references multiple spaces / environments
  // by providing a Contentful client for each space / environment.
  const clientList = new ContentfulClientList([
    {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      environment: process.env.CONTENTFUL_ENVIRONMENT,
      client: contentfulClient,
      previewClient: contentfulPreviewClient,
    },
  ]);
  // create the Contentful enhancer with client list
  const contentfulEnhancer = createContentfulEnhancer({ client: clientList });

  // apply the enhancers to the composition data, enhancing it with external data
  // in this case, the _value_ of the Contentful parameter you created is enhanced
  // from the entry ID it is linked to, to the Contentful entry REST API response
  // for that entry. You can create your own enhancers easily; they are a simple function.
  await enhance({
    composition,
    enhancers: new EnhancerBuilder().parameterType(
      CANVAS_CONTENTFUL_PARAMETER_TYPES,
      contentfulEnhancer
    ),
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
