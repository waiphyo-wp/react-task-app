import {useState} from 'react'

const AddTask = ({onAddTask}) => {

  //useState to change input field
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

const onSubmit = (e) => {
  // 1. prevent reload
  e.preventDefault()

  // 2.validate as warning
  if (!text) {
    alert ('Please add a task')
    return
  }

  // 3.call onAddTask
  onAddTask({ text, day, reminder })

  // 4.form clean
  setText('')
  setDay('')
  setReminder(false)

}

  return (
    <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
            <label>Task</label>
            <input type="text" placeholder="Add Task" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="form-control">
            <label>Day & Time</label>
            <input type="text" placeholder="Add Day & Time" value={day} onChange={(e) => setDay(e.target.value)}/>
        </div>
        <div className="form-control form-control-check">
            <label>set Reminder</label>
            <input type="checkbox" value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} checked={reminder} />
        </div>
            <input type="submit" value="Save Task" className="form-control btn btn-block" />
    </form>
  )
}

export default AddTask
