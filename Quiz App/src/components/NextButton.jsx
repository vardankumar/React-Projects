
export default function NextButton({dispatch, answer, index, numQuestions}) {

    if(answer === null) return

  if(index < numQuestions - 1) return (
    <button 
        className="btn btn-ui" 
        onClick={() => dispatch({
            type : 'nextQuestion'
        })} 
        >
        NextButton
    </button>
  )

  if(index === numQuestions - 1) return (
    <button 
        className="btn btn-ui" 
        onClick={() => dispatch({
            type : 'finish'
        })} 
        >
        Finish
    </button>
  )
}
