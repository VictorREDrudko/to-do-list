import styled from "styled-components"
import { useState } from "react"
import { Button } from "./Button"
import { Input } from "./Input"

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
  const [textInput, setTextInput] = useState<string>("");

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
        <span>{el.titleTask}</span>
        <Button titleBtn="X" callbackBtn={()=> deleteTask(el.idTask)}/>
      </ItemStyle>
    )
  });


  // **********************Верстка (разметка)********************************
   return (
    <TodolistStyle>
      <TitleStyle>{title}</TitleStyle>
      <InputWrapperStyle>
        <Input textInput={textInput} setTextInput={setTextInput}/>
        <Button titleBtn={"+"} callbackBtn={()=>{}}/>
      </InputWrapperStyle>
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
  background-color: #e1e1e1;
  border-radius: 15px;
  padding: 10px;
  border: 1px solid rgb(172, 172, 172);
  box-shadow: 5px 5px 10px 3px rgba(93, 93, 93, 0.5);
`

const InputWrapperStyle = styled.div`
  margin-bottom: 40px;

  & button {
    padding: 5px;
    background-color: #0c5a02;
    width: 40px;
    font-size: 18px;
    font-weight: 600;

    &:hover {
      background-color: #329b01;
    }
  }
`

const TitleStyle = styled.h2`
  max-width: 300px;
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  font-family: 'Roboto';
  margin: 10px 0 20px;
  color: #2f025a;
`

const ItemsStyle = styled.ul`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
`

const ItemStyle = styled.li`
  font-size: 18px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;

  & span {
    flex-grow: 1;
  }

  &:hover {
    background-color: #cdcdcd;
  }

  & button {
    padding: 5px;
    width: 22px;
    height: 22px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #970000;
    color: #ffffff;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 10px;
    margin-left: 10px;
    font-family: 'Roboto';
    transition: all 0.5s;
    border: none;

    &:hover {
      background-color: #ea6363;
    }
  }
`

const CheckboxStyle = styled.input`
  height: 18px;
  width: 18px;
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