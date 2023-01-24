import {useState, useEffect, Fragment} from "react"
import Button from "../button/button.component"
import Select from "./select.component"

const QuizOptions = (props) => {
    const [categoryList, setCategoryList] = useState([])
    const [selectedOptions, setSelectedOptions] = useState(
        {
            category: 9,
            noOfQuestions: 5,
            difficulty: ""
        }
    )

    const noOfQuestions = [
        {id: 5, name: 5},
        {id: 10, name: 10},
        {id: 15, name: 15}
    ]

    const difficulty = [
        {id: "", name: "Mixed"},
        {id: "easy", name: "Easy"},
        {id: "medium", name: "Medium"},
        {id: "hard", name: "Hard"}
    ]

    const getCategories = () => {
        fetch("https://opentdb.com/api_category.php")
            .then((res) => {
                if (!res.ok) {
                    throw Error("Category data not available")
                }
                return res.json()
            })
            .then(data => 
                setCategoryList(data.trivia_categories)
                )
    }
    
    useEffect(() => {
        getCategories()
    }, [])

    const createOptionELements = (elArray) => {
        return elArray.map((item, index) => {
            return (
                <option key={index} value={item.id}>{item.name}</option>
            )
        })
    }

    const handleChange = (event) => {
        console.log("changed")
        setSelectedOptions(prevSelectedOptions => {
            if(event.target.id === "categories") {
             return {...prevSelectedOptions, category: parseInt(event.target.value)}
            } else if (event.target.id === "noOfQuestions"){
             return {...prevSelectedOptions, noOfQuestions: parseInt(event.target.value)}
            } else {
             return {...prevSelectedOptions, difficulty: event.target.value}
            }
        })
    }
    
    return (
        <Fragment>
            <div className="options-container">
                <div className="subtitle-container">
                    <h2 className="quiz-subtitle">Are you ready {props.name}!! </h2>
                    <p>Please select from the options below and then click Start Quiz</p>
                </div>
                <Select 
                    divClassName={"options"}
                    classname={"start-label"}
                    htmlfor={"categories"}
                    labelText={"Select a category:"}
                    id={"categories"}
                    value={selectedOptions.category}
                    name={"categories"}
                    onChange={handleChange}
                    selectText={createOptionELements(categoryList)}
                />

                <Select 
                    divClassName={"options"}
                    classname={"start-label"}
                    htmlfor={"noOfQuestions"}
                    labelText={"Select the number of questions:"}
                    id={"noOfQuestions"}
                    value={selectedOptions.noOfQuestions}
                    name={"noOfQuestions"}
                    onChange={handleChange}
                    selectText={createOptionELements(noOfQuestions)}
                />
                 <Select 
                    divClassName={"options"}
                    classname={"start-label"}
                    htmlfor={"difficulty"}
                    labelText={"Select the difficulty of the questions:"}
                    id={"difficulty"}
                    value={selectedOptions.difficulty}
                    name={"difficulty"}
                    onChange={handleChange}
                    selectText={createOptionELements(difficulty)}
                />
            </div>
                <Button 
                    classname={"all-buttons"}
                    onClickHandler={()=> props.onClickHandler(true, selectedOptions, props.name)}
                    buttonText={"Start Quiz"}
                />
                
        </Fragment>
    )
}

export default QuizOptions
