import React from 'react';
import { ManageHeaderButtonsProps } from './ManageHeaderButtons';
import { App } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setActivePage } from '../../redux/slices/managePageSlice';
import useDeleteByIdsApi from '../../hooks/use-delete-by-ids-api';

function useManageHeaderButtonsViewModel({
  listResponse,
  resourceUrl,
  resourceKey
}: ManageHeaderButtonsProps) {
  const { modal, message } = App.useApp();

  const dispatch = useAppDispatch();

  const key = 'batchDeletable';

  const deleteByIdsApi = useDeleteByIdsApi(resourceUrl, resourceKey);

  const {
    selections, activePage
  } = useAppSelector(state => state.managePage);

  const handleDeleteBatchEntitiesButton = () => {
    const totalSelected: number = Object.values(selections).reduce((acc: number, curr) => acc + curr.length, 0);
    const allRowKeysSelected = Object.values(selections).reduce((acc: React.Key[], curr) => acc.concat(curr), []);

    if (allRowKeysSelected.length >= 1) {
      modal.confirm(
        {
          title: 'Xác nhận xóa',
          content: `Bạn có chắc chắn muốn xóa tổng cộng ${totalSelected} mục đã chọn ?`,
          onOk: () => {
            void message.open({
              key,
              type: 'loading',
              content: `Đang xóa ${totalSelected} đối tượng đã chon. Vui lòng chờ!`,
              duration: 0
            });
            deleteByIdsApi.mutate(allRowKeysSelected, {
              onSuccess: () => {
                message.destroy(key);
                if (listResponse.content.length === 1) {
                  dispatch(setActivePage(activePage - 1 || 1));
                }
              },
              onError: () => {
                message.destroy(key);
              }
            });
          },
          maskClosable: true,
        }
      );
    }
    else {
      message.info({
        type: 'info',
        content: 'Vui lòng chọn ít nhất một phần tử!'
      })
    }

  };

  return {
    handleDeleteBatchEntitiesButton
  };
}

export default useManageHeaderButtonsViewModel;