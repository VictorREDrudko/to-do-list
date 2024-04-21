import { Button } from "./Button"

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
    <div>
      <h3>{title}</h3>
      <div>
          <input/>
          <Button title={"+"}/>
      </div>
      {tasks.length === 0 ? (<p>"No task"</p>) : (
        <ul>
          {tasks.map((task) => {
            // debugger
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/> 
                <span>{task.title}</span>
              </li>
            )
          })}
        </ul>
      )}
      <div>
          <Button title={"All"}/>
          <Button title={"Active"}/>
          <Button title={"Completed"}/>
      </div>
      <div>{date}</div>
    </div>
  )
}