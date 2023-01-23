import {useState} from "react"
import QuizOptions from "./quizOptions.component"

const Start = (props) => {
    
    const [name, setName] = useState("")

    const handleNameClick = () => {
        setName(document.getElementById("name-input").value)
       
    }

    
return (
        <div className="start-page">
            
            {!name && <div className="start-page">
                <h2 className="quiz-subtitle">Welcome to Quizzical</h2>
                <label htmlFor="name-input">Please enter your name to start</label>
                <input id="name-input" autoFocus></input>
                
            </div>}
            {!name && <button className="all-buttons" onClick={handleNameClick}>Let's go!</button>}
            {name && <QuizOptions 
                name={name} 
                onClickHandler={props.onClickHandler}
                />
            }
        </div>
        
    )

}

export default Start 
