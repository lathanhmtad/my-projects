import { createSlice } from '@reduxjs/toolkit'

import { fetchUserWithPagination, fetchUserById, createNewUser, updateUser, handleClickBtnEdit, handleClickBtnDelete } from './userThunk'

const initialState = {
    loading: false,

    users: [],
    totalElements: 0,
    totalPages: 1,
    currentPage: 1,

    openModal: false,

    isActionSuccess: undefined,

    showDrawerDetails: false,
    userDetailsWithId: {},

    message: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        closeDrawerDetails: (state) => {
            state.showDrawerDetails = false
            state.userDetailsWithId = {}
        },
        resetIsActionSuccess: (state) => {
            state.isActionSuccess = undefined
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setOpenModal: (state, action) => {
            if (action.payload) {
                state.userDetailsWithId = {}
            }
            state.openModal = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch users with id
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.userDetailsWithId = action.payload
                state.showDrawerDetails = true
                state.loading = false
            })
            .addCase(fetchUserById.rejected, (state) => {
                state.loading = false
            })

            // fetch users with pagination
            .addCase(fetchUserWithPagination.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUserWithPagination.fulfilled, (state, action) => {
                state.users = action.payload.data
                state.totalPages = action.payload.totalPages
                state.totalElements = action.payload.totalElements
                state.loading = false
            })
            .addCase(fetchUserWithPagination.rejected, (state) => {
                state.loading = false
            })

            // create new user
            .addCase(createNewUser.pending, (state) => {
                state.loading = true
            })
            .addCase(createNewUser.fulfilled, (state, action) => {
                state.isActionSuccess = true
                state.currentPage = 1
                state.openModal = true
                state.message = action.payload.message
                state.loading = false
            })
            .addCase(createNewUser.rejected, (state, action) => {
                state.message = action.payload.message
                state.isActionSuccess = false
                state.loading = false
            })

            // update user
            .addCase(updateUser.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.message = action.payload.message
                state.isActionSuccess = true
                state.openModal = false
                state.loading = false
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.message = action.payload.message
                state.isActionSuccess = false
                state.loading = false
            })

            // handle click btn edit
            .addCase(handleClickBtnEdit.pending, (state) => {
                state.loading = true
            })
            .addCase(handleClickBtnEdit.fulfilled, (state, action) => {
                state.openModal = true
                state.userDetailsWithId = action.payload
                state.loading = false
            })
            .addCase(handleClickBtnEdit.rejected, (state) => {
                state.loading = false
            })

            // handle click btn delete
            .addCase(handleClickBtnDelete.pending, (state) => {
                state.loading = true
            })
            .addCase(handleClickBtnDelete.fulfilled, (state, action) => {
                state.message = action.payload.message
                state.isActionSuccess = true
                state.loading = false
            })
            .addCase(handleClickBtnDelete.rejected, (state, action) => {
                state.message = action.payload.message
                state.isActionSuccess = false
                state.loading = false
            })
    },
})

export const { closeDrawerDetails, resetIsActionSuccess, setCurrentPage, setOpenModal } = userSlice.actions

export default userSlice.reducer