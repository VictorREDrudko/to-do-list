import { TodolistType } from "../../../../../app/App";
import { useAppDispatch } from "../../../../../app/hooks";
import { AddItemForm } from "../../../../../common/components/additemForm/AddItemForm";
import { addTaskAC } from "../../../model/tasks-reducer";
import { FilterTasksButtons } from "./filterTasksButton/FilterTasksButtons";
import { Tasks } from "./tasks/Tasks";
import { TodolistTitle } from "./todolistTitle/TodolistTitle";


type PropsType = {
  todolist: TodolistType,
}

export const Todolist = ({todolist} : PropsType) => {
  const dispatch = useAppDispatch();

  const addTask = (title: string) => {
		dispatch(addTaskAC({title, todolistId: todolist.id}))
	}

	return (
		<div>
      <TodolistTitle todolist={todolist}/>
			<AddItemForm addItem={addTask}/>
      <Tasks todolist={todolist}/>
      <FilterTasksButtons todolist={todolist}/>
		</div>
	)
}
