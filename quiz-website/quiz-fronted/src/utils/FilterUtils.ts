export enum NumberOperator {
  EQUALS = 'num_eq'
}

export type FilterOperator = NumberOperator

export enum OrderType {
  ASC = 'asc',
  DESC = 'desc'
}

export interface SortCriteria {
  property: string | null;
  order: OrderType | null;
}

export interface FilterCriteria {
  property: string | null
  type: null,
  operator: FilterOperator | null
  value: string | null
}

export interface Filter {
  filterCriteriaList: FilterCriteria[];
}

class FilterUtils {
  static convertToFilterRsql = (filter: Filter | null) => {
    if (filter) {
      return filter.filterCriteriaList
        .map(this.convertFilterCriteriaToRsql)
        .filter(Boolean)
        .join(';');
    }
    return '';
  };

  private static convertFilterCriteriaToRsql = (filterCriteria: FilterCriteria) => {
    if(filterCriteria.property && filterCriteria.operator) {
      if(filterCriteria.value) {
        switch (filterCriteria.operator) {
        case NumberOperator.EQUALS:
          return filterCriteria.property + '==' + filterCriteria.value
        }
      }
    }
    return ''
  };
}

export default FilterUtils