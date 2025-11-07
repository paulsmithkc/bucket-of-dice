import { FC, useMemo } from 'react'
import { AggregateMode, RollResult } from './types'

export const RollAggregate: FC<{
  aggregate: AggregateMode
  threshold: number
  results: RollResult[]
}> = ({ aggregate, threshold, results }) => {
  switch (aggregate) {
    case AggregateMode.Threshold:
      return <RollAggregateThreshold threshold={threshold} results={results} />
    case AggregateMode.Sum:
      return <RollAggregateSum results={results} />
    case AggregateMode.Max:
      return <RollAggregateMax results={results} />
  }
}

export const RollAggregateThreshold: FC<{
  threshold: number
  results: RollResult[]
}> = ({ threshold, results }) => {
  const overThreshold = useMemo(() => {
    if (!results || !threshold) {
      return null
    }

    let overThreshold = 0
    for (const entry of results) {
      if (entry.key >= threshold) {
        overThreshold += entry.value
      }
    }

    return overThreshold
  }, [threshold, results])

  return <>{overThreshold} times at the threshold or above</>
}

export const RollAggregateSum: FC<{
  results: RollResult[]
}> = ({ results }) => {
  const sum = useMemo(() => {
    if (!results) {
      return null
    }

    let sum = 0
    for (const entry of results) {
      sum += entry.key * entry.value
    }

    return sum
  }, [results])

  return <>{sum} total of all rolls</>
}

export const RollAggregateMax: FC<{
  results: RollResult[]
}> = ({ results }) => {
  const max = useMemo(() => {
    if (!results) {
      return null
    }

    let max = 0
    for (const entry of results) {
      if (entry.key > max) {
        max = entry.key
      }
    }

    return max
  }, [results])

  return <>{max} max of all rolls</>
}
