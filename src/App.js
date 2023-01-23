import {useState, useEffect} from "react"
import Question from "./components/question/question.component"
import Start from "./components/start/start.component"
import CheckAnswers from "./components/checkAnswers/checkAnswers.component"
import PlayAgain from "./components/playAgain/playAgain.component"

import { nanoid } from "nanoid"


const App = () => {
	const [quiz, setQuiz] = useState([])
	const [startGame, setStartGame] = useState(false)
	const [score, setScore] = useState(0)
	const [playAgain, setPlayAgain] = useState(false)
	const [checkAnswers, setCheckAnswers] = useState(false)
	const [quizOptions, setQuizOptions] = useState({noOfQuestions: 5, category: 9, difficulty: ''})
	
	
	const shuffleAnswers = (answersToBeShuffled) => {
		return answersToBeShuffled.sort((a, b) => 0.5 - Math.random())
	}

	

	const getQuestions = () => {
		
		fetch(
			`https://opentdb.com/api.php?amount=${quizOptions.noOfQuestions}&category=${quizOptions.category}&difficulty=${quizOptions.difficulty}&type=multiple&encode=url3986`
		)
			.then((res) => {
				if (!res.ok) {
					throw Error("Quiz data not available")
				}
				return res.json()
			})
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

	useEffect(() => {
		getQuestions()
	}, [playAgain, startGame])

	const handleStartGameClick = (startGameState, selectedOptions, name) => {
		localStorage.setItem("playerName", name)
		setQuizOptions(selectedOptions)
		setTimeout(() => {
			return setStartGame(startGameState)
		}, "500")
	}
	
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

	const handleCheckAnswerClick = () => {
		setCheckAnswers((prevCheckAnswers) => !prevCheckAnswers)
		let count = 0
		quiz.forEach(question => {
			question.randomAnswers.forEach(answer => {
				if(answer.isCorrect && answer.isSelected) {
					return count ++
				}
			})
		})
		setScore(preScore => count)
	}
	
	const handlePlayAgainClick = () => {
		setQuiz((prevQuiz) => [])
		setStartGame((prevStartGame) => !prevStartGame)
		setPlayAgain((prevPlayAgain) => !prevPlayAgain)
		setCheckAnswers((prevCheckAnswers) => !prevCheckAnswers)
		
		setScore(0)
	}
			
	const quizElements = quiz.map((q, index) => {
		return (
			<Question
					key={index+1}
					question={decodeURIComponent(q.question)}
					id={index+1}
					onClickHandler={handleAnswerClick}
					answers={q.randomAnswers}
					checkAnswers={checkAnswers}
				/>
			
		)
	})

	

	return (
		<main>
			<h1 className={!startGame ? "quiz-title centered" : "quiz-title" } >
				🤔 Quizzical 🤔
			</h1>
			
			{!startGame && (
				<Start
					startGame={startGame}
					onClickHandler={handleStartGameClick}
				/>
			)}
			{startGame && quizElements}
			{startGame && !checkAnswers && (
				<CheckAnswers onClickHandler={handleCheckAnswerClick} />
			)}
			{checkAnswers && (
				<PlayAgain
					onClickHandler={handlePlayAgainClick}
					score={score}
					noOfQuestions={quizOptions.noOfQuestions}
					name={localStorage.getItem("playerName")}
				/>
			)}
		</main>
	)
}

export default App
