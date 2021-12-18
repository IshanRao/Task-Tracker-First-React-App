import Task from "./Task"


const Tasks = ({tasks,onDelete, onToggle}) => {


    // When we want to edit state of task, we do not directly like tasks.push. We use th setTasks property to edit it. [...tasks,{}]
    return (
        <>
           {tasks.map((task) => (
               <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle }></Task>
           ))} 
        </>
    )
}

export default Tasks
