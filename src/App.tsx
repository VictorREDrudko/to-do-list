import './App.css';
import {Todolist} from "./components/todolist/Todolist";
import React, {useReducer, useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import {MenuButton} from "./components/MenuButton";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from "@mui/material/CssBaseline";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './model/todolists-reducer';

// **********TYPES**********
export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: TaskType[]
}

type ThemeMode = 'dark' | 'light'



// **********APP COMPONENT**********
function App() {
  console.log("APP")
  // id 
	let todolistID1 = v1()
	let todolistID2 = v1()

  let todolistID3 = v1()

  // GLOBAL STATE
	let [todolists, dispatch] = useReducer(todolistsReducer, [
		{id: todolistID1, title: 'What to learn', filter: 'all'},
		{id: todolistID2, title: 'What to buy', filter: 'all'},
	])

	let [tasks, setTasks] = useState<TasksStateType>({
		[todolistID1]: [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'ReactJS', isDone: false},
		],
		[todolistID2]: [
			{id: v1(), title: 'Rest API', isDone: true},
			{id: v1(), title: 'GraphQL', isDone: false},
		],
	})

	const [themeMode, setThemeMode] = useState<ThemeMode>('light')


  // functions todolist
	const addTodolist = (title: string) => {
    dispatch(addTodolistAC(todolistID3))
    // временно
    setTasks({...tasks, [todolistID3]: []})
	}

	const removeTodolist = (todolistId: string) => {
    dispatch(removeTodolistAC(todolistId))
	}

  const updateTitleTodolist = (todolistId: string, title: string) => {
    dispatch(changeTodolistTitleAC(todolistId, title))
	}

  const changeFilter = (filter: FilterValuesType, todolistId: string) => {
    dispatch(changeTodolistFilterAC(todolistId, filter))
	}


  // functions tasks
	const addTask = (title: string, todolistId: string) => {
		const newTask = {id: v1(), title: title, isDone: false}
		setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
	}

	const removeTask = (taskId: string, todolistId: string) => {
		const newTodolistTasks: TasksStateType = {...tasks, 
      [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
		setTasks(newTodolistTasks)
	}

	const updateTitleTask = (todolistId: string, taskId: string, title: string) => {
		const newTodolistTasks = {
			...tasks,
			[todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
		}
		setTasks(newTodolistTasks)
	}

	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
		const newTodolistTasks = {
			...tasks,
			[todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
		}
		setTasks(newTodolistTasks)
	}


  // Theme
	const theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				main: '#04cd11',
			},
		},
	});

	const changeModeHandler = () => {
		setThemeMode(themeMode == "light" ? "dark" : 'light')
	}

  const menuButtonSize = {height: '30px', minWidth: '70px', p: '5px 10px'}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<AppBar position="sticky" sx={{mb: '30px'} }>
				<Toolbar sx={{display: 'flex', justifyContent: 'space-between'} }>
					<IconButton color="inherit">
						<MenuIcon/>
					</IconButton>
					<div>
						<MenuButton sx={menuButtonSize}>Login</MenuButton>
						<MenuButton sx={menuButtonSize}>Logout</MenuButton>
						<MenuButton background={theme.palette.primary.dark} sx={menuButtonSize}>Faq</MenuButton>
						<Switch color={'default'} onChange={changeModeHandler}/>
					</div>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container sx={{mb: '30px'}}>
					<AddItemForm addItem={addTodolist}/>
				</Grid>

				<Grid container spacing={4}>
					{todolists.map((tl) => {
						const allTodolistTasks = tasks[tl.id]
						let tasksForTodolist = allTodolistTasks

						if (tl.filter === 'active') {
							tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
						}

						if (tl.filter === 'completed') {
							tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
						}

						return (
							<Grid>
								<Paper sx={{p: '0 20px 20px 20px'}}>
									<Todolist
										key={tl.id}
										todolistId={tl.id}
										title={tl.title}
										tasks={tasksForTodolist}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										changeTaskStatus={changeTaskStatus}
										filter={tl.filter}
										removeTodolist={removeTodolist}
										updateTitleTask={updateTitleTask}
										updateTitleTodolist={updateTitleTodolist}
									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</ThemeProvider>
	);
}

export default App;
