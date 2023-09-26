import React, { useState } from "react";
import "./App.css";

function App() {
  const [stages, setStages] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");

  const addTask = () => {
    if (task && date) {
      const newTask = { task, date, completed: false };
      setStages({ ...stages, todo: [...stages.todo, newTask] });
      setTask("");
      setDate("");
    }
  };

  const moveToStage = (index, stageName) => {
    const taskToMove = stages.todo[index];
    const updatedTodo = stages.todo.filter((_, i) => i !== index);
    setStages({
      ...stages,
      [stageName]: [...stages[stageName], taskToMove],
      todo: updatedTodo,
    });
  };

  const toggleCompletion = (index) => {
    const updatedTodo = [...stages.todo];
    updatedTodo[index].completed = !updatedTodo[index].completed;
    setStages({ ...stages, todo: updatedTodo });
  };

  return (
    <div className="App">
      <h1>To-Do App with Stages</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="stages">
        <div className="stage">
          <h2>To-Do</h2>
          <ul>
            {stages.todo.map((taskItem, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={taskItem.completed}
                  onChange={() => toggleCompletion(index)}
                />
                <span className={taskItem.completed ? "completed" : ""}>
                  {taskItem.task} - {taskItem.date}
                </span>
                <button onClick={() => moveToStage(index, "inProgress")}>
                  Start
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="stage">
          <h2>In Progress</h2>
          <ul>
            {stages.inProgress.map((taskItem, index) => (
              <li key={index}>
                <span>
                  {taskItem.task} - {taskItem.date}
                </span>
                <button onClick={() => moveToStage(index, "done")}>
                  Complete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="stage">
          <h2>Done</h2>
          <ul>
            {stages.done.map((taskItem, index) => (
              <li key={index}>
                <span className="completed">
                  {taskItem.task} - {taskItem.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
