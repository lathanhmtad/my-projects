import React from 'react'
import useGetByIdApi from '../../hooks/use-get-by-id-api';
import { Descriptions, DescriptionsProps } from 'antd';

interface EntityDetailsTableProps<T> {
  resourceUrl: string
  resourceKey: string
  entityId: number
  entityDetails: (data : T) => DescriptionsProps['items']
}

function EntityDetailsTable<T>(
  {
    resourceUrl,
    resourceKey,
    entityId,
    entityDetails
  } : EntityDetailsTableProps<T>
)  {
  const {
    isLoading,
    data
  }
    = useGetByIdApi(resourceUrl, resourceKey, entityId)

  if(isLoading) {
    return <>Loading...</>;
  }

  return (
    <Descriptions bordered layout="horizontal" items={entityDetails(data as T)}/>
  )
}

export default EntityDetailsTable