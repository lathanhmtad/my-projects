import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { setActivePage } from "../../redux/slices/managePageSlice"

function useManagePaginationViewModel() {
    const dispatch = useAppDispatch()

    const {
        activePage,
        activePageSize
    } = useAppSelector(state => state.managePage)

    const handlePaginationButton = (page: number) => {
        if (page !== activePage) {
            dispatch(setActivePage(page));
        }
    }

    return {
        activePage,
        activePageSize,
        handlePaginationButton
    }
}

export default useManagePaginationViewModel