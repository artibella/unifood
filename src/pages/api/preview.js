import {
  enhance,
  EnhancerBuilder,
  generateHash,
  IN_CONTEXT_EDITOR_QUERY_STRING_PARAM,
} from "@uniformdev/canvas";
import getConfig from "next/config";
import { getEnhancers } from "../../lib/enhancers/enhancers";
import { projectMapClient } from "../../lib/projectMap";

const queryParamsToPreserve = [IN_CONTEXT_EDITOR_QUERY_STRING_PARAM];

const handleGet = async (req, res) => {
  const {
    serverRuntimeConfig: { 
      previewSecret,
      projectId,
      projectMapId
    },
  } = getConfig();

  if (!req.query.id) {
    return res.status(400).json({ message: "Missing composition ID" });
  }

  if (!req.query.slug) {
    return res.status(400).json({ message: "Missing slug" });
  }

  // get node path from composition ID
  const compositionId = req.query.id; 
  const  { nodes } = await projectMapClient.getNodes({
    projectId,
    projectMapId,
    compositionId
  });
  
  let path = '';

  if(nodes.length) {
    path = nodes[0].path;
  }

  let slug = Array.isArray(req.query.slug)
    ? req.query.slug[0]
    : req.query.slug;
  
  // add slash to slug if missing
  slug = slug.startsWith('/') ? slug : `/${slug}`;
  // add prefix for slug based preview route
  slug = `/preview/${slug}`;

  // decide how to redirect: 
  // if project map path is set use it otherwise fallback to slug
  const url = path.length ? path : slug;

  if (req.query.disable) {
    res.clearPreviewData();
    res.redirect(url);
    return;
  }

  const isUsingPreviewSecret = Boolean(previewSecret);

  if (isUsingPreviewSecret && req.query.secret !== previewSecret) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // enable preview mode and redirect to the slug to preview
  res.setPreviewData({'isPreview': true});

  const newQuery = new URLSearchParams();
  queryParamsToPreserve.forEach((param) => {
    const paramValue = req.query[param];
    if (typeof paramValue === "string") {
      newQuery.append(param, paramValue);
    }
  });
  const urlToRedirectTo = newQuery.toString()
    ? `${url}?${newQuery.toString()}`
    : url;

  res.redirect(urlToRedirectTo);
};



const handlePost = async (req, res) => {
  const body = req.body;

  if (!body?.composition) {
    return res.status(400).json({ message: "Missing composition" });
  }

  const {
    serverRuntimeConfig: { previewSecret },
  } = getConfig();

  const { composition } = body;

  const hasProvidedHash = Boolean(body.hash);
  const hasConfiguredHash = Boolean(previewSecret);

  if (hasProvidedHash && hasConfiguredHash) {
    const calculatedHash = generateHash({
      composition,
      secret: previewSecret,
    });

    if (calculatedHash !== body.hash) {
      return res.status(500).json({ message: "Not authorized" });
    }
  } else if (hasConfiguredHash) {
    return res.status(500).json({ message: "Not authorized" });
  }

  await enhance({
    composition,
    enhancers: new EnhancerBuilder().parameter((e) => {
      if (typeof e.parameter.value === "string") {
        return e.parameter.value.replace(/personalization/gi, "p13n");
      }
    }),
    context: {
      preview: true,
    },
  });

  await enhance({ composition, enhancers: getEnhancers(), context: { preview: true } });

  return res.status(200).json({
    composition,
  });
};



const handler = async (req, res) => {
  const method = req.method?.toLocaleLowerCase();

  if (method === "get") {
    return handleGet(req, res);
  } else if (method === "post") {
    return handlePost(req, res);
  }

  return res.status(400).json({ message: "Method not implemented" });
};

export default handler;
