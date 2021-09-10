import React, {useState} from 'react'

const TaskList = (props) => {

    const persistTasks = (modificatedTasks) => {
        localStorage.setItem('tasks', JSON.stringify(modificatedTasks))
    }

    const deleteInput = (id) =>  {
        const deleted_task = props.tasks.filter(task => task.id !== id)
    
        props.setTasks(deleted_task)
        persistTasks(deleted_task)
    
      }
    
      const modifyInput = (id) => {
        props.setFormEditInput([true, id])
      }
    
      const modifyInputTwo = (e) => {
    
        e.preventDefault()
    
        if(!props.text.trim()) {
          props.setFormEditInput('')
          return
        }
    
        const taskID = props.tasks.findIndex(task => task.id === props.formEditInput[1])
    
        props.tasks[taskID].text = props.text
    
        props.setTasks(props.tasks)
        props.setText('')
        props.setFormEditInput('')
    
        persistTasks()
        
      }
    
    

    return (
        <>
         <div className="task-list">
          <div>
            {
              props.tasks.map (task => (
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

                    { props.formEditInput[0] && task.id === props.formEditInput[1] ? 

                      <form onSubmit={modifyInputTwo}>
                        <input
                          type="text"
                          placeholder="Task"
                          onChange={ (e) => props.setText(e.target.value) }
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
        </>
    )
}

export default TaskList
