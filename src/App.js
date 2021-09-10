import "./App.css";
import React, {useState} from "react";
import Header from './components/Header'
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import { checkCache } from "./components/cacheFunctions";

function App() {

  document.title = 'Noti.io'

  const [tasks, setTasks] = useState([{
      text: 'Test Task',
      id: 616 
    }])

  const [text, setText] = useState('')

  const [counterInputs, setCounterInputs] = useState(1)

  const [messageInvalidText, setMessageInvalidText] = useState('')


  const [formEditInput, setFormEditInput] = useState('')

  window.onload = () => {
    checkCache()
  }
  
  return (
    <>
      <Header />
      <div className="app">

        <TaskList
          tasks={tasks}
          setTasks={setTasks}

          text={text}
          setText={setText}

          formEditInput={formEditInput}
          setFormEditInput={setFormEditInput}
        />

        <AddTask
          tasks={tasks}
          setTasks={setTasks}
          
          text={text}
          setText={setText}
          
          formEditInput={formEditInput}
          setFormEditInput={setFormEditInput}
          
          counterInputs={counterInputs}
          setCounterInputs={setCounterInputs}
          
          messageInvalidText={messageInvalidText}
          setMessageInvalidText={setMessageInvalidText}
          
        />

      </div>
      <Footer />

      
    </>
  );
}

export default App;
