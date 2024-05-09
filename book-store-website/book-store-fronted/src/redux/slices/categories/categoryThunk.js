import { createAsyncThunk } from '@reduxjs/toolkit'
import categoryService from '../../../services/categoryService'
import { CATEGORIES_MAX_ITEMS_PER_PAGE } from '../../../utils/appConstant'

export const fetchCategoriesTree = createAsyncThunk(
    'category/fetchCategoriesTree',
    async () => {
        const response = await categoryService.getCategoriesTree()
        return response
    }
)

export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async ({ page, size }) => {
        const response = await categoryService.getAllCategories(page, size)
        return response
    }
)

export const fetchCategoryById = createAsyncThunk(
    'category/fetchCategoryById',
    async (payload) => {
        const response = await categoryService.getCategoryById(payload)
        return response
    }
)

export const handleClickBtnEdit = createAsyncThunk(
    'category/handleClickBtnEdit',
    async (payload) => {
        const response = await categoryService.getCategoryById(payload)
        return response
    }
)

export const createNewCategory = createAsyncThunk(
    'category/createNewCategory',
    async (data, thunkAPI) => {
        const response = await categoryService.createCategory(data)
        if (response && response.code === 200) {
            thunkAPI.dispatch(fetchCategories({ page: 1, size: CATEGORIES_MAX_ITEMS_PER_PAGE }))
        }
        else {
            return thunkAPI.rejectWithValue(response)
        }
        return response
    }
)

export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async ({ categoryId, data }, thunkAPI) => {
        const response = await categoryService.updateCategory(categoryId, data)
        if (response.code === 200) {
            thunkAPI.dispatch(fetchCategories({ page: thunkAPI.getState().category.currentPage, size: CATEGORIES_MAX_ITEMS_PER_PAGE }))
        }
        else {
            return thunkAPI.rejectWithValue(response)
        }
        return response
    }
)

export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (payload, thunkAPI) => {
        const response = await categoryService.deleteCategory(payload)
        if (response.code === 200) {
            thunkAPI.dispatch(fetchCategories({ page: thunkAPI.getState().category.currentPage, size: CATEGORIES_MAX_ITEMS_PER_PAGE }))
        }
        else {
            return thunkAPI.rejectWithValue(response)
        }
        return response
    }
)