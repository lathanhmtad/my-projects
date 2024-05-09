import { ListResponse } from "../utils/FetchUtils"

class PageConfigs {
    static initListResponse: ListResponse = {
        content: [],
        pageNumber: 1,
        pageSize: 5,
        totalElements: 0,
        totalPages: 0,
        last: false
    }
    static rowKey = 'id'
}

export default PageConfigs