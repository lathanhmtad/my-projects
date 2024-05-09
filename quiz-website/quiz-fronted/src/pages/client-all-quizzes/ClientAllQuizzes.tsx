import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Pagination, Typography } from 'antd';

import { ClientQuizResponse } from '../../types/ClientUI';
import { CollectionWrapper } from '../../types/CollectionWrapper';

import FetchUtils, { RequestParams } from '../../utils/FetchUtils';

import ResourceUrl from '../../constants/ResourceUrl';

import QuizCard from '../../components/QuizCard';
import { Container, Row, Col } from 'react-bootstrap';

function ClientAllQuizzes() {
  const [requestParams, setRequestParams] = useState<RequestParams>({
    page: 1,
    size: 3
  });

  const {
    data: clientQuizResponses
  } = useQuery({
    queryKey: ['client-api-quizzes', 'getAllQuizzes', requestParams],
    queryFn: (): Promise<CollectionWrapper<ClientQuizResponse>> => FetchUtils.getAll(ResourceUrl.CLIENT_QUIZ, requestParams)
  });

  const handlePageChange = (page: number) => {
    setRequestParams({
      ...requestParams,
      page,
    });
  };

  return (
    <Container>
      <Row>
        <Col xs={2}>
          <h5>Bộ lọc tìm kiếm</h5>
        </Col>
        <Col xs={10}>
          <Row gutter={16}>
            {clientQuizResponses?.content.map(item =>
              <Col key={item.id} className="gutter-row" span={8}>
                <QuizCard quiz={item}/>
              </Col>)}
          </Row>
          <Pagination
            onChange={handlePageChange}
            pageSize={5} total={clientQuizResponses?.totalElements}/>;
        </Col>
      </Row>
    </Container>
  );
}

export default ClientAllQuizzes;