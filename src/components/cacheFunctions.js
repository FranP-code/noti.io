const persistTasks = (modificatedTasks, props) => {
    localStorage.setItem('tasks', JSON.stringify(modificatedTasks))
}

const persistCounter = (props) => {
    localStorage.setItem('counter', JSON.stringify(props.counterInputs))
}

const restoreTasks = (props) => {
    let tasksCache = localStorage.getItem('tasks')

    tasksCache = JSON.parse(tasksCache)

    props.setTasks(tasksCache)
    
  }

const restoreCounter = (props) => {
  let counterInputCache = localStorage.getItem('counter')

  if (counterInputCache) {
        counterInputCache = JSON.parse(counterInputCache)
    }
    
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

export {persistTasks, persistCounter, checkCache}