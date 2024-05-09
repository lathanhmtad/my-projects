import { createSlice } from '@reduxjs/toolkit'

import { fetchBrands, deleteBrand, createNewBrand } from './brandThunk'

const initialState = {
    loading: false,
    brands: [],
    totalElements: 0,
    totalPages: 1,
    currentPage: 1,
    openModal: false,
    message: '',
    isActionSuccess: undefined,
    showDrawerDetails: false,
    brandDetailsWithId: {}
}

export const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {
        setOpenModal: (state, action) => {
            state.openModal = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        resetIsActionSuccess: (state) => {
            state.isActionSuccess = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch brands
            .addCase(fetchBrands.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.brands = action.payload.data
                state.totalElements = action.payload.totalElements
                state.totalPages = action.payload.totalPages
                state.loading = false
            })
            .addCase(fetchBrands.rejected, (state) => {
                state.loading = false
            })

            // create new brand
            .addCase(createNewBrand.pending, (state) => {
                state.loading = true
            })
            .addCase(createNewBrand.fulfilled, (state, action) => {
                state.currentPage = 1
                state.message = action.payload.message
                state.isActionSuccess = true
                state.openModal = false
                state.loading = false
            })
            .addCase(createNewBrand.rejected, (state) => {
                state.loading = false
            })

            // delete brand
            .addCase(deleteBrand.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.message = action.payload.message
                state.isActionSuccess = true
                state.loading = false
            })
            .addCase(deleteBrand.rejected, (state, action) => {
                state.message = action.payload.message
                state.isActionSuccess = false
                state.loading = false
            })
    },
})

export const { setOpenModal, setCurrentPage, resetIsActionSuccess } = brandSlice.actions

export default brandSlice.reducer