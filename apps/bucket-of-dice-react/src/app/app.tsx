import { FC } from 'react'
import { Credit } from './Credit'
import { DiceRoller } from './DiceRoller'

export const App: FC<{}> = () => {
  return (
    <div className="p-2 flex flex-col gap-2 min-h-screen supports-[height:100dvh]:min-h-dvh">
      <main className="grow">
        <DiceRoller />
      </main>
      <hr></hr>
      <footer>
        <Credit />
      </footer>
    </div>
  )
}

export default App
