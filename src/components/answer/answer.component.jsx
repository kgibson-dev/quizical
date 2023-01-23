

 const Answer = (props) => {
	let styles
	let disable

	if(props.checkAnswers) {
		disable=true
		if(props.isCorrect){
			styles = {backgroundColor: "#62cf79", border: "none"}
		} else if (props.isSelected && !props.isCorrect){
			styles = {backgroundColor: "#e95858", border: "none", opacity: 0.5, color: "white"}
		} else if (!props.isCorrect && !props.isSelected){
			styles = {opacity: 0.75, color: "white"}
		}
	} else {
		styles = props.isSelected ? {backgroundColor: "#ec7f0e", border: "none"} : {backgroundColor: "#b2b4c4"}
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
