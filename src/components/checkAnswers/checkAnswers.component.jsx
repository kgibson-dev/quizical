
const CheckAnswers = (props) => {
    return(
        <div className="button-container">
            <button className="all-buttons" onClick={()=> props.onClickHandler()}>Check Answers</button>
        </div>
        
    )
}

export default CheckAnswers
