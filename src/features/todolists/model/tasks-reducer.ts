import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from "./todolists-reducer";
import { AppDispatch, AppThunk } from "app/store";
import { tasksApi } from "../api/tasksApi";
import { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from "../api/tasksApi.types";

export type TasksStateType = {
  [key: string]: DomainTask[];
};

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "SET_TASKS": {
      const stateCopy = { ...state };
      stateCopy[action.payload.todolistId] = action.payload.tasks;
      return stateCopy;
    }

    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          (t) => t.id !== action.payload.taskId
        ),
      };
    }

    case "ADD-TASK": {
      const newTask: DomainTask = action.payload.task;
      return {
        ...state,
        [newTask.todoListId]: [newTask, ...state[newTask.todoListId]],
      };
    }

    case "UPDATE_TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(
          (t) =>
            t.id === action.payload.taskId
              ? {
                  ...t,
                  ...action.payload.domainModel,
                }
              : t
        ),
      };
    }

    case "ADD-TODOLIST":
      return { ...state, [action.payload.todolistId]: [] };

    case "REMOVE-TODOLIST": {
      let copyState = { ...state };
      delete copyState[action.payload.id];
      return copyState;
    }

    default:
      return state;
  }
};

// Action creators
export const removeTaskAC = (payload: {
  taskId: string;
  todolistId: string;
}) => {
  return {
    type: "REMOVE-TASK",
    payload,
  } as const;
};

export const addTaskAC = (payload: { task: DomainTask }) => {
  return {
    type: "ADD-TASK",
    payload,
  } as const;
};

export const updateTaskAC = (payload: {
  taskId: string;
  domainModel: UpdateTaskDomainModel;
  todolistId: string;
}) => {
  return {
    type: "UPDATE_TASK",
    payload,
  } as const;
};

export const setTasksAC = (payload: {
  tasks: DomainTask[];
  todolistId: string;
}) => {
  return {
    type: "SET_TASKS",
    payload,
  } as const;
};

// Thunk
export const fetchTasksTC = (id: string) => (dispatch: AppDispatch) => {
  tasksApi.getTasks(id).then((res) => {
    dispatch(setTasksAC({ tasks: res.data.items, todolistId: id }));
  });
};

export const deleteTasksTC =
  (arg: { todolistId: string; taskId: string }) => (dispatch: AppDispatch) => {
    tasksApi.deleteTask(arg).then((res) => {
      dispatch(removeTaskAC(arg));
    });
  };

export const addTasksTC =
  (arg: { todolistId: string; title: string }) => (dispatch: AppDispatch) => {
    tasksApi.createTask(arg).then((res) => {
      dispatch(addTaskAC({ task: res.data.data.item }));
    });
  };


export const updateTaskTC =
  (arg: { taskId: string, todolistId: string, domainModel: UpdateTaskDomainModel,}): AppThunk =>
  (dispatch, getState) => {
    const { taskId, domainModel, todolistId } = arg;

    const currentTask = getState().tasks[todolistId].find(el => el.id === taskId);

    if (currentTask) {
      const model: UpdateTaskModel = {
        deadline: currentTask.deadline,
        priority: currentTask.priority,
        description: currentTask.description,
        startDate: currentTask.startDate,
        status: currentTask.status,
        title: currentTask.title,
        ...domainModel,
      };

      tasksApi.updateTask({ taskId, todolistId, model }).then(res => {
        dispatch(updateTaskAC(arg));
      });
    }
  };


// Actions types
export type SetTasksActionType = ReturnType<typeof setTasksAC>;
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>;

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTasksActionType;
