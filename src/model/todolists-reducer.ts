import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";

// Types
type AddTodolistACType=ReturnType<typeof addTodolistAC>
type RemoveTodolistACType= ReturnType<typeof removeTodolistAC>
type ChangeTodolistTitleACType=ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterACType=ReturnType<typeof changeTodolistFilterAC>

type ActionsType = AddTodolistACType
    | RemoveTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType


// CONST AND VAR
const ADD_TODOLIST = 'ADD-TODOLIST'
const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'

let todolistID1 = v1()
let todolistID2 = v1()

// Initial state
const initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]


// REDUCER
export const todolistsReducer = (state = initialState, action: ActionsType): TodolistType[] => {
  console.log("REDUCER")
  switch (action.type) {
    case ADD_TODOLIST: {
      const newTodolist: TodolistType = {
        id: action.payload.todolistId, 
        title: action.payload.title, 
        filter: 'all'
      }
      return [newTodolist, ...state]
    }

    case REMOVE_TODOLIST: {
        return state.filter(tl => tl.id !== action.payload.id)
    }

    case CHANGE_TODOLIST_TITLE:{
      const todolistId=action.payload.id
      return state.map(el=>el.id===todolistId ? {...el, title: action.payload.title} :el)
    }

    case CHANGE_TODOLIST_FILTER:{
      const todolistId=action.payload.id
      return state.map(el=>el.id===todolistId ? {...el,filter: action.payload.filter} :el)
    }

    default:
      return state
  }
}


// Action creator
export const addTodolistAC=(todolistId: string)=>{
  return {
    type: ADD_TODOLIST,
    payload: {
      title: 'New Todolist',
      todolistId: todolistId,
    },
  }as const
}

export const removeTodolistAC=(id:string)=>{
  return{
    type: REMOVE_TODOLIST,
    payload: {id},
  } as const
}


export const changeTodolistTitleAC=(id:string, title: string)=>{
  return {
    type: CHANGE_TODOLIST_TITLE,
    payload: {
      id,
      title
    },
  } as const
}

export const changeTodolistFilterAC=(id:string, filter: FilterValuesType)=>{
  return {
    type: CHANGE_TODOLIST_FILTER,
    payload: {
      id,
      filter
    },
  } as const
}