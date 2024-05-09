import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import useDeleteByIdApi from '../../hooks/use-delete-by-id-api';
import BaseResponse from '../../models/BaseResponse';
import { ManageTableProps } from './ManageTable';
import { setActivePage, setSelections } from '../../redux/slices/managePageSlice';
import EntityDetailsTable from '../EntityDetailsTable/EntityDetailsTable';
import { App } from 'antd';

function useManageTableViewModel<T extends BaseResponse>({
  listResponse,
  tableHeads,
  resourceUrl,
  resourceKey,
  entityDetails
}: ManageTableProps<T>) {

  const { modal, message } = App.useApp();

  const dispatch = useAppDispatch();

  const key : string = 'deletable';

  const
    {
      selections,
      activePage,
    }
      = useAppSelector(state => state.managePage);

  const deleteByIdApi = useDeleteByIdApi(resourceUrl, resourceKey);

  const onSelectChange = (newSelectedRowKeys: React.Key[]): void => {
    dispatch(setSelections(newSelectedRowKeys));
  };

  const handleViewEntityButton = (entityId: number, url? : string, key? : string) => {
    modal.info(
      {
        title: 'Thông tin',
        content: (
          <EntityDetailsTable entityDetails={entityDetails} resourceUrl={url ? url : resourceUrl} resourceKey={key ? key : resourceKey}
                              entityId={entityId}/>
        ),
        onOk: () => {},
        maskClosable: true,
        width: '50%'
      }
    );
  };

  const handleDeleteEntityButton = (entityId: number) => {
    modal.confirm(
      {
        title: 'Xác nhận xóa',
        content: 'Bạn chắc chắn muốn xóa đối tượng có id là ' + entityId,
        onOk: () => {
          void message.open({
            key,
            type: 'loading',
            content: 'Đang xóa đối tượng có id là ' + entityId + '...',
            duration: 0
          });
          deleteByIdApi.mutate(entityId, {
            onSuccess: () => {
              message.destroy(key)
              if (listResponse.content.length === 1) {
                dispatch(setActivePage(activePage - 1 || 1));
              }
            },
            onError: () => {
              message.destroy(key)
            }
          });
        },
        maskClosable: true,
      }
    );
  };

  return {
    listResponse,
    tableHeads,
    onSelectChange,
    handleViewEntityButton,
    activePage,
    selections,
    handleDeleteEntityButton
  };
}

export default useManageTableViewModel;