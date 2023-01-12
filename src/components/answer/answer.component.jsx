

 const Answer = (props) => {
	const {answers, onClickHandler} = props
    return (
		<div className='answers-container' >
				{answers.map((answer) => {
					return (
						<p 
                        className="answer" 
                        key={answer.id} 
                        id={answer.id}
                        onClick={onClickHandler}
                        >
							{answer.answer}
						</p>
					)
				})}
			</div>
		
	)
}

export default Answer
