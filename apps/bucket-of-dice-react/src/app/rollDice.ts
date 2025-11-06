export function rollDie(sides: number): number {
  return (Math.random() * sides + 1) | 0;
}

export function rollDice(quantity: number, sides: number): Map<number, number> {
  const results = new Map<number, number>();

  for (let i = 0; i < quantity; ++i) {
    const roll = rollDie(sides);
    results.set(roll, (results.get(roll) ?? 0) + 1);
  }

  return results;
}
