import Link from 'next/link'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function RecipeHero({ title, byline, recipe }) {
    const recipeImage = `${recipe.fields?.image?.fields?.file.url}?w=1000&h=800&fit=thumb&f=center`;

    return (
        <article>
            <h2 className="mb-16 text-6xl font-bold text-center ">
            {title}
            </h2>
            <div className="hero min-h-fit bg-cover bg-no-repeat bg-center" style={{backgroundImage: `url(${recipeImage})`}}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content">
                    <div className="max-w-md flex items-center justify-center min-h-screen">
                        <div>

                            <span className='text-xl block'>{byline}</span>
                            <h2 className="mb-5 text-5xl font-bold">
                                <Link href={`/recipes/${recipe.fields.slug}`}>
                                    <a className="hover:underline">{recipe.fields.title}</a>
                                </Link>
                            </h2>

                            <div className="text-lg leading-relaxed mb-5">
                            {documentToReactComponents(
                                recipe.fields.subTitle?.json
                            )}
                            </div>
                            <Link href={`/recipes/${recipe.fields.slug}`}>
                                <a className="hover:underline">Read more</a>
                            </Link>
                        </div>
                        
                    </div>
                </div>
            </div>
      </article>
    );
}
