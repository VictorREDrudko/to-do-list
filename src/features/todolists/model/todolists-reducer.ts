import { Todolist } from "../api/todolistsApi.types"
import { todolistsApi } from "../api/todolistsApi"
import { AppDispatch } from "app/store"

export type FilterValuesType = "all" | "active" | "completed"

// Для исключения ошибок по типизации (с сервера приходят одни свойства Todolist, а в TodolistType лежат другие)
// создаем общий тип
export type DomenTodolist = Todolist & {filter: FilterValuesType} 

const initialState: DomenTodolist[] = []

export const todolistsReducer = (state: DomenTodolist[] = initialState, action: ActionsType): DomenTodolist[] => {
  switch (action.type) {
    case 'SET-TODOLISTS': {
      // Теперь при пробежке по todolists мы должны везде добавить свойство filter со значением по умолчанию all
      return action.todolists.map(tl => ({ ...tl, filter: 'all' }))
    }

    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id)
    }

    case "ADD-TODOLIST": {
      const newTodolist: DomenTodolist = {
        id: action.payload.todolistId,
        title: action.payload.title,
        filter: "all",
        // добавим временный кастыль
        addedDate: '',
        order: 0,
      }
      return [...state, newTodolist]
    }

    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl))
    }

    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl))
    }

    default:
      return state
  }
}

// Action creators
export const setTodolistsAC = (todolists: Todolist[]) => {
  return { type: 'SET-TODOLISTS', todolists } as const
}

export const removeTodolistAC = (id: string) => {
  return { type: "REMOVE-TODOLIST", payload: { id } } as const
}

export const addTodolistAC = (payload : {title: string, todolistId: string}) => {
  return { type: "ADD-TODOLIST", payload } as const
}

export const changeTodolistTitleAC = (payload: { id: string; title: string }) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}

export const changeTodolistFilterAC = (payload: { id: string; filter: FilterValuesType }) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}

// Thunk
export const fetchTodolistsTC = () => (dispatch: AppDispatch) => {
  todolistsApi.getTodolists().then((res) => {
    dispatch(setTodolistsAC(res.data))
  })
}

export const addTodolistTC = (title: string) => (dispatch: AppDispatch) => {
  todolistsApi.createTodolist(title).then((res) => {
    dispatch(addTodolistAC({title, todolistId: res.data.data.item.id}))
  })
}

export const removeTodolistTC = (id: string) => (dispatch: AppDispatch) => {
  todolistsApi.deleteTodolist(id).then((res) => {
    dispatch(removeTodolistAC(id))
  })
}

export const updateTodolistTitleTC =
  (arg: { id: string; title: string }) => (dispatch: AppDispatch) => {
    todolistsApi.updateTodolist(arg).then((res) => {
      dispatch(changeTodolistTitleAC(arg))
    })
  }
 

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
