

 const Answer = (props) => {
	let styles
	let disable

	if(props.checkAnswers) {
		disable=true
		if(props.isCorrect){
			styles = {backgroundColor: "#94D7A2", border: "none"}
		} else if (props.isSelected && !props.isCorrect){
			styles = {backgroundColor: "#F8BCBC", border: "none", opacity: 0.5}
		} else if (!props.isCorrect && !props.isSelected){
			styles = {opacity: 0.5}
		}
		
	} else {
		styles = props.isSelected ? {backgroundColor: "#d6dbf5", border: "none"} : {backgroundColor: "#FFFFFF"}
	}
	
	return (
		<p 
			className="answer" 
			id={props.id}
			style={styles}
			disabled={disable}
			onClick={() => {props.onClickHandler(props.questionId, props.id)}}
			>
				{props.answer}
		</p>
	)
}

export default Answer
