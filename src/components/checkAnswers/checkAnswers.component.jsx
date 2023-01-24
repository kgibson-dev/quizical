import Button from "../button/button.component"

const CheckAnswers = (props) => {
    return(
        <div className="button-container">
            <Button 
                classname={"all-buttons"}
                onClickHandler={()=> props.onClickHandler()}
                buttonText={"Check Answers"}
            />
            
        </div>
        
    )
}

export default CheckAnswers
