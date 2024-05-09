import { createSlice } from '@reduxjs/toolkit'

import { fetchCategoriesTree, createNewCategory, fetchCategories, handleClickBtnEdit, deleteCategory, fetchCategoryById } from './categoryThunk'

const initialState = {
    loading: false,
    treeSelect: [],
    categories: [],
    totalElements: 0,
    totalPages: 1,
    currentPage: 1,
    openModal: false,
    message: '',
    isActionSuccess: undefined,
    showDrawerDetails: false,
    categoryDetailsWithId: {}
}

export const categorySlice = createSlice({
    name: 'category',
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
        },
        closeDrawerDetails: (state) => {
            state.categoryDetailsWithId = {}
            state.showDrawerDetails = false
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch categories tree
            .addCase(fetchCategoriesTree.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchCategoriesTree.fulfilled, (state, action) => {
                state.treeSelect = action.payload
                state.loading = false
            })
            .addCase(fetchCategoriesTree.rejected, (state) => {
                state.loading = false
            })

            // fetch categories
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload.data
                state.totalElements = action.payload.totalElements
                state.totalPages = action.payload.totalPages
                state.loading = false
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.loading = false
            })

            // fetch category by id
            .addCase(fetchCategoryById.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchCategoryById.fulfilled, (state, action) => {
                state.categoryDetailsWithId = action.payload
                state.showDrawerDetails = true
                state.loading = false
            })
            .addCase(fetchCategoryById.rejected, (state) => {
                state.loading = false
            })

            // handle click btn edit
            .addCase(handleClickBtnEdit.pending, (state) => {
                state.loading = true
            })
            .addCase(handleClickBtnEdit.fulfilled, (state, action) => {
                state.openModal = true
                state.categoryDetailsWithId = action.payload
                state.loading = false
            })
            .addCase(handleClickBtnEdit.rejected, (state) => {
                state.loading = false
            })

            // create new category
            .addCase(createNewCategory.pending, (state) => {
                state.loading = true
            })
            .addCase(createNewCategory.fulfilled, (state, action) => {
                state.currentPage = 1
                state.message = action.payload.message
                state.isActionSuccess = true
                state.openModal = false
                state.loading = false
            })
            .addCase(createNewCategory.rejected, (state) => {
                state.loading = false
            })

            // delete category
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.message = action.payload.message
                state.isActionSuccess = true
                state.loading = false
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.message = action.payload.message
                state.isActionSuccess = false
                state.loading = false
            })
    },
})

export const { setOpenModal, setCurrentPage, resetIsActionSuccess, closeDrawerDetails } = categorySlice.actions

export default categorySlice.reducer