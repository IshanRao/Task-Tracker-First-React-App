import PropTypes from 'prop-types'
import Button from './Button'
// import Tasks from './Tasks'
import { useLocation } from 'react-router-dom'


const Header = ({title, onAdd, showAdd}) => {

    const location = useLocation();

    return (
        <header className="header">
           <h1> {title}</h1>           
           {location.pathname === '/' && <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>}
        </header>
    )
}

// const Header = (props) => {

//     const onClick = () => {
//         console.log('click');
//     }
    
//     return (
//         <header className="header">
//            <h1> {props.title}</h1>
           
//           <Button color='green' text='Add' onClick={onClick}/>
//         </header>
//     )
// }


// Inline style arguments are to be passed into doube brackets {{}}
// When we are passing a variable we can do it normally using single brackets {}
// const Header = ({title}) => {

//     return(
//         <h1 style={{color : "red", backgroundColor : "yellow"}}>
//         I am destructured title {title}
//         <p style={style2}>New syle</p>
//         </h1>        
//     )

// }

// const style2 = {
//     color: "pink",
// }

// This for type checking the argument that is passed into the component argument
Header.propTypes = {
    title : PropTypes.string,
}
Header.defaultProps = {title : "Task Tracker"}       // Useful when we don't pass any argument on App.js while calling the component
export default Header;
