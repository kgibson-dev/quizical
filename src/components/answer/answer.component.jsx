

 const Answer = (props) => {
	const styles = props.isSelected ? {backgroundColor: "#d6dbf5"} : {backgroundColor: "#FFFFFF"}
	return (
		<p 
			className="answer" 
			id={props.id}
			style={styles}
			onClick={() => {props.onClickHandler(props.questionId, props.id)}}
			>
				{props.answer}
		</p>
	)
}

export default Answer
