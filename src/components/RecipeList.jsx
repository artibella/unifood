import RecipeCard from './RecipeCard'

export default function RecipeList({ titel = '', recipes = [] }) {

  return (
    <section className='bg-ice-50 p-8'>
      <h2 className='text-4xl text-center mb-16 font-serif font-bold text-aqua-900'>{titel}</h2>
      <article className="md:grid md:gap-4 md:grid-cols-2 lg:grid-cols-3 pb-8 lg:pb-0">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </article>
    </section>
  );
}