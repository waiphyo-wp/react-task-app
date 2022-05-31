import { FaTimes } from 'react-icons/fa' // import {icon-name} from 'react-cons/fa'

const Task = ({task, onDelete, onToggle}) => {
  return (
    <div className={`task ${task.reminder? 'reminder': '' }`} onDoubleClick={() => onToggle(task.id)}>
      <h3>{task.text} <FaTimes style={{color: 'red', cursor: 'pointer', }} 
      onClick={ () => onDelete(task.id) } /></h3> {/* get id ever click close button */}
      <p>{task.day}</p>
    </div>
  )
}

export default Task
