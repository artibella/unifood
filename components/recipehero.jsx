import Link from 'next/link'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function RecipeHero({ title, byline, recipe }) {
    const recipeImage = `${recipe.fields?.image?.fields.file.url}?w=1000&h=800`;
    const recipeImageAlt = `${recipe.fields?.name}`
    return (
        <article>
            <div class="hero min-h-fit" style={{backgroundImage: `url(${recipeImage});`}}>
                <div class="hero-overlay bg-opacity-60"></div>
                <div class="text-center hero-content text-neutral-content">
                    <div class="max-w-md">
                        <span className='text-xl block'>{byline}</span>
                        <h1 className="mb-5 text-5xl font-bold">
                            <Link href={`/recipes/${recipe.fields.slug}`}>
                                <a className="hover:underline">{title}</a>
                            </Link>
                        </h1>

                        <div className="text-lg leading-relaxed mb-5">
                        {documentToReactComponents(
                            recipe.fields.subTitle?.json
                        )}
                        </div>

                        <a role="button" class="btn btn-primary">
                        <Link href={`/recipes/${recipe.fields.slug}`}>
                            <a className="hover:underline">Read more</a>
                        </Link>
                        </a>
                    </div>
                </div>
            </div>
      </article>
    );
}
