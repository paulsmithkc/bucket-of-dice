import { FC } from 'react'
import { Credit } from './Credit'
import { DiceRoller } from './DiceRoller'

export const App: FC<{}> = () => {
  return (
    <div className="flex flex-col gap-2 min-h-screen p-2">
      <div className="grow">
        <DiceRoller />
      </div>
      <hr></hr>
      <div>
        <Credit />
      </div>
    </div>
  )
}

export default App
