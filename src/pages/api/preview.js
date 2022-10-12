import getConfig from 'next/config';
import { IN_CONTEXT_EDITOR_QUERY_STRING_PARAM } from '@uniformdev/canvas';
const queryParamsToPreserve = [IN_CONTEXT_EDITOR_QUERY_STRING_PARAM];

const previewHandler = async (req, res) => {
  const {
    serverRuntimeConfig: { previewSecret },
  } = getConfig();

  if (!req.query.slug) {
    return res.status(400).json({ message: 'Missing slug' });
  }

  // raw string of the incoming slug
  const slug = Array.isArray(req.query.slug) ? req.query.slug[0] : req.query.slug;

  if (req.query.disable) {
    res.clearPreviewData();
    res.redirect(slug);
    return;
  }

  const isUsingPreviewSecret = Boolean(previewSecret);

  if (isUsingPreviewSecret && req.query.secret !== previewSecret) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // enable preview mode and redirect to the slug to preview
  res.setPreviewData({ yay: 'tacos' });

  const newQuery = new URLSearchParams();
  queryParamsToPreserve.forEach(param => {
    const paramValue = req.query[param];
    if (typeof paramValue === 'string') {
      newQuery.append(param, paramValue);
    }
  });
  const urlToRedirectTo = newQuery.toString() ? `${slug}?${newQuery.toString()}` : slug;

  res.redirect(urlToRedirectTo);
};

export default previewHandler;
