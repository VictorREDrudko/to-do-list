import styled from "styled-components"
import { Button } from "./Button"
import { InputItem } from "./InputItem"

export type TaskType = {
  id: number,
  title: string,
  isDone: boolean,
}

type TodolistPropsType = {
  title: string
  tasks: TaskType[]
  date?: string
}

//                       деструктурирующее присваивание
export const Todolist = ({ title, tasks, date }: TodolistPropsType) => {

  return (
    <TodolistStyle>
      <TitleTodolist>{title}</TitleTodolist>
      <InputItem/>
      {tasks.length === 0 ? (<p>"No task"</p>) : (
        <ItemWrapper>
          {tasks.map((task) => {
            // debugger
            return (
              <Item key={task.id}>
                <input type="checkbox" checked={task.isDone}/> 
                <span>{task.title}</span>
              </Item>
            )
          })}
        </ItemWrapper>
      )}
      <ButtonWrapper>
          <Button title={"All"}/>
          <Button title={"Active"}/>
          <Button title={"Completed"}/>
      </ButtonWrapper>
      <div>{date}</div>
    </TodolistStyle>
  )
}

const TodolistStyle = styled.div`
  background-color: #aafe93;
  border-radius: 15px;
  padding: 10px;
  border: 1px solid green;
  box-shadow: 5px 5px 15px 3px rgba(1, 1, 1, 0.5);
`

const TitleTodolist = styled.h2`
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  font-family: 'Roboto';
  margin: 10px 0 20px;
  color: #023f0e;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  margin: 15px 0;
`

const ItemWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 30px;
`

const Item = styled.li`
  color: #023f0e;
  
  & span {
    margin-left: 10px;
  }
`