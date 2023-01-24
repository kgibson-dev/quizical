import {useState, useEffect, Fragment} from "react"

const QuizOptions = (props) => {
    const [categoryList, setCategoryList] = useState([])
    const [selectedOptions, setSelectedOptions] = useState(
        {
            category: 9,
            noOfQuestions: 5,
            difficulty: ""
        }
    )

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

    const optionElements = categoryList.map((category, index) => {
        return (
            <option key={index} value={category.id}>{category.name}</option>
        )
    })
 
    const handleChange = (event) => {
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
                    <div className="options">
                        <label className="start-label" htmlFor="categories">
                        Select a category:
                    </label>
                        <select 
                            id="categories" 
                            value={selectedOptions.catagory}
                            name="categories"
                            onChange={handleChange}
                            >
                            {optionElements}
                        </select>
                    </div>
                    <div className="options">
                        <label className="start-label" htmlFor="noOfQuestions">
                        Select the number of questions:
                        </label>
                        <select 
                            id="noOfQuestions" 
                            value={selectedOptions.noOfQuestions}
                            name="noOfQuestions"
                            onChange={handleChange}
                            >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </div>
                    <div className="options">
                        <label className="start-label" htmlFor="difficulty">
                        Select the difficulty of the questions:
                        </label>
                        <select 
                            id="difficulty" 
                            value={selectedOptions.difficulty}
                            name="difficulty"
                            onChange={handleChange}
                            >
                            <option value="">Mixed</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                </div>
                <button className="all-buttons" onClick={()=> props.onClickHandler(true, selectedOptions, props.name)}>Start Quiz</button>
        </Fragment>
    )
}

export default QuizOptions
