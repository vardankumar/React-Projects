export default function Progress({index, numOfQuestions, points, maxPossiblePoints, answer}) {
  return (
    <header className="progress" >
        <progress max={numOfQuestions} value={index + Number(answer !== null)}></progress>
        <p>Question <strong>{index + 1} / {numOfQuestions}</strong> </p>
        <p> <strong>{points} / {maxPossiblePoints}</strong> </p>
    </header>
  )
}
