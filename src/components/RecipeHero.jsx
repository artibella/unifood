import Link from 'next/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import GenericHero from './GenericHero';

export default function RecipeHero({ title, byline, teaserText, recipe }) {
  const recipeImage = `${recipe.fields?.image?.fields?.file.url}?w=1000&h=800&fit=thumb&f=center`;
  const subtitle = recipe.fields?.subtitle || teaserText || '';
  const link = `/recipes/${recipe.fields?.slug}`;
  const heroProps = {
    title: recipe.fields?.title,
    body: subtitle,
    imageUrl: recipeImage,
    ctas: [
      {
        title: 'Read more',
        link: link,
      },
    ],
  };
  return (
    <article>
      <h2 className="mb-8 text-3xl font-bold text-center">
        <span className="badge badge-primary badge-lg">{byline}</span>{' '}
        <span className=" inline-block align-middle">{title} </span>
      </h2>
      <GenericHero {...heroProps} />
    </article>
  );
}
