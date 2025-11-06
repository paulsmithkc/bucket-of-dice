import { sortBy } from 'lodash';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { rollDice } from './rollDice';

type RollResult = { key: number; value: number };

export function App() {
  const [quantity, setQuantity] = useState<string>('100');
  const [sides, setSides] = useState<string>('20');
  const [threshold, setThreshold] = useState<string>('13');
  const [results, setResults] = useState<RollResult[]>();

  const onChangeQuantity = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.currentTarget.value);
  }, []);

  const onChangeSides = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSides(e.currentTarget.value);
  }, []);

  const onChangeThreshold = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setThreshold(e.currentTarget.value);
  }, []);

  const onRoll = useCallback(() => {
    const quantityInt = parseInt(quantity);
    const sidesInt = parseInt(sides);

    if (!quantityInt || !sidesInt) {
      return;
    }

    const resMap = rollDice(quantityInt, sidesInt);
    const resArray = [] as RollResult[];

    for (const entry of resMap.entries()) {
      resArray.push({ key: entry[0], value: entry[1] });
    }

    const resSorted = sortBy(resArray, (x) => x.key);
    setResults(resSorted);
  }, [quantity, sides]);

  const overThreshold = useMemo(() => {
    const thresholdInt = parseInt(threshold);

    if (!results || !thresholdInt) {
      return;
    }

    let overThreshold = 0;
    for (const entry of results) {
      if (entry.key >= thresholdInt) {
        overThreshold += entry.value;
      }
    }

    return overThreshold;
  }, [threshold, results]);

  return (
    <div className="flex flex-col gap-2 m-2">
      <div className="font-semibold">Lets roll a bucket of dice!</div>
      <form className="flex flex-row gap-2" action={onRoll}>
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
        <span className="p-2">D</span>
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
      </form>
      <div>
        <label htmlFor="threshold" className="p-2">
          Threshold
        </label>
        <input
          id="threshold"
          type="number"
          step={1}
          min={1}
          name=""
          placeholder="threshold"
          className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent grow shrink min-w-0"
          value={threshold}
          onChange={onChangeThreshold}
        />
      </div>
      <hr></hr>
      {!results && <div>Ready to roll the dice?</div>}
      {results && (
        <div>
          <div>You rolled...</div>
          {threshold && (
            <div className="my-2 font-semibold">
              {overThreshold} times at the threshold or above
            </div>
          )}
          {results?.map((x) => (
            <div key={x.key}>
              <span className="my-2 font-semibold">{x.key}:</span>{' '}
              <span>{x.value} times</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
