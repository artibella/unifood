import { DefaultNotImplementedComponent } from '@uniformdev/canvas-react';
import RecipeHero from '../components/RecipeHero';
import MainNavigation from '../components/MainNavigation';
import RecipeList from '../components/RecipeList';
import Card from '../components/GenericCard';
import GenericHero from '../components/GenericHero';
import SectionContainer from '../components/SectionContainer';
import GridContainer from '../components/GridContainer';
import TextBlock from '../components/TextBlock';
import ImageBlock from '../components/ImageBlock';
import ContributorList from '../components/ContributorList';
import RestaurantDetails from '../components/RestaurantDetails';

const ComponentsMap = {
  mainNavigation: MainNavigation,
  recipeHero: RecipeHero,
  recipeList: RecipeList,
  genericCard: Card,
  hero: GenericHero,
  sectionContainer: SectionContainer,
  gridContainer: GridContainer,
  textBlock: TextBlock,
  imageBlock: ImageBlock,
  contributorList: ContributorList,
  restaurantDetails: RestaurantDetails,
 
};

const appRenderer = (component)  => {
  const componentName = component.type;
  return ComponentsMap[componentName] || DefaultNotImplementedComponent;
};

export default appRenderer;
