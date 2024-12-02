import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FilterValuesType, TodolistType } from "../../../../../../app/App";
import { useAppDispatch } from "../../../../../../app/hooks";
import { changeTodolistFilterAC } from "../../../../model/todolists-reducer";
import { filterButtonsContainerSx } from "./filterTasksButton.styles";

type Props = {
  todolist: TodolistType
}

export const FilterTasksButtons = ({todolist} : Props) => {
  const dispatch = useAppDispatch();

  const changeFilter = (filter: FilterValuesType) => {
		dispatch(changeTodolistFilterAC({id: todolist.id, filter}))
	}

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={todolist.filter === 'all' ? 'outlined' : 'text'}
        color={'inherit'}
        onClick={() => changeFilter('all')}>
        All
      </Button>
      <Button
        variant={todolist.filter === 'active' ? 'outlined' : 'text'}
        color={'primary'}
        onClick={() => changeFilter('active')}>
        Active
      </Button>
      <Button
        variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
        color={'secondary'}
        onClick={() => changeFilter('completed')}>
        Completed
      </Button>
  </Box>
  )
}