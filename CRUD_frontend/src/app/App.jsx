import React from 'react';
import TaskList from '../tasklist/TaskList';
import Dropdown from '../dropdown/Dropdown';
import './App.css';

function App() {

    return (
      <>
        <div className="app-container">
            <TaskList/> 
            <Dropdown/>
        </div>
      </>
    )
  }
  
  export default App