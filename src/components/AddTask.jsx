import React, {useState} from 'react'

const AddTask = (props) => {



    const validateInput = (e, id = 0 ) => {
        e.preventDefault()
    
        props.setMessageInvalidText('')
    
        if (!props.text.trim()) {
          props.setMessageInvalidText('Text empty, please send a new task')
          return
        }
    
        props.setTasks([...props.tasks,
            {
              text: props.text,
              id: props.counterInputs
            }
          ])
    
          props.setCounterInputs(props.counterInputs + 1)
          
          props.setFormEditInput('')
          
          e.target.reset()
          
          persistTasks([...props.tasks,
            {
              text: props.text,
              id: props.counterInputs
            }
          ])
          
          persistCounter()
          //props.setText('')
        }

    const persistTasks = (modificatedTasks) => {
        localStorage.setItem('tasks', JSON.stringify(modificatedTasks))
    }

    const persistCounter = () => {
        localStorage.setItem('counter', JSON.stringify(props.counterInputs))
    }

    const restoreTasks = () => {
        let tasksCache = localStorage.getItem('tasks')
    
        tasksCache = JSON.parse(tasksCache)
    
        props.setTasks(tasksCache)
        
      }
    
      const restoreCounter = () => {
        let counterInputCache = localStorage.getItem('counter')
    
        counterInputCache = JSON.parse(counterInputCache)
    
        props.setCounterInputs(counterInputCache + 1)
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

    return (
        <>
            <div className="add-task">
                <h3 className="invalidInput"> {props.messageInvalidText} </h3>
                <form onSubmit={validateInput}>
                    <input
                        type="text"
                        placeholder="Task"
                        id="task-name"
                        onChange={(e) => props.setText(e.target.value)}
                        autoComplete="off"
                        />
                    <input
                        type="submit"
                        value="Add Task"
                        className="button-task submit-task"
                    />
                </form>

            </div>
        </>
    )
}

export default AddTask
