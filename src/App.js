import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState , useEffect } from "react" // useEffect is data Fetching or Call API
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Footer from './components/Footer';
import About from './components/About';
import React from 'react';
const App = () => {

  const [showAddTask, setShowAddTask] = useState(false) // show/ off Add Task 
  const [tasks, setTasks] = useState([]) // use useState() to change state

  //call Fetch API
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()

  }, []) // [] is run 1th useEffect()

  // Fetch Tasks
  const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

    // Fetch Task for Toggle Task
    const fetchTask = async(id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
  
      return data
    }
    
// 1.delete task
const deleteTask = async(id) => {// id -> delete id
  //delete from json server using delete method
  await fetch(`http://localhost:5000/tasks/${id}`,{method: 'DELETE'})
  setTasks(tasks.filter((task) => task.id !== id // same as {return taskid.id !== id }, !==id -> filter ramain
  ))
}

//2.Toggle Remainder --> click change color green
const toggleRemainder = async(id) => {

  // Toggle Remainder on Json Server
  const taskToToggle = await fetchTask(id)
  const updTask = {...taskToToggle,
  reminder: !taskToToggle.reminder
  }

  //update json data respective id
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updTask)
  })

  const data = await res.json()

  console.log(data)

  // update json data with data
  setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task)) // click id equal array id change boolean type otherwise set original array
}

// 3.Add task
const addTask = async(task) => {
  // const id = Math.floor(Math.random() *10000 ) + 1 // generate auto id 
  // const newTask = {id, ...task} // insert id to task object
  // setTasks([...tasks, newTask]) // insert new object to tasks arr

  //Add Task to Json Server
  const res = await fetch('http://localhost:5000/tasks',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task)
  })

  const data = await res.json()

  setTasks([...tasks, data])
}

  return(
    <BrowserRouter>
        <div className='container'>
          <Header onAdd={() => setShowAddTask(!showAddTask)} showCloseBtn={showAddTask}/> {/*onAdd() is show add form when add buton clik */}
          <Routes>
            <Route exact={true} path='/' element={
            <>
              {showAddTask && <AddTask onAddTask={addTask}/>}
              {tasks.length > 0 ? <Tasks tasks= {tasks} onDelete= {deleteTask} onToggle={toggleRemainder} /> : ('No Task To Show')} 
            </>
            }
            />
            <Route path='/about' element= {<About />} />
          </Routes>
          <Footer />
        </div>

    </BrowserRouter>
  )
}

export default App;
