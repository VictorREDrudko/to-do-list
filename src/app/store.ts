import { combineReducers, legacy_createStore } from 'redux'
import { tasksReducer } from '../model/tasks-reducer'
import { todolistsReducer } from '../model/todolists-reducer'
 
// Объект-состояние создается объединяя reducer-ы (combineReducers)
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
})


// Создаём store
export const store = legacy_createStore(rootReducer)


// автоматическая типизация всего объекта-состояния
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch




// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store