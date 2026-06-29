import type { Recipe } from '../data/recipes'

const STORAGE_KEY = 'menuPlanner_history'
const HISTORY_LENGTH = 8

export function getHistory(): string[] {
  try {
    return (JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as string[]) ?? []
  } catch {
    return []
  }
}

export function saveHistory(mealNames: string[]): void {
  const updated = [...getHistory(), ...mealNames].slice(-HISTORY_LENGTH)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

// Pick n recipes, biased away from recently-used ones. Each meal's recency
// score sums its positions in history (older = lower), and weight is base 10
// minus that score, floored at 1 — so a meal can always still be picked.
export function weightedSample(recipes: Recipe[], n: number): Recipe[] {
  const history = getHistory()
  const recency: Record<string, number> = {}
  history.forEach((name, i) => {
    const age = history.length - i
    recency[name] = (recency[name] ?? 0) + age
  })

  const pool = recipes.map((recipe) => ({
    recipe,
    weight: Math.max(1, 10 - (recency[recipe.name] ?? 0)),
  }))

  const picked: Recipe[] = []
  for (let i = 0; i < n && pool.length > 0; i++) {
    const total = pool.reduce((sum, w) => sum + w.weight, 0)
    let rand = Math.random() * total
    let idx = 0
    for (; idx < pool.length; idx++) {
      rand -= pool[idx].weight
      if (rand <= 0) break
    }
    idx = Math.min(idx, pool.length - 1)
    picked.push(pool[idx].recipe)
    pool.splice(idx, 1)
  }
  return picked
}
