import { Pagination } from 'antd';
import { ListResponse } from '../../utils/FetchUtils';
import useManagePaginationViewModel from './ManagePagination.vm';

interface ManagePaginationProps {
    listResponse: ListResponse
}

function ManagePagination({
    listResponse,
}: ManagePaginationProps) {

    const {
        activePage,
        handlePaginationButton
    } = useManagePaginationViewModel()

    return (
        <Pagination
            current={activePage}
            onChange={handlePaginationButton}
            total={listResponse.totalElements}
            pageSize={5}
            showTotal={(total) => `Total ${total} items`}
        />
    )
}

export default ManagePagination