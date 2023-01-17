

 const Answer = ({answers, onClickHandler, isSelected}) => {
	// console.log(isSelected)
	// const styles = {backgroundColor: isSelected.id ? "#D6DBF5" : "#FFF"}
	return (
		<div className='answers-container' >
				{answers.map((answer) => {
					return (
						<p 
                        className="answer" 
                        key={answer.id} 
                        id={answer.id}
						// style={styles}
                        onClick={event => {onClickHandler(event, answer.correct, answer.question)}}
                        >
							{answer.answer}
						</p>
					)
				})}
			</div>
		
	)
}

export default Answer
