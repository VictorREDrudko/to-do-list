import { Todolist } from "./todolistsApi.types"
import { instance } from "../../../common/instance/instance"
import { BaseResponse } from "common/types"

export const todolistsApi = {
  getTodolists: () => {
    return instance.get<Todolist[]>('/todo-lists')
  },

  createTodolists: (title: string) => {
    return instance.post<BaseResponse<{item: Todolist}>>('todo-lists', {title})
  },

  removeTodolists: (id: string) => {
    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  },

  updateTodolists: (arg: {id: string, title: string}) => {
    // add destructure
    const {id, title} = arg
    return instance.put<BaseResponse>(`todo-lists/${id}`, {title})
  }
}