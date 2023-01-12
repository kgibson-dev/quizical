import React from 'react'

export default function Question(props) {
	
    return (
		<div>
			<h2 className="question"> {props.question}</h2>
			<div className='answers-container'>
				{props.answers.map((answer) => {
					return <p className="answer">{answer}</p>
				})}
			</div>
		</div>
	)
}
