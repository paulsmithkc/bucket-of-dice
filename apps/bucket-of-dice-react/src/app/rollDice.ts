import { AdvantageMode } from './types'

export function rollDie(sides: number): number {
  return (Math.random() * sides + 1) | 0
}

export function rollDieWithAdvantage(
  sides: number,
  advantage: AdvantageMode,
): number {
  switch (advantage) {
    case AdvantageMode.None:
      return rollDie(sides)
    case AdvantageMode.Advantage:
      return Math.max(rollDie(sides), rollDie(sides))
    case AdvantageMode.Disadvantage:
      return Math.min(rollDie(sides), rollDie(sides))
  }
}

export function rollDice(
  quantity: number,
  sides: number,
  advantage: AdvantageMode,
): Map<number, number> {
  const results = new Map<number, number>()

  for (let i = 0; i < quantity; ++i) {
    const roll = rollDieWithAdvantage(sides, advantage)
    results.set(roll, (results.get(roll) ?? 0) + 1)
  }

  return results
}
