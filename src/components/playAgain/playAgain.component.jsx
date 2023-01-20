
const PlayAgain = (props) => {
    return(
        <div className="scores-container">
            <p className="score">{`You scored ${props.score}/${props.noOfQuestions} correct answers`}</p>
            <button className="all-buttons" onClick={()=> props.onClickHandler()}>Play again</button>
        </div>
    )
}

export default PlayAgain
