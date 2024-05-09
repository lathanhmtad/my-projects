import { useQuery } from '@tanstack/react-query';
import FetchUtils from '../utils/FetchUtils';

function useGetByIdApi<O>(
  resourceUrl: string,
  resourceKey: string,
  entityId: number
) {
  return useQuery({
    queryKey: [resourceKey, 'getById', entityId],
    queryFn: (): Promise<O> => FetchUtils.getById(resourceUrl, entityId)
  })
}

export default useGetByIdApi