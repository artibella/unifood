import {
  createContentfulEnhancer,
  createContentfulMultiEnhancer,
  createContentfulQueryEnhancer,
  ContentfulClientList
} from "@uniformdev/canvas-contentful";
import { createClient } from "contentful";

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

const clientList = new ContentfulClientList([
  {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    environment: process.env.CONTENTFUL_ENVIRONMENT,
    client: contentfulClient,
    previewClient: contentfulPreviewClient,
  },
]);

// create the Contentful enhancers with client list
export const contentfulEnhancer = createContentfulEnhancer({ client: clientList });
export const contentfulMultiEnhancer = createContentfulMultiEnhancer({ clients: clientList });
export const contentfulQueryEnhancer = createContentfulQueryEnhancer({ clients: clientList });
