import styled from "styled-components";
import { EditableSpan } from "../editableSpan/EditableSpan";
import { Button } from "../Button";
import { filteringOption, taskType } from "../Todolist";
import { ChangeEvent } from "react";
import s from "./../Todolist.module.css"

type TasksType = {
  tasks: taskType[]
  filter: filteringOption
  idTodolist: string
  changeStatusTask: (id: string, checked: boolean, idTodolist: string)=>void
  deleteTask: (taskId: string, idTodolist: string)=>void
  updateTask: (newTitle: string, idTodolist: string, taskId: string) => void
}


export const Tasks = ({tasks, filter, changeStatusTask, idTodolist, deleteTask, updateTask} : TasksType) => {
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

    const updateItemHandler = (idTask: string, newTitle: string) => {
      updateTask(newTitle, idTodolist, idTask)
    }
  
      return (
        <ItemStyle key={el.idTask}>
          <CheckboxStyle type='checkbox' checked={el.isDone} onChange={onChangeHundler}></CheckboxStyle>
          <EditableSpan  oldTitle={el.titleTask} 
                        isDone={el.isDone} 
                        completed={s.completedTask} 
                        updateItem={(newTitle: string) => updateItemHandler(el.idTask, newTitle)}/>
          <Button titleBtn="X" callbackBtn={()=> deleteTask(el.idTask, idTodolist)}/>
        </ItemStyle>
      )
    });

    return (
      mappedTasks
    )
}

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