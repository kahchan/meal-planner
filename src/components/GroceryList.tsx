import type { Recipe } from '../data/recipes'

type GroceryListProps = {
  meals: Recipe[]
  checked: Set<string>
  onToggle: (key: string) => void
}

export function GroceryList({ meals, checked, onToggle }: GroceryListProps) {
  const items = meals.flatMap((meal) =>
    meal.ingredients.map((ingredient) => ({
      key: `${meal.name}::${ingredient}`,
      meal: meal.name,
      ingredient,
    })),
  )

  return (
    <section className="grocery">
      <h2 className="grocery__heading">Grocery list</h2>
      <div className="grocery__card">
        {items.length === 0 ? (
          <p className="grocery__empty">Pick your meals first ↑</p>
        ) : (
          <ul className="grocery__list">
            {items.map((item) => {
              const isChecked = checked.has(item.key)
              return (
                <li
                  key={item.key}
                  className={isChecked ? 'grocery__item is-checked' : 'grocery__item'}
                >
                  <label className="grocery__label">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggle(item.key)}
                    />
                    <span className="grocery__text">{item.ingredient}</span>
                    <span className="grocery__meal">{item.meal}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
