import styled from "styled-components"
import { Button } from "./Button"

export type taskType = {
  idTask: number
  titleTask: string,
  isDone: boolean
}

type TodolistType = {
  title: string
  tasks: taskType[]
  data?: string
}

export const Todolist = ({title, tasks, data}: TodolistType) => {
  // Логика
  const mappedTascs = tasks.map(el => {
    return (
      <ItemStyle key={el.idTask}>
        <CheckboxStyle type='checkbox' checked={el.isDone}></CheckboxStyle>
        {el.titleTask}
      </ItemStyle>
    )
  })
  
  // Верстка (разметка)
  return (
    <TodolistStyle>
      <TitleStyle>{title}</TitleStyle>
      <div>
        <InputStyle type="text" />
        <Button titleBtn={"+"}/>
      </div>
      <ItemsStyle>
        {tasks.length === 0 ? <div>No tasks</div> : mappedTascs}
      </ItemsStyle>
      <DataStyle>
        <span>{data}</span>
      </DataStyle>
      <Button titleBtn={"All"}/>
      <Button titleBtn={"Active"}/>
      <Button titleBtn={"Completed"}/>
    </TodolistStyle>
  )
}


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

const InputStyle = styled.input`
  height: 30px;
  width: 200px;
  border-radius: 10px;
  margin-right: 10px;
  padding: 0 10px;
  font-size: 16px;
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