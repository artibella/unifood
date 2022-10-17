import { CanvasClient, EdgeCanvasClient, CANVAS_PUBLISHED_STATE, CANVAS_DRAFT_STATE } from "@uniformdev/canvas";

export const canvasClient = new CanvasClient({
  apiKey: process.env.UNIFORM_API_KEY,
  projectId: process.env.UNIFORM_PROJECT_ID,
  apiHost: process.env.UNIFORM_CLI_BASE_URL
});

export const edgeCanvasClient = new EdgeCanvasClient({
  apiKey: process.env.UNIFORM_API_KEY,
  projectId: process.env.UNIFORM_PROJECT_ID,
  apiHost: process.env.UNIFORM_CLI_BASE_URL
});

export const getCompositionList = async ({ type } = {}) => {
  if (!canvasClient) throw new Error('canvasClient is not configured');
  return canvasClient.getCompositionList({ skipEnhance: true, type, state: getState(false) }).then(c => c.compositions);
};

export const getState = (preview) => (preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE);
