import { FC, useMemo } from 'react'
import { AggregateMode, RollResult } from './types'

export const RollAggregate: FC<{
  aggregate: AggregateMode
  threshold: number
  mod: number
  results: RollResult[]
}> = ({ aggregate, threshold, mod, results }) => {
  switch (aggregate) {
    case AggregateMode.Threshold:
      return (
        <RollAggregateThreshold
          threshold={threshold}
          mod={mod}
          results={results}
        />
      )
    case AggregateMode.Sum:
      return <RollAggregateSum mod={mod} results={results} />
    case AggregateMode.Max:
      return <RollAggregateMax mod={mod} results={results} />
  }
}

export const RollAggregateMod: FC<{ mod: number }> = ({ mod }) => {
  return mod ? `(with ${mod < 0 ? '-' : '+'}${Math.abs(mod)})` : null
}

export const RollAggregateThreshold: FC<{
  threshold: number
  mod: number
  results: RollResult[]
}> = ({ threshold, mod, results }) => {
  const overThreshold = useMemo(() => {
    if (!results || !threshold) {
      return null
    }

    let overThreshold = 0
    for (const entry of results) {
      const val = entry.key + mod
      if (val >= threshold) {
        overThreshold += entry.value
      }
    }

    return overThreshold
  }, [mod, threshold, results])

  return (
    <>
      {overThreshold} times at the threshold or above{' '}
      <RollAggregateMod mod={mod} />
    </>
  )
}

export const RollAggregateSum: FC<{
  mod: number
  results: RollResult[]
}> = ({ mod, results }) => {
  const sum = useMemo(() => {
    if (!results) {
      return null
    }

    let sum = 0
    for (const entry of results) {
      const key = entry.key + mod
      sum += key * entry.value
    }

    return sum
  }, [mod, results])

  return (
    <>
      {sum} total of all rolls <RollAggregateMod mod={mod} />
    </>
  )
}

export const RollAggregateMax: FC<{
  mod: number
  results: RollResult[]
}> = ({ mod, results }) => {
  const max = useMemo(() => {
    if (!results) {
      return null
    }

    let max = 0
    for (const entry of results) {
      const key = entry.key + mod
      if (key > max) {
        max = key
      }
    }

    return max
  }, [mod, results])

  return (
    <>
      {max} max of all rolls <RollAggregateMod mod={mod} />
    </>
  )
}
