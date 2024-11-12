import { v1 } from "uuid"
import { TasksStateType } from "../App"
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"



// *****************INITIAL STATE******************
const initialState: TasksStateType = {
  todolistId1: [
    { id: '1', title: 'CSS', isDone: false },
    { id: '2', title: 'JS', isDone: true },
    { id: '3', title: 'React', isDone: false },
  ],
  todolistId2: [
    { id: '1', title: 'bread', isDone: false },
    { id: '2', title: 'milk', isDone: true },
    { id: '3', title: 'tea', isDone: false },
  ],
}


// ******************** FUNCTION REDUCER ***********************
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
  switch(action.type) {
    case 'REMOVE_TASK' : {
      return {...state, [action.payload.idTodolist]: state[action.payload.idTodolist].filter(el => el.id !== action.payload.id)}
    }

    case 'ADD_TASK': {
      return {...state, [action.payload.todolistId]: [{id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.todolistId]]}
    }

    case 'CHANGE_TASK_STATUS': {
      return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {...el, isDone: action.payload.isDone} : el) ]}
    }

    case 'CHANGE_TASK_TITLE': {
      return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {...el, title: action.payload.title} : el) ]}
    }

    case 'REMOVE-TODOLIST': {
      const newTasks = {...state};
      delete newTasks[action.payload.id]
      return newTasks
    }

    case 'ADD-TODOLIST': {
      return {...state, [action.payload.id]: []}
    }

    default: throw new Error("I don't understand this type")
  }
}



// *********************** ACTION CREATOR ************************
export const removeTaskAC = (payload: {id: string, idTodolist: string}) => {
  return { type: 'REMOVE_TASK', payload } as const
}

export const addTaskAC = (payload: {title: string, todolistId: string}) => {
  return {type: 'ADD_TASK', payload} as const
}


export const changeTaskStatusAC = (payload: {taskId: string, todolistId: string, isDone: boolean}) => {
  return {type: 'CHANGE_TASK_STATUS', payload} as const
}


export const changeTaskTitleAC = (payload: {taskId: string, todolistId: string, title: string}) => {
  return {type: 'CHANGE_TASK_TITLE', payload} as const
}




// **************************** TYPES *********************************
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

export type ActionsType = RemoveTaskActionType | 
                          AddTaskActionType |
                          ChangeTaskStatusActionType |
                          ChangeTaskTitleActionType |
                          RemoveTodolistActionType |
                          AddTodolistActionType


