import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import FetchUtils from '../utils/FetchUtils';
import { App } from 'antd';

function useDeleteByIdsApi<T = React.Key>(resourceUrl: string, resourceKey: string) {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();

  return useMutation({
    mutationFn: async (entityIds: T[]): Promise<void> => FetchUtils.deleteByIds(resourceUrl, entityIds),
    onSuccess: () => {
      notification.success({
        message: 'Thông báo',
        description: 'Xóa thành công'
      });
      void queryClient.invalidateQueries({ queryKey: [resourceKey, 'getAll'] });
    },
    onError: () => notification.error({
      message: 'Thông báo',
      description: 'Xóa không thành công'
    })
  });
}

export default useDeleteByIdsApi;