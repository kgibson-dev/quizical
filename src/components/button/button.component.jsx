
const Button = (props) => {
    return(
        <button className={props.classname} onClick={props.onClickHandler}>{props.buttonText}</button>
    )
}

export default Button
