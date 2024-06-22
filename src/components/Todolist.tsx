import styled from "styled-components"
import { ChangeEvent, useRef, useState } from "react"
import { Button } from "./Button"
import { Input } from "./Input"
import s from "./Todolist.module.css"

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
}

// Типизация фильтрации
export type filteringOption = "all" | "active" | "completed"


export const Todolist = ({title, tasks, data, idTodolist, deleteTask, addTask, changeStatusTask}: TodolistType) => {
  // *********************ЛОГИКА***************************
  // ЛОКАЛЬНЫЙ useState
  const [filter, setFilter] = useState<filteringOption>("all");
  const [textInput, setTextInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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
    const onChangeHundler = (event: ChangeEvent<HTMLInputElement>) => {
      changeStatusTask(el.idTask, event.currentTarget.checked, idTodolist);
    }

    return (
      <ItemStyle key={el.idTask}>
        <CheckboxStyle type='checkbox' checked={el.isDone} onChange={onChangeHundler}></CheckboxStyle>
        <span className={el.isDone ? s.completedTask : ''}>{el.titleTask}</span>
        <Button titleBtn="X" callbackBtn={()=> deleteTask(el.idTask, idTodolist)}/>
      </ItemStyle>
    )
  });

  // Функция отправки данных из локального в глобальный state
  const addTaskHandler = () => {
    textInput.trim() ? addTask(textInput, idTodolist) : setError("Введите название задачи!");
    setTextInput('');
  }


  // **********************Верстка (разметка)********************************
   return (
    <TodolistStyle>
      <TitleStyle>{title}</TitleStyle>
      <InputWrapperStyle>
        <Input textInput={textInput} setTextInput={setTextInput} addTaskHandler={addTaskHandler}/>
        <Button titleBtn={"+"} callbackBtn={addTaskHandler}/>
        <ErrorStyle>{error}</ErrorStyle>
      </InputWrapperStyle>
      <ItemsStyle>
        {tasks.length === 0 ? <div>No tasks</div> : mappedTasks}
      </ItemsStyle>
      <DataStyle>
        <span>{data}</span>
      </DataStyle>
      <Button titleBtn={"all"} callbackBtn={()=>changeFilter("all")} filter={filter} />
      <Button titleBtn={"active"} callbackBtn={()=>changeFilter("active")} filter={filter}/>
      <Button titleBtn={"completed"} callbackBtn={()=>changeFilter("completed")} filter={filter}/>
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

const ErrorStyle = styled.div`
  color: red;
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