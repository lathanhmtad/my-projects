import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getRoles } from '../../services/roleService'

export const fetchRoles = createAsyncThunk(
    'role/fetchRoles',
    async () => {
        const res = await getRoles()
        return res
    }
)

const initialState = {
    loading: false,
    roles: []
}

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.roles = action.payload
                state.loading = false
            })
            .addCase(fetchRoles.rejected, (state) => {
                state.loading = false
            })
    }
})

export const { } = roleSlice.actions

export default roleSlice.reducer