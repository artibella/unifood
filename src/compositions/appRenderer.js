import { DefaultNotImplementedComponent } from '@uniformdev/canvas-react';
import RecipeHero from '../components/RecipeHero';
import MainNavigation from '../components/MainNavigation';
import RecipeList from '../components/RecipeList';
import Card from '../components/GenericCard';
import GenericHero from '../components/GenericHero';
import SectionContainer from '../components/SectionContainer';


const ComponentsMap = {
  mainNavigation: MainNavigation,
  recipeHero: RecipeHero,
  recipeList: RecipeList,
  genericCard: Card,
  hero: GenericHero,
  sectionContainer: SectionContainer
 
};

const appRenderer = (component)  => {
  const componentName = component.type;
  return ComponentsMap[componentName] || DefaultNotImplementedComponent;
};

export default appRenderer;
