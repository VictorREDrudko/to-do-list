import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from '@mui/material/styles';
import { Header } from "../common/components/header/Header";
import { getThemeMode } from '../common/theme';
import { selectTheme } from "./appSelectors";
import { useAppSelector } from "./hooks";
import { Main } from "./Main";

// ALT+SCHIFT+O - удаление неиспользованных import

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


function App() {
  const themeMode = useAppSelector(selectTheme)
  const theme = getThemeMode(themeMode)

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
      <Header/>
      <Main/>
		</ThemeProvider>
	);
}

export default App;
