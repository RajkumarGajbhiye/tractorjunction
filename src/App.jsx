import React, { useState } from 'react';
import "./App.css"

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  
  const addTask = () => {
    if (newTask.trim() === '') return;
    const task = { id: Date.now(), title: newTask, stage: 'To Do', timestamp: new Date() };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const moveTask = (taskId, direction) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        if (direction === 'Next' && task.stage !== 'Done') {
          task.stage = task.stage === 'To Do' ? 'In Progress' : 'Done';
          task.timestamp = new Date();
        } else if (direction === 'Previous' && task.stage !== 'To Do') {
          task.stage = task.stage === 'Done' ? 'In Progress' : 'To Do';
          task.timestamp = new Date();
        }
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <>
    <div className="add-task">
    <input
      type="text"
      placeholder="Add a task"
      value={newTask}
      onChange={e => setNewTask(e.target.value)}
    />
    <button className='btn' onClick={addTask}>Add</button>
  </div>
    <div className="main">
      <div className="stage">
        <h2>To Do</h2>
        {tasks
          .filter(task => task.stage === 'To Do')
          .map(task => (
            <div key={task.id} className="task" style={{ backgroundColor: 'red' }}>
              <p>{task.title}</p>
              <p>Timestamp: {task.timestamp.toLocaleString()}</p>
              <button  onClick={() => moveTask(task.id, 'Next')} disabled={task.stage === 'Done'}>Next</button>
            </div>
          ))}
      </div>
      <div className="stage">
        <h2>In Progress</h2>
        {tasks
          .filter(task => task.stage === 'In Progress')
          .map(task => (
            <div key={task.id} className="task" style={{ backgroundColor: 'yellow' }}>
              <p>{task.title}</p>
              <p>Timestamp: {task.timestamp.toLocaleString()}</p>
              <button className='buttonColor' onClick={() => moveTask(task.id, 'Previous')} disabled={task.stage === 'To Do'}>Previous</button>
              <button className='buttonColor' onClick={() => moveTask(task.id, 'Next')} disabled={task.stage === 'Done'}>Next</button>
            </div>
          ))}
      </div>
      <div className="stage">
        <h2>Done</h2>
        {tasks
          .filter(task => task.stage === 'Done')
          .map(task => (
            <div key={task.id} className="task" style={{ backgroundColor: 'green' }}>
              <p>{task.title}</p>
              <p>Timestamp: {task.timestamp.toLocaleString()}</p>
              <button onClick={() => moveTask(task.id, 'Previous')} disabled={task.stage === 'To Do'}>Previous</button>
            </div>
          ))}
      </div>
    </div>
    </>
  );
}

export default App;
