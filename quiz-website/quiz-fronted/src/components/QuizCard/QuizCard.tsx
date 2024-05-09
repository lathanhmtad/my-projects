import React from 'react';
import { Avatar, Button, Card, Typography } from 'antd';
import { ClientQuizResponse } from '../../types/ClientUI';
import { Link } from 'react-router-dom';

const { Meta } = Card;

interface QuizCardProps {
  quiz: ClientQuizResponse;
}

const QuizCard = (props: QuizCardProps) => {
  const { quiz } = props;
  return (
    <Card
      actions={[
        <Link to="">
          <Button size="large">Xem chi tiết</Button>
        </Link>,
        <Link to={`/quiz/${quiz.id}`}>
          <Button type="primary" size="large">Làm bài test</Button>,
        </Link>
      ]}
      hoverable
      style={{ width: '100%' }}
      cover={<img alt="example" style={{width: '100%', height: '280px', objectFit: 'contain'}}
                  src={quiz.image === null ? 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' : quiz.image}/>}
    >
      <Meta title={quiz.name} description={`Mức độ: ${quiz.difficulty}`}/>
    </Card>
  );
};

export default QuizCard;