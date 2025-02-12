import { UnknownAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { authReducer, authSlice } from "../features/auth/model/authSlice";
import { taskSlice, tasksReducer } from "../features/todolists/model/tasksSlice";
import { todolistsReducer, todolistsSlice } from "../features/todolists/model/todolistsSlice";
import { appReducer, appSlice } from "./appSlice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    [taskSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
