export type RollResult = { key: number; value: number }

export enum AdvantageMode {
  None = 'None',
  Advantage = 'Advantage',
  Disadvantage = 'Disadvantage',
}

export enum AggregateMode {
  Threshold = 'Threshold',
  Sum = 'Sum',
  Max = 'Max',
}
