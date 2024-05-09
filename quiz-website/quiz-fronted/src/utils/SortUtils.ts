export enum OrderType {
    ASC = 'asc',
    DESC = 'desc'
}

export interface SortCriteria {
    property: string | null
    order: OrderType | null
}

export interface Sort {
    sortCriteria : SortCriteria
}

class SortUtils {
    static convertToSortRSQL = (sort : Sort | null) => {
        if(sort && sort.sortCriteria.property !== null && sort.sortCriteria.order != null) {
            return sort.sortCriteria.property + ',' + sort.sortCriteria.order
        }
        return ''
    }
}