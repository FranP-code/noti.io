import React, {useState} from 'react'
import {persistTasks, persistCounter} from './cacheFunctions'

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
          ], props)
          
          persistCounter(props)
          //props.setText('')
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
