

const Question = (props) => {
	const {question, id} = props
	
    return (
		<h2 className="question" key={id}>{question}</h2>
		
	)
}

export default Question
