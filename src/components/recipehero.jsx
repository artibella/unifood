import Link from 'next/link'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import GenericHero from './GenericHero';

export default function RecipeHero({ title, byline, recipe }) {
    const recipeImage = `${recipe.fields?.image?.fields?.file.url}?w=1000&h=800&fit=thumb&f=center`;
    const subtitle = documentToReactComponents(recipe.fields.subTitle?.json);
    const link = `/recipes/${recipe.fields.slug}`;
    const heroProps = {
        title: recipe.fields.title,
        body: subtitle,
        imageUrl: recipeImage,
        ctas: [
            {
                title: 'Read more',
                link: link
            }
        ]
    };
    return (

        <article>
            <h2 className="mb-16 text-6xl font-bold text-center ">
            {title}
            </h2>
            <GenericHero {...heroProps} />
      </article>
    );
}
