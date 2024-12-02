export type ThemeMode = 'dark' | 'light'
type InitialStateType = typeof initialState

const initialState = {
  themeMode: 'light' as ThemeMode
}



export const appReducer = (state: InitialStateType = initialState, action: ActionType) => {
  switch(action.type) {
    case 'CHANGE_THEME': {
      return {...state, themeMode: action.payload.theme}
    }

    default: 
      return state
  }
}

export const changeThemeAC = (theme: ThemeMode) => {
  return (
    {
      type: 'CHANGE_THEME',
      payload: {theme}
    }
  ) as const
}

type ChangeThemeType = ReturnType<typeof changeThemeAC>


export type ActionType = ChangeThemeType