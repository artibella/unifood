import RestaurantReview from './RestaurantReview';
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import DefaultComposition from './DefaultComposition';
import CuisinePage from './CuisinePage';

const CompositionMap = {
  restaurantReview: RestaurantReview,
  landingpage: LandingPage,
  cuisinePage: CuisinePage,
  homepage: HomePage
}

export const compositionRenderer = (component)  => {
  const componentName = component?.type;
  return CompositionMap[componentName] || DefaultComposition;
};