import RestaurantReview from './RestaurantReview';
import DefaultComposition from './DefaultComposition';

const CompositionMap = {
  restaurantReview: RestaurantReview,
}

export const compositionRenderer = (component)  => {
  const componentName = component?.type;
  return CompositionMap[componentName] || DefaultComposition;
};