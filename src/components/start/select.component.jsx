
const Select = (props) => {
    return (
        <div className={props.divClassName}>
            <label className={props.classname} htmlFor={props.htmlfor}>
            {props.labelText}
            </label>
            <select 
                id={props.id} 
                value={props.value}
                name={props.name}
                onChange={props.onChange}
                >
                {props.selectText}
            </select>
        </div>
    )
    
}

export default Select
