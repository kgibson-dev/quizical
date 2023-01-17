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
		setAnswers({...answers, [question]: event.target.id})
		// setAnswers((prevAnswers) =>{
		// 	if(prevAnswers.length === 0) {
		// 		return [...prevAnswers, { question: question, id: event.target.id }]
		// 	} else {
		// 		const updatedAnswers = prevAnswers.filter(
		// 			(answer) => answer.question !== question
		// 		)
		// 		updatedAnswers.push({ question: question, id: event.target.id })
		// 			return updatedAnswers
		// 	}
		// })
		
		
		setIsSelected((prevIsSelected) => {

			// 	if(prevIsSelected.length === 0){
			// 		return [{ id: event.target.id, isHeld: true }]
			// 	} else {
			// 		prevIsSelected.map(item => {
			// 		return item.id === event.target.id
			// 			? { ...prevIsSelected, isHeld: true}
			// 			: item

			// 	})
			// }

			// if (prevIsSelected.includes(s.question)) {
			// 	event.target.style.backgroundColor = "#FFF"
			// 	return prevIsSelected.filter(item => item !== event.target.id)
			// } else{

			// const updatedIsSelected = prevIsSelected.filter(
			// 	(answer) => answer.question !== question
			// )
			// // event.target.style.backgroundColor = "#D6DBF5"
			// updatedIsSelected.push({
			// 	question: question,
			// 	id: event.target.id,
			// })

			// return updatedIsSelected
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
					isSelected={isSelected}
				/>
			</Fragment>
		)
	})

	return <main>{questionElements}</main>
}

export default App
