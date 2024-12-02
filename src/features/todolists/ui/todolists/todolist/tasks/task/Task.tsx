import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import { ChangeEvent } from "react";
import { TaskType, TodolistType } from '../../../../../../../app/App';
import { useAppDispatch } from '../../../../../../../app/hooks';
import { EditableSpan } from '../../../../../../../common/components/editableSpan/EditableSpan';
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../../../../../model/tasks-reducer';
import { getListItemSx } from './task.styles';

type Props = {
  todolist: TodolistType,
  task: TaskType
}

export const Task = ({todolist, task} : Props) => {
  const dispatch = useAppDispatch();

  const removeTask = () => {
		dispatch(removeTaskAC({taskId: task.id, todolistId: todolist.id}))
	}

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
		dispatch(changeTaskStatusAC({taskId: task.id, todolistId: todolist.id, isDone: newStatusValue}))
	}

	const updateTask = ( title: string) => {
		dispatch(changeTaskTitleAC({taskId: task.id, title, todolistId: todolist.id}))
	}

  return (
    <ListItem sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
        <EditableSpan value={task.title} onChange={updateTask}/>
      </div>
      <IconButton onClick={removeTask}>
        <DeleteIcon/>
      </IconButton>
    </ListItem>
  )
}