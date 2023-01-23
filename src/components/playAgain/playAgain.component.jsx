
const PlayAgain = (props) => {
    let message
    if(props.score === 5){
        message = `WOW ${localStorage.getItem("playerName")}. You scored ${props.score}/${props.noOfQuestions} correct answers!!`
    } else if (props.score <5 && props.score >2){
        message = `Well done ${localStorage.getItem("playerName")}. You scored ${props.score}/${props.noOfQuestions} correct answers. Try again to see if you can better that score`
    } else {
        message = `Unlucky ${localStorage.getItem("playerName")}. You scored ${props.score}/${props.noOfQuestions} correct answers. Try again to see if you can better that score`
    }

    return(
        <div className="scores-container">
            <p className="score">{message}</p>
            <button className="all-buttons" onClick={()=> props.onClickHandler()}>Play again</button>
        </div>
    )
}

export default PlayAgain
