

const Question = ({question, id}) => {
	return (
		<h2 className="question" key={id}>{question}</h2>
	)
}

export default Question
