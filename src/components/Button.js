import PropTypes from 'prop-types'


const Button = ({color,text,onClick}) => {

    return <button onClick = {onClick} className='btn' style={{backgroundColor : color}}>{text}</button>
        
}

Button.defautProps = {
    color : "steelblue",
    text : "Click"
}

Button.propTypes = {
    color: PropTypes.string,
    test : PropTypes.string,
    onClick : PropTypes.func,
}

export default Button
