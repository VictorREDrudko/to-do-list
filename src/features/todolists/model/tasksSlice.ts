import { ResultCode } from "common/enums";
import { handleServerAppError } from "common/utils/handleServerAppError";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { Dispatch } from "redux";
import { RootState } from "../../../app/store";
import { tasksApi } from "../api/tasksApi";
import {
  DomainTask,
  UpdateTaskDomainModel,
  UpdateTaskModel,
} from "../api/tasksApi.types";
import { setAppStatus } from "app/appSlice";
import { createSlice } from "@reduxjs/toolkit";
import { addTodolist, removeTodolist } from "./todolistsSlice";

export type TasksStateType = {
  [key: string]: DomainTask[];
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: (create) => ({
    setTasks: create.reducer<{ todolistId: string, tasks: DomainTask[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    }),

    removeTask: create.reducer<{taskId: string, todolistId: string}>((state, action) => {
      const tasksForCurrentTodolist = state[action.payload.todolistId]

      const index = tasksForCurrentTodolist.findIndex((task) => task.id === action.payload.taskId);
      if(index !== -1) {
        tasksForCurrentTodolist.splice(index, 1)
      }
    }),

    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const newTask = action.payload.task;
      state[action.payload.task.todoListId].unshift(newTask)
    }),

    updateTask: create.reducer<{ taskId: string, todolistId: string, domainModel: UpdateTaskDomainModel }>((state, action) => {
      const tasksForCurrentTodolist = state[action.payload.todolistId]

      const index = tasksForCurrentTodolist.findIndex(task => task.id === action.payload.taskId);
      if(index !== -1) {
        tasksForCurrentTodolist[index] = {...tasksForCurrentTodolist[index], ...action.payload.domainModel}
      }
    }),

    clearTasks: create.reducer(() => {
      return {}
    })
  }),
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const tasksReducer = taskSlice.reducer
export const {setTasks, addTask, clearTasks, removeTask, updateTask} = taskSlice.actions


// Thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }));
  tasksApi
    .getTasks(todolistId)
    .then((res) => {
      dispatch(setAppStatus({ status: "succeeded" }));
      dispatch(setTasks({ todolistId, tasks: res.data.items }));
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const removeTaskTC =
  (arg: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }));
    tasksApi
      .deleteTask(arg)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatus({ status: "succeeded" }));
          dispatch(removeTask(arg));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const addTaskTC =
  (arg: { title: string; todolistId: string }) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }));
    tasksApi
      .createTask(arg)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatus({ status: "succeeded" }));
          dispatch(addTask({ task: res.data.data.item }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const updateTaskTC =
  (arg: {
    taskId: string;
    todolistId: string;
    domainModel: UpdateTaskDomainModel;
  }) =>
  (dispatch: Dispatch, getState: () => RootState) => {
    const { taskId, todolistId, domainModel } = arg;

    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId];
    const task = tasksForCurrentTodolist.find((t) => t.id === taskId);

    if (task) {
      const model: UpdateTaskModel = {
        status: task.status,
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        ...domainModel,
      };

      dispatch(setAppStatus({ status: "loading" }));
      tasksApi
        .updateTask({ taskId, todolistId, model })
        .then((res) => {
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatus({ status: "succeeded" }));
            dispatch(updateTask(arg));
          } else {
            handleServerAppError(res.data, dispatch);
          }
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch);
        });
    }
  };
