import { v1 } from "uuid"
import { TasksStateType } from "../App"
import { ADD_TODOLIST, addTodolistAC, AddTodolistACType, REMOVE_TODOLIST, RemoveTodolistACType } from "./todolists-reducer"

const ADD_TASK = 'ADD-TASK'
const REMOVE_TASK = 'REMOVE-TASK'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'

let todolistID1 = v1()
let todolistID2 = v1()

type addTaskACType = ReturnType<typeof addTaskAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type ChangeTaskTitleACType = ReturnType<typeof chandeTaskTitleAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

type ActionCreatorType = addTaskACType 
  | RemoveTaskACType 
  | ChangeTaskTitleACType
  | ChangeTaskStatusACType 
  | AddTodolistACType
  | RemoveTodolistACType

const initialState: TasksStateType = {
  [todolistID1]: [
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: false},
  ],
  [todolistID2]: [
    {id: v1(), title: 'Rest API', isDone: true},
    {id: v1(), title: 'GraphQL', isDone: false},
  ],
}

export const tasksReducer = (state = initialState, action: ActionCreatorType) => {

  switch (action.type) {
    case ADD_TASK: 
      const newTask = {id: v1(), title: action.payload.title, isDone: false}
      return {...state, [action.payload.idTodolist]: [newTask, ...state[action.payload.idTodolist]]
    }
    case REMOVE_TASK: 
      return {...state, [action.payload.idTodolist]: 
        state[action.payload.idTodolist].filter(t => t.id !== action.payload.idTask)
    }
    case CHANGE_TASK_TITLE:
      return {...state, [action.payload.idTodolist]:
        state[action.payload.idTodolist].map(t => t.id === action.payload.idTask
           ? {...t, title: action.payload.title} : t)
    }
    case CHANGE_TASK_STATUS:
      return {...state, [action.payload.idTodolist]:
        state[action.payload.idTodolist].map(t => t.id === action.payload.idTask
           ? {...t, isDone: action.payload.isDone} : t)
    }
    case ADD_TODOLIST: 
      return {
        [action.payload.todolistId] : [], ...state,
    }
    case REMOVE_TODOLIST: 
      delete state[action.payload.id]
      return {
        ...state
      }
    default: return state
  }
}

export const addTaskAC = (idTodolist: string, title: string) => {
  return {
    type: ADD_TASK,
    payload: {
      idTodolist,
      title
    }
  } as const
}

export const removeTaskAC = (idTodolist: string, idTask: string) => {
  return {
    type: REMOVE_TASK,
    payload: {
      idTodolist,
      idTask
    }
  } as const
}

export const chandeTaskTitleAC = (idTodolist: string, idTask: string, title: string) => {
  return {
    type: CHANGE_TASK_TITLE,
    payload: {
      idTodolist,
      idTask,
      title
    }
  } as const
}

export const changeTaskStatusAC = (idTodolist: string, idTask: string, isDone: boolean) => {
  return {
    type: CHANGE_TASK_STATUS,
    payload: {
      idTodolist,
      idTask,
      isDone
    }
  } as const
}
