import { useEffect, useState } from "react";
import './TaskList.css';

function TaskList(){
    const [tasks, setTasks] = useState([]);

    useEffect (() => {
        async function getTasks() {
            let response = await fetch("http://localhost:3000/tasks");
            let taskArray = await response.json();
            setTasks(taskArray);
        }
        // I could add more async function ...() here.
        getTasks();
    }, []);


    return (
    <div className= "task-list">
        {tasks.map((task) => ( 
        <div key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
        </div>
        ))}
    </div>
    );
};

export default TaskList;