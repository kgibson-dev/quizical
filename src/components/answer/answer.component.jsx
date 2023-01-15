

 const Answer = ({answers, onClickHandler}) => {
	return (
		<div className='answers-container' >
				{answers.map((answer) => {
					return (
						<p 
                        className="answer" 
                        key={answer.id} 
                        id={answer.id}
                        onClick={event => {onClickHandler(event, answer.correct)}}
                        >
							{answer.answer}
						</p>
					)
				})}
			</div>
		
	)
}

export default Answer
