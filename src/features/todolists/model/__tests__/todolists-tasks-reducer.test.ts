import { Todolist } from "features/todolists/api/todolistsApi.types"
import { tasksReducer, TasksStateType } from "../tasks-reducer"
import { addTodolistAC, DomenTodolist, todolistsReducer } from "../todolists-reducer"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: DomenTodolist[] = []

  const todolist: Todolist = {
    title: "new todolist",
    id: "any id",
    addedDate: "",
    order: 0,
  }

  const action = addTodolistAC({title: todolist.title, todolistId: todolist.id})

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolistId)
  expect(idFromTodolists).toBe(action.payload.todolistId)
})
