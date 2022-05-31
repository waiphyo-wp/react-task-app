import PropTypes from 'prop-types'
import Button from './Button.js'
import { useLocation } from 'react-router-dom'

const Header = ({title, onAdd, showCloseBtn}) => { // title props come from defaultProps title

  const location = useLocation()

  return (
    <header className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' && (
      <Button color={showCloseBtn? 'red' : 'green'} 
        text={showCloseBtn ? 'Close' :'Add'} onClick={onAdd}/>)} {/*onClick={onAdd} -> show add task form*/}
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker'
}
 
Header.propTypes = {
    title: PropTypes.string.isRequired // title must include 
}

export default Header
