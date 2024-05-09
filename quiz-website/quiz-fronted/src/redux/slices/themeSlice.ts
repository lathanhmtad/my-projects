import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface ThemeState {
    isDarkMode: boolean
}

const initialState: ThemeState = {
    isDarkMode: false,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode
        }
    },
})

export const { toggleTheme } = themeSlice.actions

export const selectTheme = (state: RootState) => state.theme.isDarkMode

export default themeSlice.reducer