import RecipeCard from './RecipeCard'



export default function RecipeList ({ component }) {

    const title = component.parameters.titel.value;
    return (
        <section className='mt-16 bg-slate-100 p-8 rounded-lg mb-16'>
            <h2 className='text-4xl text-center mb-16 font-bold text-gray-900'>{title}</h2>
            <article className="lg:grid lg:gap-4 lg:grid-cols-3 pb-8 lg:pb-0">
                {component.parameters.recipes?.value?.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />

                ))}
            </article>
        </section>
    );
}