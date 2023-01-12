import {Fragment, useState, useEffect} from "react"
import Question from "./components/question/question.component"
import Answer from "./components/answer/answer.component"
import { nanoid } from "nanoid"

const App = () => {

  const [questions, setQuestions] = useState([])
  const [userAnswers, setUserAnswers] = useState([])

 
  const getQuestions = () => {
    fetch(
		"https://opentdb.com/api.php?amount=5&category=9&type=multiple&encode=url3986"
	)
		.then((res) => res.json())
		.then((data) => setQuestions(data.results.map(question => {
      return {...question, id: nanoid()}

    }) 
    ))
  }

  
  useEffect(function () {
		getQuestions()
  }, [])

  const handleAnswerClick = (event) => {
    setUserAnswers([...userAnswers, event.target.id])
    console.log(userAnswers)
  }


 const questionElements = questions.map(q => {
    const randomAnswers = []
    randomAnswers.push({answer: decodeURIComponent(q.correct_answer), id: nanoid()})
    q.incorrect_answers.map((answer) =>
		  randomAnswers.push({answer: decodeURIComponent(answer), id: nanoid()})
    )
    
   return (
		<Fragment>
			<Question
				question={decodeURIComponent(q.question)}
				id={q.id}
			/>
			<Answer 
        onClickHandler={handleAnswerClick}
        answers={randomAnswers}
       />
		</Fragment>
	)
  })

  return (
    <main>
      {questionElements}
    </main> 
    )
}

export default App
