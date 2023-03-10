import Link from 'next/link'
import { Card } from 'react-daisyui';

export default function RecipeCard({ recipe }) {
  const recipeImage = `${recipe.fields?.image?.fields.file.url}?w=600&h=400&fit=thumb`;
  const recipeImageAlt = `${recipe.fields?.title}`

  return (
    <Card className='bg-white'>
      <Card.Image
        src={recipeImage}
        alt={recipeImageAlt}
      />
      <Card.Body>
        <Card.Title tag="h2">
          <Link href={`/recipes/${recipe.fields.slug}`} className="hover:underline">
            {recipe.fields.title}
          </Link>
          </Card.Title>
      </Card.Body>
    </Card>
  );
}
