import "./App.css";
import React, {useState} from "react";

function App() {

  document.title = 'Noti.io' 

  const [tasks, setTasks] = useState([{
    text: 'Test Task',
    id: 616 
  }])

  const [text, setText] = useState('')
  const [messageInvalidText, setMessageInvalidText] = useState('')

  const [counterInputs, setCounterInputs] = useState(1)
  const [formEditInput, setFormEditInput] = useState('')

  const persistTasks = (modificatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(modificatedTasks))
  }

  const persistCounter = () => {
    localStorage.setItem('counter', JSON.stringify(counterInputs))
  }

  const restoreTasks = () => {
    let tasksCache = localStorage.getItem('tasks')

    tasksCache = JSON.parse(tasksCache)

    setTasks(tasksCache)
    
  }

  const restoreCounter = () => {
    let counterInputCache = localStorage.getItem('counter')

    counterInputCache = JSON.parse(counterInputCache)

    setCounterInputs(counterInputCache + 1)
  }

  const checkCache = () => {
    if (localStorage.getItem('tasks')) {
      restoreTasks()
    }

    if (localStorage.getItem('counter')) {
      restoreCounter()
    }
    return
  }

  window.onload = () => {
    checkCache()
  }
  

  const validateInput = (e, id = 0 ) => {
    e.preventDefault()

    setMessageInvalidText('')

    if (!text.trim()) {
      setMessageInvalidText('Text empty, please send a new task')
      return
    }

    setTasks([...tasks,
        {
          text: text,
          id: counterInputs
        }
      ])

      setCounterInputs(counterInputs + 1)
      
      setFormEditInput('')
      
      e.target.reset()
      
      persistTasks([...tasks,
        {
          text: text,
          id: counterInputs
        }
      ])
      
      persistCounter()
      //setText('')
    }
  

  const deleteInput = (id) =>  {
    const deleted_task = tasks.filter(task => task.id !== id)

    setTasks(deleted_task)
    persistTasks(deleted_task)

  }

  const modifyInput = (id) => {
    setFormEditInput([true, id])
  }

  const modifyInputTwo = (e) => {

    e.preventDefault()

    if(!text.trim()) {
      setFormEditInput('')
      return
    }

    const taskID = tasks.findIndex(task => task.id === formEditInput[1])

    tasks[taskID].text = text

    setTasks(tasks)
    setText('')
    setFormEditInput('')

    persistTasks()
    
  }



  return (
    <>
      <header className="main-header"><h1>Noti.io</h1></header>
      <div className="app">
        <div className="task-list">
          <div>
            {
              tasks.map (task => (
                <div className="task" key= {task.id}>
                  <div className="task-info">
                    <div className="task-text">
                      <h2> { task.text } </h2>
                      <span> ({task.id}) </span>
                    </div>
                    <div className="task-buttons">
                      <button onClick={ () => modifyInput(task.id)} className="mini-button edit-button">Edit</button>
                      <button button onClick={ () => deleteInput(task.id)} className="mini-button delete-button">Remove</button>
                    </div>
                  </div>

                  <div className="space-edit-task">

                    { formEditInput[0] && task.id === formEditInput[1] ? 

                      <form onSubmit={modifyInputTwo}>
                        <input
                          type="text"
                          placeholder="Task"
                          onChange={ (e) => setText(e.target.value) }
                          className="input-edit-task"
                          autoFocus
                          autoComplete="off"
                        />
                        <input
                          type="submit"
                          value="Edit Task"
                          className="mini-button edit-task"
                        />
                      </form>

                      : <></>
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <div className="add-task">
          <h3 className="invalidInput"> {messageInvalidText} </h3>
          <form onSubmit={validateInput}>
            <input
              type="text"
              placeholder="Task"
              id="task-name"
              onChange={(e) => setText(e.target.value)}
              autoComplete="off"
              />
            <input
              type="submit"
              value="Add Task"
              className="button-task submit-task"
            />
          </form>

        </div>
      </div>
      <footer>Made with 💓 by <a href="https://www.upwork.com/freelancers/~01d6fc06b8da216c2b">Francisco Pessano</a></footer>
    </>
  );
}

export default App;
