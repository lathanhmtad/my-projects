import { Card, Checkbox, Col, Form, Image, Radio, Row, Space } from 'antd';
import { ClientQuestionResponse } from '../../types/ClientUI';
import { useAppDispatch } from '../../redux/hooks';
import { setAnswer } from '../../redux/slices/clientQuizSlice';
import { QuestionTypes } from '../../types/QuestionTypes';


interface ClientQuestionProps {
  question: ClientQuestionResponse;
  currentQues: number;
}

function ClientQuestion({ question, currentQues }: ClientQuestionProps) {

  const dispatch = useAppDispatch();

  const handleCheck = (answerId: number) => {
    dispatch(setAnswer({
      questionId: question.id,
      answerId: answerId,
      questionType: question.type
    }));
  };

  return (
    <Card title={`Câu ${currentQues + 1}: ${question.description}`} bordered={false} style={{ width: '100%' }}>
      {question.image ? <div><Image
        width={200}
        height={200}
        src={question.image}
      /></div> : <div style={{ width: '200px', height: '200px' }}></div>}

      {question.type === QuestionTypes.Single &&
        <Form>
          <Form.Item name="radio">
            <Space direction="vertical" size="large">
              {question.options.map(option =>
                <Radio onChange={() => handleCheck(+option.id)}
                       checked={option.isSelected} key={option.id}
                       value={option.id}>{option.description}</Radio>
              )}
            </Space>
          </Form.Item>
        </Form>
      }

      {question.type === QuestionTypes.Multiple &&
        <Form>
          <Form.Item name="checkbox">
            <Row gutter={[0, 24]}>
              {question.options.map(option =>
                <Col key={option.id} span={24}>
                  <Checkbox checked={option.isSelected}
                            onChange={() => handleCheck(+option.id)} value={option.id}>{option.description}</Checkbox>
                </Col>
              )}
            </Row>
          </Form.Item>
        </Form>
      }
      <button>Hủy bỏ lựu chọn</button>
    </Card>
  );
}

export default ClientQuestion;