import {Fragment, useState, useEffect} from "react"
import Question from "./components/question/question.component"
import Answer from "./components/answer/answer.component"
import { nanoid } from "nanoid"

const App = () => {
	const [questions, setQuestions] = useState([])
	const [answers, setAnswers] = useState([])
	const [isSelected, setIsSelected] = useState([])

	const getQuestions = () => {
		fetch(
			"https://opentdb.com/api.php?amount=5&category=9&type=multiple&encode=url3986"
		)
			.then((res) => res.json())
			.then((data) =>
				setQuestions(
					data.results.map((question) => {
						const id = data.results.indexOf(question) + 1
						const answers = []
						answers.push({
							question: id,
							answer: decodeURIComponent(question.correct_answer),
							id: `q${id}`,
							correct: true,
						})
						question.incorrect_answers.map((answer) =>
							answers.push({
								question: id,
								answer: decodeURIComponent(answer),
								id: `q${id}_${nanoid()}`,
								correct: false,
							})
						)
						const randomAnswers = answers.sort(
							(a, b) => 0.5 - Math.random()
						)
						return {
							...question,
							id: id,
							randomAnswers: randomAnswers,
						}
					})
				)
			)
	}

	useEffect(function () {
		getQuestions()
	}, [])

	
	
	const handleAnswerClick = (event, isCorrect, question) => {
		
		setIsSelected((prevIsSelected) => {
			if (prevIsSelected.includes(event.target.id)) {
				
				event.target.style.backgroundColor = "#FFF"
				return prevIsSelected.filter(item => item !== event.target.id)
			} else{
				setAnswers((prevAnswers) => {
					return [...prevAnswers, event.target.id]
				})
				event.target.style.backgroundColor = "#D6DBF5"
				return [...prevIsSelected, event.target.id]
			}
				
		})
		
		}
	

	const questionElements = questions.map((q) => {
		return (
			<Fragment key={q.id}>
				<Question
					question={decodeURIComponent(q.question)}
					id={`q${q.id}`}
				/>
				<Answer
					onClickHandler={handleAnswerClick}
					answers={q.randomAnswers}
				/>
			</Fragment>
		)
	})

	return <main>{questionElements}</main>
}

export default App
