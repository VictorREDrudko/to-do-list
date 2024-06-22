import React, { useState } from 'react';
import './App.css';
import { Todolist, taskType } from './components/Todolist';
import { v1 } from 'uuid';

function App() {
  // *********************ЛОГИКА***************************
  // ГЛОБАЛЬНЫЙ state
  const [tasks, setTasks] = useState<Array<taskType>>([
    {
      idTask: v1(),
      titleTask: "Monday",
      isDone: true
    },
    {
      idTask: v1(),
      titleTask: "Tuesday",
      isDone: false
    },
    {
      idTask: v1(),
      titleTask: "Wednesday",
      isDone: true
    },
    {
      idTask: v1(),
      titleTask: "Thursday",
      isDone: false
    },
    {
      idTask: v1(),
      titleTask: "Friday",
      isDone: false
    },
    {
      idTask: v1(),
      titleTask: "Saturday",
      isDone: false
    },
    {
      idTask: v1(),
      titleTask: "Sunday",
      isDone: true
    }
  ]);

  // Функция удаления task
  const deleteTask = (taskId: string) => {
    let newTasks = tasks.filter(el => el.idTask !== taskId);
    setTasks(newTasks);
  }

    // Функция добавления task
    const addTask = (titleInput: string) => {
      const newTask = {
        idTask: v1(),
        titleTask: titleInput,
        isDone: false
      }
      setTasks([newTask, ...tasks])
    }

    // Функция изменения статуса (checkbox)
    const changeStatusTask = (id: string, checked: boolean) => {
      // const currentTask : taskType | undefined = tasks.find(el => el.idTask === id)
      
      // if(currentTask) {
      //   currentTask.isDone = !currentTask.isDone
      // }

      // setTasks([...tasks])

      // С помощью map
      setTasks(tasks.map(el => el.idTask === id ? {...el, isDone: checked} : el))
    }

  // *****************Возврат разместки (верстка)************
  return (
    <div className="App">
      <Todolist title={"Training at the stadium"}
                tasks={tasks} 
                data={"01-09.06.2024"} 
                deleteTask={deleteTask} 
                addTask={addTask}
                changeStatusTask={changeStatusTask}/>
    </div>
  );
}

export default App;
