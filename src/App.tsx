import React from 'react';
import './App.css';
import { TaskType, Todolist } from './components/Todolist';

function App() {
  const tasks1: Array<TaskType> = [
    {
      id: 1,
      title: "HTML5&CSS",
      isDone: true,
    },
    {
      id: 2,
      title: "JS",
      isDone: true,
    },
    {
      id: 3,
      title: "ReactJS",
      isDone: false,
    },
    {
      id: 4,
      title: "Redax",
      isDone: false,
    },
    {
      id: 5,
      title: "Typescript",
      isDone: false,
    },
    {
      id: 6,
      title: "RTK query",
      isDone: false,
    },
  ]

  const tasks2: Array<TaskType> = [
    // {
    //   id: 1,
    //   title: "Hello world",
    //   isDone: true,
    // },
    // {
    //   id: 2,
    //   title: "I'm happy",
    //   isDone: false,
    // },
    // {
    //   id: 3,
    //   title: "Yooh",
    //   isDone: false,
    // },
  ]

    return (
        <div className="App">
          <Todolist title={"What to learn"} tasks={tasks1} date="21/04/2024"/>
          <Todolist title={"Songs"} tasks={tasks2}/>
        </div>
    );
}

export default App;
