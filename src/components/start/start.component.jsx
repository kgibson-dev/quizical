

const Start = (props) => {
    return (
        <div className="start-page">
            <h1 className="quiz-title" >Quizzical</h1>
            <button className="all-buttons" onClick={()=> props.onClickHandler(true)}>Start Quiz</button>
        </div>
        
    )

}

export default Start 
