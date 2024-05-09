import ManageHeader from '../../components/ManageHeader/ManageHeader';
import ManageHeaderTitle from '../../components/ManageHeaderTitle/ManageHeaderTitle';
import ManageHeaderButtons from '../../components/ManageHeaderButtons';
import useResetManagePageState from '../../hooks/use-reset-manage-page-state';
import PageConfigs from '../PageConfigs';
import { ListResponse } from '../../utils/FetchUtils';
import useGetAllApi from '../../hooks/use-get-all-api';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import ManageMain from '../../components/ManageMain/ManageMain';
import { DescriptionsProps, Image, Select } from 'antd';
import React, { useState } from 'react';
import QAConfigs from './Q&AConfigs';
import { QuizQuestionResponse } from '../../models/Question';
import ManagePagination from '../../components/ManagePagination/ManagePagination';
import QuizConfigs from '../quizzes/QuizConfigs';
import { SelectOption } from '../../types/SelectOption';
import { QuizResponse } from '../../models/Quiz';
import { useAppDispatch } from '../../redux/hooks';
import { setActiveFilter, setActivePage } from '../../redux/slices/managePageSlice';
import { Filter, NumberOperator } from '../../utils/FilterUtils';
import QAManageTable from './Q&AManageTable';

function QAManage() {
  useResetManagePageState();

  const [quizSelectList, setQuizSelectList] = useState<SelectOption[]>([]);

  const dispatch = useAppDispatch();

  const {
    isLoading,
    data: listResponse = PageConfigs.initListResponse as ListResponse<QuizQuestionResponse>
  } = useGetAllApi<QuizQuestionResponse>(QAConfigs.resourceUrl, QAConfigs.resourceKey);

  useGetAllApi<QuizResponse>(QuizConfigs.resourceUrl, QuizConfigs.resourceKey,
    { all: true },
    (quizListResponse) => {
      const selectList: SelectOption[] = quizListResponse.content.map(item => ({
        value: String(item.id),
        label: item.name
      }));
      selectList.unshift({
        value: '0',
        label: 'Tất cả bài quizzes'
      });
      setQuizSelectList(selectList);
    }
  );

  const entityDetails = (data: QuizQuestionResponse): DescriptionsProps['items'] => [
    { key: 'id', label: 'Id', children: data.id, span: 24 },
    { key: 'name', label: 'Câu hỏi', children: data.description, span: 24 },
    {
      key: 'image', label: 'Hình ảnh',
      children: data.image === null || data.image === '' ? 'Không có' : <Image
        width={100}
        src={data.image}
      />,
      span: 24
    },
    { key: 'createdDate', label: 'Ngày tạo', children: data.createdDate, span: 24 },
    {
      key: 'updatedDate',
      label: 'Cập nhập lần cuối',
      children: data.updatedDate === null ? 'Chưa có' : data.updatedDate,
      span: 24
    }
  ];

  return (
    <div>
      <ManageHeader>
        <ManageHeaderTitle title={QAConfigs.manageTitle}/>
        <ManageHeaderButtons listResponse={listResponse} resourceUrl={QAConfigs.resourceUrl}
                             resourceKey={QAConfigs.resourceKey}/>
        <span>Chọn bài quiz</span>
        <Select
          labelInValue
          placeholder="Tất cả bài quizzes"
          style={{ width: 200 }}
          onChange={selected => {
            if (selected.value !== '0') {
              const filter: Filter = {
                filterCriteriaList: [
                  {
                    property: 'quiz.id',
                    type: null,
                    operator: NumberOperator.EQUALS,
                    value: selected.value
                  }
                ]
              };
              dispatch(setActivePage(1));
              dispatch(setActiveFilter(filter));
            } else {
              dispatch(setActiveFilter(null));
            }
          }}
          options={quizSelectList}
        />
      </ManageHeader>
      <SearchPanel/>

      <ManageMain listResponse={listResponse} isLoading={isLoading}>
        <QAManageTable
          listResponse={listResponse}
          resourceUrl={QAConfigs.resourceUrl}
          resourceKey={QAConfigs.resourceKey}
          tableHeads={[]}
          entityDetails={entityDetails}/>
      </ManageMain>

      <ManagePagination listResponse={listResponse}/>
    </div>
  );
}


export default QAManage;