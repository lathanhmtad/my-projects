import { createAsyncThunk } from '@reduxjs/toolkit'
import userService from '../../../services/userService'
import { USERS_MAX_ITEMS_PER_PAGE } from '../../../utils/appConstant'

export const fetchUserById = createAsyncThunk(
    'users/fetchUserById',
    async (uId) => {
        const response = await userService.getUserById(uId)
        return response
    }
)

export const fetchUserWithPagination = createAsyncThunk(
    'users/fetchUserWithPagination',
    async ({ page, size }) => {
        const response = await userService.getUsersWithPagination(page, size)
        return response
    }
)

export const createNewUser = createAsyncThunk(
    'users/createNewUser',
    async (payload, thunkAPI) => {
        const response = await userService.createNewUser(payload)
        if (response && response.code === 200) {
            thunkAPI.dispatch(fetchUserWithPagination({ page: 1, size: USERS_MAX_ITEMS_PER_PAGE }))
        }
        else {
            return thunkAPI.rejectWithValue(response)
        }
        return response
    }
)

export const handleClickBtnEdit = createAsyncThunk(
    'users/handleClickBtnEdit',
    async (payload) => {
        const response = await userService.getUserById(payload)
        return response
    }
)

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({ userId, data }, thunkAPI) => {
        const response = await userService.updateUser(userId, data)
        if (response.code === 200) {
            thunkAPI.dispatch(fetchUserWithPagination({ page: thunkAPI.getState().user.currentPage, size: USERS_MAX_ITEMS_PER_PAGE }))
        }
        else {
            return thunkAPI.rejectWithValue(response)
        }
        return response
    }
)

export const handleClickBtnDelete = createAsyncThunk(
    'users/handleClickBtnDelete',
    async (payload, thunkAPI) => {
        const response = await userService.deleteUser(payload)
        if (response.code === 200) {
            thunkAPI.dispatch(fetchUserWithPagination({ page: thunkAPI.getState().user.currentPage, size: USERS_MAX_ITEMS_PER_PAGE }))
        }
        else {
            return thunkAPI.rejectWithValue(response)
        }
        return response
    }
)