import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App'
import TaskList from './tasklist/TaskList'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <TaskList/>
  </StrictMode>,
)
