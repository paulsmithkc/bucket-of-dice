import { sortBy } from 'lodash'
import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react'
import { RollAggregate } from './RollAggregate'
import { rollDice } from './rollDice'
import { AdvantageMode, AggregateMode, RollResult } from './types'

export const DiceRoller: FC<{}> = () => {
  const [quantity, setQuantity] = useState<number>(100)
  const [sides, setSides] = useState<number>(20)
  const [mod, setMod] = useState<number>(0)
  const [threshold, setThreshold] = useState<number>(13)
  const [advantage, setAdvantage] = useState<AdvantageMode>(AdvantageMode.None)
  const [aggregate, setAggregate] = useState<AggregateMode>(
    AggregateMode.Threshold,
  )
  const [poolRolled, setPoolRolled] = useState<string>('')
  const [results, setResults] = useState<RollResult[]>()

  const onChangeQuantity = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.currentTarget.value, 10))
  }, [])

  const onChangeSides = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSides(parseInt(e.currentTarget.value, 10))
  }, [])

  const onChangeMod = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setMod(parseInt(e.currentTarget.value, 10))
  }, [])

  const onChangeThreshold = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setThreshold(parseInt(e.currentTarget.value, 10))
  }, [])

  const onChangeAdvantage = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setAdvantage(e.currentTarget.value as AdvantageMode)
  }, [])

  const onChangeAggregate = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setAggregate(e.currentTarget.value as AggregateMode)
  }, [])

  const onRoll = useCallback(() => {
    const pool =
      `${quantity}D${sides}` +
      (advantage !== AdvantageMode.None ? ` with ${advantage}` : '')

    const resMap = rollDice(quantity, sides, advantage)
    const resArray = [] as RollResult[]

    for (const entry of resMap.entries()) {
      resArray.push({ key: entry[0], value: entry[1] })
    }

    const resSorted = sortBy(resArray, (x) => x.key)
    setPoolRolled(pool)
    setResults(resSorted)
  }, [quantity, sides, advantage])

  return (
    <div className="flex flex-col gap-2">
      <div className="font-semibold">Lets roll a bucket of dice!</div>
      <div className="flex flex-row items-center gap-2">
        <input
          type="number"
          step={1}
          min={1}
          name="quantity"
          placeholder="quantity"
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent grow shrink min-w-0"
          value={quantity}
          onChange={onChangeQuantity}
        />
        <span>D</span>
        <input
          type="number"
          step={1}
          min={1}
          name="sides"
          placeholder="sides"
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent grow shrink min-w-0"
          value={sides}
          onChange={onChangeSides}
        />
        <button
          className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          onClick={onRoll}
        >
          Roll
        </button>
      </div>
      <div className="flex flex-row items-center gap-2">
        <select
          name="advantage"
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent grow shrink-0"
          style={{ minWidth: '8em' }}
          value={advantage}
          onChange={onChangeAdvantage}
        >
          {Object.values(AdvantageMode).map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
        <span>+</span>
        <input
          type="number"
          step={1}
          name="mod"
          placeholder="mod"
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent grow shrink min-w-0"
          value={mod}
          onChange={onChangeMod}
        />
        <span>to each roll</span>
      </div>
      <hr></hr>
      <div className="flex flex-row items-center gap-2">
        <select
          name="aggregate"
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent grow shrink-0"
          style={{ minWidth: '8em' }}
          value={aggregate}
          onChange={onChangeAggregate}
        >
          {Object.values(AggregateMode).map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
        {aggregate === AggregateMode.Threshold && (
          <input
            type="number"
            step={1}
            min={1}
            name="threshold"
            placeholder="threshold"
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent grow min-w-0"
            value={threshold}
            onChange={onChangeThreshold}
          />
        )}
      </div>
      <hr></hr>
      {!results && <div>Ready to roll the dice?</div>}
      {results && (
        <div>
          <div>You rolled... {poolRolled}</div>
          <div className="my-2 text-red-500 font-semibold">
            <RollAggregate
              aggregate={aggregate}
              threshold={threshold}
              mod={mod}
              results={results}
            />
          </div>
          <ul className="flex flex-col ml-5 gap-0">
            {results?.map((x, i) => (
              <li
                key={x.key}
                className={
                  ((aggregate === AggregateMode.Threshold &&
                    threshold &&
                    x.key + mod >= threshold) ||
                  (aggregate === AggregateMode.Max && i === results.length - 1)
                    ? 'text-red-500 font-semibold'
                    : '') + ' flex flex-row'
                }
              >
                <span style={{ minWidth: '2em' }}>{x.key}:</span>{' '}
                <span>{x.value} times</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
