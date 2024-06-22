import React, { useState } from 'react';
import './App.css';
import { Todolist, filteringOption, taskType } from './components/Todolist';
import { v1 } from 'uuid';

// Типизация входных данных
type TodolistType = {
  idTodolist: string
  titleTodolist: string
  filter: filteringOption
}

export type TasksPropsType = {
  [idTodolist: string]: taskType[]
}


function App() {
  // *********************ЛОГИКА***************************
  // Input Data
  const idTodolist1 = v1();
  const idTodolist2 = v1();

  // ГЛОБАЛЬНЫЙ state
  const [todolists, setTodolists] = useState<TodolistType[]>([
    {
      idTodolist: idTodolist1,
      titleTodolist: 'What do I need to learn',
      filter: "all"
    },
    {
      idTodolist: idTodolist2,
      titleTodolist: 'What do I need to do',
      filter: "all"
    }
  ])

  const [tasks, setTasks] = useState<TasksPropsType>({
    [idTodolist1]: [
                    {idTask: v1(), titleTask: "HTML", isDone: true},
                    {idTask: v1(), titleTask: "CSS", isDone: true},
                    {idTask: v1(), titleTask: "JavaScript", isDone: false},
                    {idTask: v1(), titleTask: "React", isDone: false},
                  ],
    [idTodolist2]: [
                    {idTask: v1(), titleTask: "I need to do sports", isDone: true},
                    {idTask: v1(), titleTask: "I need to learn frontend development", isDone: false},
                    {idTask: v1(), titleTask: "I need to change jobs", isDone: false},
                  ],
  })





  // Функция удаления task
  const deleteTask = (taskId: string, idTodolist: string) => {
    setTasks(
      {...tasks, 
        [idTodolist]: tasks[idTodolist].filter(task => task.idTask !== taskId)
      }
    )
  }

    // Функция добавления task
    const addTask = (titleInput: string, idTodolist: string) => {
      const newTask = {
        idTask: v1(),
        titleTask: titleInput,
        isDone: false
      }

      setTasks({...tasks, [idTodolist]: [newTask, ...tasks[idTodolist]]})
    }

    // Функция изменения статуса (checkbox)
    const changeStatusTask = (id: string, checked: boolean, idTodolist: string) => {
      setTasks({...tasks, 
        [idTodolist]: tasks[idTodolist].map(task => task.idTask === id ? {...task, isDone: checked} : task)
      })
    }

    // Изменение фильтра todolist
    const changeFilterTodolist = (filter: filteringOption, idTodolist: string) => {
      setTodolists(todolists.map(todolist => todolist.idTodolist === idTodolist ? {...todolist, filter: filter} : todolist))
    }

    // Отрисовка Todolists
    const mappedTodolist = todolists.map(todolist => {
      return(
        <Todolist title={todolist.titleTodolist}
                idTodolist={todolist.idTodolist}
                tasks={tasks[todolist.idTodolist]} 
                data={"01-09.06.2024"} 
                deleteTask={deleteTask} 
                addTask={addTask}
                changeStatusTask={changeStatusTask}/>
      )
    })
   



  // *****************Возврат разместки (верстка)************
  return (
    <div className="App">
      {mappedTodolist}
    </div>
  );
}

export default App;
