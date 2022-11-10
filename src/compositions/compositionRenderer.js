import RestaurantReview from './RestaurantReview';
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import DefaultComposition from './DefaultComposition';

const CompositionMap = {
  restaurantReview: RestaurantReview,
  landingPage: LandingPage,
  homepage: HomePage
}

export const compositionRenderer = (component)  => {
  const componentName = component?.type;
  return CompositionMap[componentName] || DefaultComposition;
};