import { AnimatorGeneralProvider } from '@arwes/animation'
import { ArwesThemeProvider, StylesBaseline } from '@arwes/core'
import './App.css'
import { Leaderboard } from './leaderboard/Leaderboard'

const generalAnimator = { duration: { enter: 200, exit: 200 } }

function App() {

  return (
    // @ts-ignore
    <ArwesThemeProvider>
      <StylesBaseline styles={{ body: { fontFamily: '"Titillium Web", sans-serif' } }} />
      <AnimatorGeneralProvider animator={generalAnimator}>
        <div style={{ padding: 16 }}>
          <Leaderboard />
        </div>
      </AnimatorGeneralProvider>
    </ArwesThemeProvider>
  )
}

export default App
