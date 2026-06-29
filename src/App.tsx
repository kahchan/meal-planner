import { useState } from 'react'
import { RECIPES } from './data/recipes'
import type { Recipe } from './data/recipes'
import { saveHistory, weightedSample } from './lib/selection'
import { MealCard } from './components/MealCard'
import { GroceryList } from './components/GroceryList'
import { RandomiseButton } from './components/RandomiseButton'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday'] as const

export function App() {
  const [meals, setMeals] = useState<Recipe[]>([])
  const [checked, setChecked] = useState<Set<string>>(new Set())
  // Bumped on each randomise so the cards re-trigger their fade-in animation.
  const [round, setRound] = useState(0)

  function randomise() {
    const picked = weightedSample(RECIPES, DAYS.length)
    saveHistory(picked.map((m) => m.name))
    setMeals(picked)
    setChecked(new Set())
    setRound((r) => r + 1)
  }

  function toggleItem(key: string) {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">This week's menu</h1>
        <p className="app__subtitle">Dinner for 4</p>
      </header>

      <RandomiseButton onClick={randomise} />

      <div className="meals-grid" key={round}>
        {DAYS.map((day, i) => (
          <MealCard key={day} day={day} recipe={meals[i] ?? null} />
        ))}
      </div>

      <GroceryList meals={meals} checked={checked} onToggle={toggleItem} />

      <footer className="app__footer">
        Edit <code>src/data/recipes.ts</code> to add your own recipes
      </footer>
    </div>
  )
}
