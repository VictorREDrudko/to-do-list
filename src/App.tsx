import React from 'react';
import './App.css';
import { Todolist, taskType } from './components/Todolist';

function App() {

  const tasks1: Array<taskType> = [
    {
      idTask: 1,
      titleTask: "Monday",
      isDone: true
    },
    {
      idTask: 2,
      titleTask: "Tuesday",
      isDone: false
    },
    {
      idTask: 3,
      titleTask: "Wednesday",
      isDone: false
    },
    {
      idTask: 4,
      titleTask: "Thursday",
      isDone: false
    },
    {
      idTask: 5,
      titleTask: "Friday",
      isDone: false
    },
    {
      idTask: 6,
      titleTask: "Saturday",
      isDone: false
    },
    {
      idTask: 7,
      titleTask: "Sunday",
      isDone: false
    }
  ]

  const tasks2: Array<taskType> = [
    {
      idTask: 1,
      titleTask: "HTML5&CSS",
      isDone: true,
    },
    {
      idTask: 2,
      titleTask: "JS",
      isDone: true,
    },
    {
      idTask: 3,
      titleTask: "ReactJS",
      isDone: false,
    },
    {
      idTask: 4,
      titleTask: "Redax",
      isDone: false,
    },
    {
      idTask: 5,
      titleTask: "Typescript",
      isDone: false,
    },
    {
      idTask: 6,
      titleTask: "RTK query",
      isDone: false,
    },
  ]

  const tasks3: Array<taskType> = []

    return (
        <div className="App">
          <Todolist title={"Training at the stadium"} tasks={tasks1} data={"20-26.05.2024"}/>
          <Todolist title={"Web development technologies"} tasks={tasks2} data={"21.05.2024"}/>
          <Todolist title={"New To Do List"} tasks={tasks3}/>
        </div>
    );
}

export default App;
