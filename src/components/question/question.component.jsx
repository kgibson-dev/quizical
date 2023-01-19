import Answer from "../answer/answer.component"

const Question = (props) => {

	const answersDisplay = props.answers.map((answer, index) => {
		return (
			<Answer 
				key={index+1}
				id={answer.id}
				answer={answer.answer}
				isSelected={answer.isSelected}
				isCorrect={answer.isCorrect}
				onClickHandler={props.onClickHandler}
				questionId={props.id}
			/>
		)
	})

	return (
		<div className='questions-container' key={props.id}>
			<h2 className="question" id={props.id}>{props.question}</h2>
			<div className='answers-container' >{answersDisplay}</div>
		</div>
	)
}

export default Question
