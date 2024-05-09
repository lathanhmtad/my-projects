import { createAsyncThunk } from '@reduxjs/toolkit'
import brandService from '../../../services/brandService'
import { BRANDS_MAX_ITEMS_PER_PAGE } from '../../../utils/appConstant'

export const fetchBrands = createAsyncThunk(
    'brand/fetchBrands',
    async ({ page, size }) => {
        const response = await brandService.getBrands(page, size)
        return response
    }
)

export const createNewBrand = createAsyncThunk(
    'brand/createNewBrand',
    async (data, thunkAPI) => {
        const response = await brandService.createBrand(data)
        if (response && response.code === 200) {
            thunkAPI.dispatch(fetchBrands({ page: 1, size: BRANDS_MAX_ITEMS_PER_PAGE }))
        }
        else {
            return thunkAPI.rejectWithValue(response)
        }
        return response
    }
)

export const deleteBrand = createAsyncThunk(
    'brand/deleteBrand',
    async (payload, thunkAPI) => {
        const response = await brandService.deleteBrand(payload)
        if (response.code === 200) {
            thunkAPI.dispatch(fetchBrands({ page: thunkAPI.getState().brand.currentPage, size: BRANDS_MAX_ITEMS_PER_PAGE }))
        }
        else {
            return thunkAPI.rejectWithValue(response)
        }
        return response
    }
)