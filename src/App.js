import './App.css';
import { useState, useEffect } from "react"
//import REACT from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

function App() {

  // useState is a REACT hook. It can be used oly inside functions and not inside classes. Classes use setState instead for achieving the same functionality
  // useState must always be executed in order it is in the code. So, it cannot be used inside conditionals or loops where it is possible that they might not run
  
  const [showAddTask, setShowAddTask ] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect( () => {

    const getTasks = async () => {

      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    
    getTasks();

  }, []);

  const fetchTasks = async () => {

    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

   return data;
  }

  const fetchTask = async (id) => {

    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

   return data;
  }


  const deleteTask = async (id) => {

    await fetch(`http://localhost:5000/tasks/${id}`, {method : 'DELETE'});
    setTasks(tasks.filter( (task) => task.id !== id));

  }

  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id);
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder};

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {

        method : 'PUT',
        headers : {
          'Content-type' : 'application/json'
        },
        body : JSON.stringify(updatedTask)
    });

    const data = await res.json();

    setTasks( tasks.map( (task) => task.id === id ? { ...task, reminder : data.reminder } : task));
  }

  const addTask = async (task) => {

    // const id = Math.floor(Math.random()*100) + 1;
    // const newTask = {id, ...task};
    // setTasks([...tasks,newTask]);

    const res = await fetch('http://localhost:5000/tasks', {

        method : 'POST',
        headers : {
          'Content-type' : 'application/json'
        },
        body : JSON.stringify(task)
    })

    const data = await res.json();

    setTasks([...tasks,data]);

  }


  return (
    <Router>
    <div className="container">
     <Header onAdd = { () => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
     <Routes>
     <Route 
     path='/' 
        element=  {
            <> 
            {showAddTask && <AddTask onAdd={addTask} />}
            {  tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : ('No tasks on TO-DO') }
            </>} 
         />     
     <Route path='/about' element={<About />} />
     </Routes>
     <Footer />
    </div>
    </Router>
  );
}

// class App extends REACT.Component{
//   render(){    
//     return <h1> I am in a class implementation</h1>    
//   }
// }

export default App;
