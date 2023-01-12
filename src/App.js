import React from "react"
import Question from "./components/Question"
import { nanoid } from "nanoid"

export default function App(){

  const [questions, setQuestions] = React.useState([])

 
  function getQuestions() {
    fetch(
		"https://opentdb.com/api.php?amount=5&category=9&type=multiple&encode=url3986"
	)
		.then((res) => res.json())
		.then((data) => setQuestions(data.results))
  }

  

  React.useEffect(function () {
		getQuestions()
  }, [])

 const questionElements = questions.map(q => {
    const answers = []
    answers.push(decodeURIComponent(q.correct_answer))
    q.incorrect_answers.map((answer) => answers.push(decodeURIComponent(answer)))
    
    return (
		<Question
			question={decodeURIComponent(q.question)}
			answers={answers}
		/>
	)
  })

  return (
    <main>
      {questionElements}
    </main> 
    )
}
