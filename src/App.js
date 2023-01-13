import {Fragment, useState, useEffect} from "react"
import Question from "./components/question/question.component"
import Answer from "./components/answer/answer.component"
import { nanoid } from "nanoid"

const App = () => {
	const [questions, setQuestions] = useState([])
	const [answers, setAnswers] = useState([])

	const getQuestions = () => {
		fetch(
			"https://opentdb.com/api.php?amount=5&category=9&type=multiple&encode=url3986"
		)
			.then((res) => res.json())
			.then((data) =>
				setQuestions(
					data.results.map((question) => {
						const id = data.results.indexOf(question)
						return { ...question, id: id }
					})
				)
			)
	}

	useEffect(function () {
		getQuestions()
	}, [])

	const handleAnswerClick = (event, isCorrect) => {
		isCorrect ? console.log("Correct") : console.log("Wrong")
		console.log(event.target.id)
	}

	const questionElements = questions.map((q) => {
		const answers = []
		answers.push({
			answer: decodeURIComponent(q.correct_answer),
			id: `q${q.id}`,
			correct: true,
		})
		q.incorrect_answers.map((answer) =>
			answers.push({
				answer: decodeURIComponent(answer),
				id: nanoid(),
				correct: false,
			})
		)
		const randomAnswers = answers.sort((a, b) => 0.5 - Math.random())

		return (
			<Fragment key={q.id}>
				<Question
					question={decodeURIComponent(q.question)}
					id={`q${q.id}`}
				/>
				<Answer
					onClickHandler={handleAnswerClick}
					answers={randomAnswers}
				/>
			</Fragment>
		)
	})

	return <main>{questionElements}</main>
}

export default App
