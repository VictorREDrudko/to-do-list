import List from "@mui/material/List"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectTasks } from "../../../../model/tasksSelectors"
import { DomenTodolist } from "../../../../model/todolists-reducer"
import { Task } from "./Task/Task"
import { useEffect } from "react"
import { useAppDispatch } from "common/hooks"
import { TaskStatus } from "common/enums"
import { fetchTasksTC } from "features/todolists/model/tasks-reducer"

type Props = {
  todolist: DomenTodolist
}

export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id))
  }, [])

  const allTodolistTasks = tasks[todolist.id]

  let tasksForTodolist = allTodolistTasks

  if (todolist.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.New)
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {/* вариант защиты от undefined с помощью оператора &&*/}
      {tasksForTodolist && tasksForTodolist.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {/* вариант защиты от undefined с помощью оператора функциональности ?*/}
          {tasksForTodolist?.map((task) => {
            return <Task task={task} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}
