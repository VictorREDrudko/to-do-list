import styled from "styled-components"
import { useState } from "react"
import { Button } from "./Button"

// *******************ТИПИЗАЦИЯ****************************
// типизация объекта Todolist (task)
export type taskType = {
  idTask: number
  titleTask: string,
  isDone: boolean
}

// типизация Todolist
type TodolistType = {
  title: string
  tasks: taskType[]
  data?: string
  deleteTask: (taskId: number)=>void;
}

// Типизация фильтрации
type filteringOption = "all" | "active" | "completed"


export const Todolist = ({title, tasks, data, deleteTask}: TodolistType) => {
  // *********************ЛОГИКА***************************
  // ЛОКАЛЬНЫЙ useState
  const [filter, setFilter] = useState<filteringOption>("all");

  // Функция выбора типа фильтрации
  const changeFilter = (filter: filteringOption) => {
    setFilter(filter);
  }

  // Функция проверки и возврата отфильтрованного массива
  const getFilteredTask = (allTasks: Array<taskType>, filterValue: filteringOption): taskType[] => {
    if(filterValue === "completed") {
      return allTasks.filter(el => el.isDone)
    };

    if(filterValue === "active") {
      return allTasks.filter(el => !el.isDone)
    } else {return allTasks};
  };

  // Отрисовка отфильтрованного tasks
  const filteredTask: Array<taskType> = getFilteredTask(tasks, filter);


  // Отрисовка task из массива данных tasks
  const mappedTasks = filteredTask.map(el => {
    return (
      <ItemStyle key={el.idTask}>
        <CheckboxStyle type='checkbox' defaultChecked={el.isDone}></CheckboxStyle>
        {el.titleTask}
        <Button titleBtn="X" callbackBtn={()=> deleteTask(el.idTask)}/>
      </ItemStyle>
    )
  });


  // **********************Верстка (разметка)********************************
   return (
    <TodolistStyle>
      <TitleStyle>{title}</TitleStyle>
      <ItemsStyle>
        {tasks.length === 0 ? <div>No tasks</div> : mappedTasks}
      </ItemsStyle>
      <DataStyle>
        <span>{data}</span>
      </DataStyle>
      <Button titleBtn={"All"} callbackBtn={()=>changeFilter("all")}/>
      <Button titleBtn={"Active"} callbackBtn={()=>changeFilter("active")}/>
      <Button titleBtn={"Completed"} callbackBtn={()=>changeFilter("completed")}/>
    </TodolistStyle>
  )
}

  // *********************СТИЛИ***************************
const TodolistStyle = styled.div`
  background-color: #f5d4fe;
  border-radius: 15px;
  padding: 10px;
  border: 1px solid rgb(246, 168, 250);
  box-shadow: 5px 5px 10px 3px rgba(127, 2, 134, 0.2);
`

const TitleStyle = styled.h2`
  max-width: 300px;
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  font-family: 'Roboto';
  margin: 10px 0 20px;
  color: #510163;
`

const ItemsStyle = styled.ul`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 30px;
`

const ItemStyle = styled.li`
  font-size: 18px;
`

const CheckboxStyle = styled.input`
  height: 15px;
  width: 15px;
  margin-right: 10px;
`

const DataStyle = styled.div`
  margin-bottom: 10px;
  font-size: 12px;
`

{/* <div>
  <Input textInput={textInput} setTextInput={setTextInput}/>
  <Button titleBtn={"+"} callbackBtn={onClickBtnAddNewTask}/>
</div> */}