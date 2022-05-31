import React from 'react'
import PropTypes from 'prop-types'


const Button = ({ color, text, onClick}) => {

  return (
    <div>
       <button onClick={onClick} className='btn' style={{backgroundColor: color}}> {text}</button>  {/*dyanmic button control by header.js using props */}
    </div>
  )
}

Button.defaultProps = {
    color: 'red' // if not specify color on header 
}

Button.propTypes = { // specify propTypes is string not number
  text: PropTypes.string,
  color: PropTypes.string
}

export default Button
