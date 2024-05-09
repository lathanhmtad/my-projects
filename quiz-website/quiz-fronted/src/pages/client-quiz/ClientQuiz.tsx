import { Button, Col, Row, Space } from 'antd';
import ClientQuestion from '../../components/ClientQuestion';
import useClientQuizViewModel from './ClientQuiz.vm';
import ClientAnswerTracker from '../../components/ClientAnswerTracker';

function ClientQuiz() {

  const {
    nextQuestion, prevQuestion,
    currentQues, quizQA, totalQues
  } = useClientQuizViewModel();

  if (quizQA) {
    return (
      <Row>
        <Col span={18}>
          <ClientQuestion
            question={quizQA.questions[currentQues]}
            currentQues={currentQues}
          />
          <Space align={'center'}>
            <Button disabled={currentQues === 0} onClick={() => prevQuestion()} danger type={'primary'} size={'large'}>
              Prev
            </Button>
            <Button disabled={currentQues + 1 === totalQues} onClick={() => nextQuestion()} type={'primary'}
                    size={'large'}>
              Next
            </Button>
          </Space>
        </Col>
        <Col span={6}>
          <ClientAnswerTracker/>
        </Col>
      </Row>
    );
  }
  return <div>
    Loading ...
  </div>;
}

export default ClientQuiz;