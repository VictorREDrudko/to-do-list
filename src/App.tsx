import React, { useState } from 'react';
import './App.css';
import { Todolist, taskType } from './components/Todolist';

function App() {
  // *********************ЛОГИКА***************************
  // ГЛОБАЛЬНЫЙ useState
  const [tasks, setTasks] = useState<Array<taskType>>([
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
      isDone: true
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
      isDone: true
    }
  ]);

  // Функция удаления task
  const deleteTask = (taskId: number) => {
    let newTasks = tasks.filter(el => el.idTask !== taskId);
    setTasks(newTasks);
  }

  // *****************Возврат разместки (верстка)************
  return (
    <div className="App">
      <Todolist title={"Training at the stadium"} tasks={tasks} data={"20-26.05.2024"} deleteTask={deleteTask} />
    </div>
  );
}

export default App;


  // const tasks1: Array<taskType> = [
  //   {
  //     idTask: 1,
  //     titleTask: "Monday",
  //     isDone: true
  //   },
  //   {
  //     idTask: 2,
  //     titleTask: "Tuesday",
  //     isDone: false
  //   },
  //   {
  //     idTask: 3,
  //     titleTask: "Wednesday",
  //     isDone: false
  //   },
  //   {
  //     idTask: 4,
  //     titleTask: "Thursday",
  //     isDone: false
  //   },
  //   {
  //     idTask: 5,
  //     titleTask: "Friday",
  //     isDone: false
  //   },
  //   {
  //     idTask: 6,
  //     titleTask: "Saturday",
  //     isDone: false
  //   },
  //   {
  //     idTask: 7,
  //     titleTask: "Sunday",
  //     isDone: false
  //   }
  // ]

  // const tasks2: Array<taskType> = [
  //   {
  //     idTask: 1,
  //     titleTask: "HTML5&CSS",
  //     isDone: true,
  //   },
  //   {
  //     idTask: 2,
  //     titleTask: "JS",
  //     isDone: true,
  //   },
  //   {
  //     idTask: 3,
  //     titleTask: "ReactJS",
  //     isDone: false,
  //   },
  //   {
  //     idTask: 4,
  //     titleTask: "Redax",
  //     isDone: false,
  //   },
  //   {
  //     idTask: 5,
  //     titleTask: "Typescript",
  //     isDone: false,
  //   },
  //   {
  //     idTask: 6,
  //     titleTask: "RTK query",
  //     isDone: false,
  //   },
  // ]

  // const tasks3: Array<taskType> = [];



  // Удаление task
  {/* <Todolist title={"Web development technologies"} tasks={tasks2} data={"21.05.2024"}/>
  <Todolist title={"New To Do List"} tasks={tasks3}/> */}
