import {useState} from "react"
import QuizOptions from "./quizOptions.component"

const Start = (props) => {
    
    const [name, setName] = useState("")

    const handleNameClick = () => {
        setName(document.getElementById("name-input").value)
    }

    
return (
        <div className="start-page">
            <h1 className="quiz-title" >Quizzical 🤔</h1>
            {!name && <h2 className="quiz-subtitle">Welcome</h2>}
            <label htmlFor="name-input">Please enter your name to start</label>
            <input id="name-input"></input>
            <button onClick={handleNameClick}>Let's go!</button>
            {name && <QuizOptions name/>}
            </div>
        
    )

}

export default Start 
