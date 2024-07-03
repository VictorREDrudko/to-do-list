import styled from "styled-components"
import { ChangeEvent, useRef, useState } from "react"
import { Button } from "./Button"
import { Input } from "./Input"
import s from "./Todolist.module.css"
import { AddItemForm } from "./addItemForm/AddItemForm"
import { EditableSpan } from "./editableSpan/EditableSpan"
import { Tasks } from "./tasks/Tasks"

// *******************ТИПИЗАЦИЯ****************************
// типизация объекта Todolist (task)
export type taskType = {
  idTask: string
  titleTask: string,
  isDone: boolean
}

// типизация Todolist
type TodolistType = {
  idTodolist: string
  title: string
  tasks: taskType[]
  data?: string
  deleteTask: (taskId: string, idTodolist: string)=>void
  addTask: (titleInput: string, idTodolist: string)=>void
  changeStatusTask: (id: string, checked: boolean, idTodolist: string)=>void
  deleteTodolist: (idTodolist: string)=>void
  updateTask: (newTitle: string, idTodolist: string, taskId: string) => void
  updateTodolist: (newTitle: string, idTodolist: string) => void
}

// Типизация фильтрации
export type filteringOption = "all" | "active" | "completed"


export const Todolist = (props: TodolistType) => {
  const {title, tasks, data, idTodolist, deleteTask, addTask, deleteTodolist, changeStatusTask, updateTask, updateTodolist} = props
  // *********************ЛОГИКА***************************
  // ЛОКАЛЬНЫЙ useState
  const [filter, setFilter] = useState<filteringOption>("all");

  // Функция выбора типа фильтрации
  const changeFilter = (filter: filteringOption) => {
    setFilter(filter);
  }

  // Удаление todolist по клику
  const deleteTodolistHandler = () => {
    deleteTodolist(idTodolist)
  }

  // Функция-посредник по добавлению task
  const addTaskHandler = (titleInput: string) => {
    addTask(titleInput, idTodolist)
  }

  // Функция посредник для добавления из локального state в глобальный
  const updateTodolistHandler = (newTitle: string) => {
    updateTodolist(newTitle, idTodolist)
  }

  // **********************Верстка (разметка)********************************
   return (
    <TodolistStyle>
      <TitleWrapper>
        <TitleStyle>
          <EditableSpan oldTitle={title} isDone={false} completed={s.completedTask} updateItem={updateTodolistHandler}/>
        </TitleStyle>
        <Button titleBtn={"X"} callbackBtn={deleteTodolistHandler}/>
      </TitleWrapper>
      <AddItemForm addItem={addTaskHandler}/>
      {tasks.length === 0 ? <div>No tasks</div> : 
        <Tasks  tasks={tasks} 
                filter={filter} 
                changeStatusTask={changeStatusTask} 
                idTodolist={idTodolist}
                deleteTask={deleteTask}
                updateTask={updateTask}
        />}
      <DataStyle>
        <span>{data}</span>
      </DataStyle>
      <ButtonWrapper>
        <Button titleBtn={"all"} callbackBtn={()=>changeFilter("all")} filter={filter} />
        <Button titleBtn={"active"} callbackBtn={()=>changeFilter("active")} filter={filter}/>
        <Button titleBtn={"completed"} callbackBtn={()=>changeFilter("completed")} filter={filter}/>
      </ButtonWrapper>
    </TodolistStyle>
  )
}

  // *********************СТИЛИ******************************************
const TodolistStyle = styled.div`
  background-color: #e1e1e1;
  border-radius: 15px;
  padding: 10px;
  border: 1px solid rgb(172, 172, 172);
  box-shadow: 5px 5px 10px 3px rgba(93, 93, 93, 0.5);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
  width: 100%;

    & button {
    width: 25px;
    background-color: #970000;
    color: #ffffff;
    margin-left: 10px;
    padding: 5px;
    border-radius: 50%;

    &:hover {
      background-color: #ea6363;
    }
  }
`

const TitleStyle = styled.h2`
  max-width: 300px;
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  font-family: 'Roboto';
  color: #2f025a;
`

const DataStyle = styled.div`
  margin-bottom: 10px;
  font-size: 12px;
`

const ButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`