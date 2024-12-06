import { BaseResponse } from "common/types";
import {
  DomainTask,
  GetTasksResponse,
  UpdateTaskModel,
} from "./tasksApi.types";
import { Todolist } from "./todolistsApi.types";
import { instance } from "common/instance/instance";

export const taskApi = {
  getTask: (tl: Todolist) => {
    return instance.get<GetTasksResponse>(`todo-lists/${tl.id}/tasks`);
  },

  createTask: (arg: { title: string; todolistId: string }) => {
    const { title, todolistId } = arg;
    return instance.post<BaseResponse<{ item: DomainTask }>>(
      `todo-lists/${todolistId}/tasks`,
      { title }
    );
  },

  removeTask: (arg: { taskId: string; todolistId: string }) => {
    const { taskId, todolistId } = arg;
    return instance.delete<BaseResponse>(
      `/todo-lists/${todolistId}/tasks/${taskId}`
    );
  },

  updateTask: (task: DomainTask, model: UpdateTaskModel) => {
    return instance.put<BaseResponse<{ item: DomainTask }>>(
      `/todo-lists/${task.todoListId}/tasks/${task.id}`,
      model
    );
  },
};
