import {useState, useEffect} from "react"
import Question from "./components/question/question.component"
import Start from "./components/start/start.component"
import CheckAnswers from "./components/checkAnswers/checkAnswers.component"

import { nanoid } from "nanoid"


const App = () => {
	const [quiz, setQuiz] = useState([])
	const [startGame, setStartGame] = useState(false)
	
	const shuffleAnswers = (answersToBeShuffled) => {
		return answersToBeShuffled.sort((a, b) => 0.5 - Math.random())
	}

	const handleStartGameClick = (startGameState) => {
		setTimeout(() => {
			return setStartGame(startGameState)
		}, "500")
		
	}

	const getQuestions = () => {
		fetch(
			"https://opentdb.com/api.php?amount=5&category=9&type=multiple&encode=url3986"
		)
			.then((res) => res.json())
			.then((data) =>
				setQuiz(
					data.results.map((question, index) => {
						const answers = []
						answers.push({
							question: index + 1,
							answer: decodeURIComponent(question.correct_answer),
							id: nanoid(),
							isCorrect: true,
							isSelected: false,
						})
						question.incorrect_answers.map((answer) =>
							answers.push({
								question: index + 1,
								answer: decodeURIComponent(answer),
								id: nanoid(),
								isCorrect: false,
								isSelected: false,
							})
						)
						return {
							...question,
							id: index + 1,
							randomAnswers: shuffleAnswers(answers),
						}
					})
				)
			)
	}

	useEffect(function () {
		getQuestions()
	}, [])

	
	
	const handleAnswerClick = (questionId, id) => {
		const updatedQuiz = quiz.map(question => {
			if(questionId === question.id) {
				const updatedAnswers = question.randomAnswers.map(answer => {
					if(answer.id === id) {
						return{...answer, isSelected:true}
					} else {
						return {...answer, isSelected:false}
					}
				})
				return {...question, randomAnswers: updatedAnswers}
			} else {
				return {...question}
			}
			
		})
		setQuiz(prevQuiz => updatedQuiz)
	}	

			
	const quizElements = quiz.map((q, index) => {
		return (
			<Question
					key={index+1}
					question={decodeURIComponent(q.question)}
					id={index+1}
					onClickHandler={handleAnswerClick}
					answers={q.randomAnswers}
				/>
			
		)
	})

	// const startGameElements = 

	return (
		<main>
			{!startGame && (
				<Start
					startGame={startGame}
					onClickHandler={handleStartGameClick}
				/>
			)}
			{startGame && quizElements}
			{startGame && <CheckAnswers />}
		</main>
	)
}

export default App
