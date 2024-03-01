import { useState } from "react"

const App = () => {
  return (
    <div className="App">
      <Counter/>
    </div>
  )
}

function Counter(){

  let [count, setCount] = useState(0)
  let [step, setStep] = useState(1)

  const date = new Date()
  date.setDate(date.getDate() + count)

  const handleReset = () => {
    setCount(0)
    setStep(1)
  }


  return(
    <>
      <div>

        <input type="range" min="0" max="10" value={step} onChange={(e) => setStep(e.target.value)} />
        <span> {step}</span>
      </div>

      <div>

          <button onClick={() => setCount((count) => count - (+step))}>-</button>
          <input type="text" value={count} onChange={(e) => setCount(e.target.value)} />
          <button onClick={() => setCount((count) => count + (+step))}>+</button>

      </div>

      <p>
        <span>{count === 0 ? "Today is " : count > 0 ? `${count} days from today is ` : `${Math.abs(count)} days ago was `}</span>
        <span>{date.toDateString()}</span>
      </p>

      { count !== 0 || step !== 1 ? <div>
        <button onClick={handleReset}>Reset</button>
      </div> : null}
  </>
  )
}



export default App