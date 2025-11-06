import { sortBy } from 'lodash'
import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react'
import { RollAggregate } from './RollAggregate'
import { rollDice } from './rollDice'
import { RollMode, RollResult } from './types'

export const DiceRoller: FC<{}> = () => {
  const [quantity, setQuantity] = useState<number>(100)
  const [sides, setSides] = useState<number>(20)
  const [threshold, setThreshold] = useState<number>(13)
  const [mode, setMode] = useState<RollMode>(RollMode.Threshold)
  const [results, setResults] = useState<RollResult[]>()

  const onChangeQuantity = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.currentTarget.value, 10))
  }, [])

  const onChangeSides = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSides(parseInt(e.currentTarget.value, 10))
  }, [])

  const onChangeThreshold = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setThreshold(parseInt(e.currentTarget.value, 10))
  }, [])

  const onChangeMode = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setMode(e.currentTarget.value as RollMode)
  }, [])

  const onRoll = useCallback(() => {
    if (!quantity || !sides) {
      return
    }

    const resMap = rollDice(quantity, sides)
    const resArray = [] as RollResult[]

    for (const entry of resMap.entries()) {
      resArray.push({ key: entry[0], value: entry[1] })
    }

    const resSorted = sortBy(resArray, (x) => x.key)
    setResults(resSorted)
  }, [quantity, sides])

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
      <hr></hr>
      <div className="flex flex-row items-center gap-2">
        <select
          name="mode"
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent grow min-w-0"
          value={mode}
          onChange={onChangeMode}
        >
          {Object.values(RollMode).map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
        {mode === RollMode.Threshold && (
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
          <div>You rolled...</div>
          <div className="my-2 text-red-500 font-semibold">
            <RollAggregate
              mode={mode}
              threshold={threshold}
              results={results}
            />
          </div>
          <ul className="flex flex-col ml-5 gap-0">
            {results?.map((x) => (
              <li
                key={x.key}
                className={
                  (threshold && x.key >= threshold
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
