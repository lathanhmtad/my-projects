import { useMutation, useQueryClient } from '@tanstack/react-query';
import FetchUtils from '../utils/FetchUtils';
import { App } from 'antd';

function useDeleteByIdApi<T = number>(resourceUrl: string, resourceKey: string) {
    const queryClient = useQueryClient()
    const {notification} = App.useApp()

    return useMutation({
        mutationFn: async (entityId : T) : Promise<void> => FetchUtils.deleteById(resourceUrl, entityId),
        onSuccess: () => {
            notification.success({
                message: 'Thông báo',
                description: 'Xóa thành công'
            })
            void queryClient.invalidateQueries({queryKey: [resourceKey, 'getAll']})
        },
        onError: () => notification.error({
            message: 'Thông báo',
            description: 'Xóa không thành công'
        })
    })
}

export default useDeleteByIdApi