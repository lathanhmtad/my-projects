import { useQuery } from '@tanstack/react-query';
import FetchUtils, { ListResponse, RequestParams } from '../utils/FetchUtils';
import { useAppSelector } from '../redux/hooks';
import { useEffect } from 'react';
import FilterUtils from '../utils/FilterUtils';

function useGetAllApi<O>(
  resourceUrl: string,
  resourceKey: string,
  requestParams?: RequestParams,
  successCallback?: (data: ListResponse<O>) => void
) {

  const {
    activePage,
    activePageSize,
    activeFilter
  } = useAppSelector(state => state.managePage);

  if (!requestParams) {
    requestParams = {
      page: activePage,
      size: activePageSize,
      filter: FilterUtils.convertToFilterRsql(activeFilter)
    };
  }

  const queryKey = [resourceKey, 'getAll', requestParams];

  const query = useQuery({
    queryKey: queryKey,
    queryFn: (): Promise<ListResponse<O>> => FetchUtils.getAll(resourceUrl, requestParams),
  });

  useEffect(() => {
    if (query.isSuccess && successCallback) {
      successCallback(query.data);
    }
  }, [query.isSuccess]);

  return query;
}

export default useGetAllApi;
