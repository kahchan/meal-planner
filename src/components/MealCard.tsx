import type { Recipe } from '../data/recipes'

type MealCardProps = {
  day: string
  recipe: Recipe | null
}

export function MealCard({ day, recipe }: MealCardProps) {
  return (
    <article className="meal-card">
      <p className="meal-card__day">{day}</p>
      {recipe ? (
        <>
          <h2 className="meal-card__title">{recipe.name}</h2>
          <ul className="meal-card__ingredients">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </>
      ) : (
        <h2 className="meal-card__title meal-card__title--empty">
          Hit randomise
        </h2>
      )}
    </article>
  )
}
