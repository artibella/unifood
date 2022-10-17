
import { contentfulEnhancer, contentfulMultiEnhancer, contentfulQueryEnhancer } from './contentful/index.js';
import { EnhancerBuilder } from '@uniformdev/canvas';
import {
  CANVAS_CONTENTFUL_PARAMETER_TYPES,
  CANVAS_CONTENTFUL_MULTI_PARAMETER_TYPES,
  CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES,
} from "@uniformdev/canvas-contentful";
  

export const getEnhancers = () => {
  return new EnhancerBuilder().parameterType(
    CANVAS_CONTENTFUL_PARAMETER_TYPES,
    contentfulEnhancer
  )
  .parameterType(
    CANVAS_CONTENTFUL_MULTI_PARAMETER_TYPES,
    contentfulMultiEnhancer
  )
  .parameterType(
    CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES,
    contentfulQueryEnhancer
  );
};
