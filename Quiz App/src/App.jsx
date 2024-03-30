import { useReducer } from 'react'
import Header from './Header'
import Main from './components/Main'
import Loader from './Loader'
import Error from './Error'
import data from "./data/questions.json"
import StartScreen from './components/StartScreen'
import Question from './components/Question'
import NextButton from './components/NextButton'
import Progress from './components/Progress'
import Finished from './components/Finished'

const initialState = {
  questions : [...data.questions],
  status : 'ready',
  index : 0,
  answer : null,
  points : 0,
  highScore : 0,
}

function reducer(state, action){
  switch(action.type){
    case "dataFailed":
      return {
        ...state,
        status : 'error',
      }
    case "start":
      return {
        ...state,
        status : 'active',
      }
    case "newAnswer":
      const question = state.questions.at(state.index)

      return {
        ...state,
        answer : action.payload,
        points : action.payload === question.correctOption ? state.points + question.points : state.points 
      }
    case "nextQuestion" : 
      return {
        ...state,
        index : state.index + 1,
        answer : null
      }
    case "finish" : 
      return {
        ...state,
        status : 'finished',
        highScore : state.points > state.highScore ? state.points : state.highScore
      }
    case "restart" : 
      return {
        ...initialState,
      }
      default :
        throw new Error('Action Unknow')
  }
}

console.log(initialState.questions)

function App() {
  const [{questions, status, index, answer, points, highScore}, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0)

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader/>}
        {status === 'error' && <Error/>}
        {status === 'ready' && <StartScreen dispatch={dispatch} numQuestions={numQuestions} />}
        {status === 'active' && 
          <>
            <Progress index={index} numOfQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer} />
            <Question answer={answer}  question={questions[index]} dispatch={dispatch} />
            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
          </>
        }
        {status === 'finished' && <Finished points={points} maxPossiblePoints={maxPossiblePoints} highScore={highScore} dispatch={dispatch} />}
      </Main>
    </div>  
  )
}

export default App
