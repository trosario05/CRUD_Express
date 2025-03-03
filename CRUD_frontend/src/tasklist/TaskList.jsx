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
    <div>
        {tasks.map((task) => (
        <ul> 
            <li>{task.title}</li>
            <li>{task.description}</li>
            <li>{task.is_completed}</li>
            
        

        </ul>
        ))}
    </div>
    );
};

export default TaskList