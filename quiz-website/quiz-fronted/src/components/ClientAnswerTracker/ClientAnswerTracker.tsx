import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Button } from 'antd';
import { setCurrentQues } from '../../redux/slices/clientQuizSlice';
import { ClientQuestionResponse } from '../../types/ClientUI';

function ClientAnswerTracker() {

  const dispatch = useAppDispatch();

  const {
    quizQA
  }
    = useAppSelector(state => state.clientQuiz);

  const isQuestionAnswered = (question: ClientQuestionResponse): boolean => {
    let isAnswered = question.options.find(a => a.isSelected);
    return !!isAnswered;
  };

  return (
    <div>
      {quizQA?.questions.map((question, index) =>
        <Button type={isQuestionAnswered(question) ? 'primary' : 'default'}
                onClick={() => dispatch(setCurrentQues(index))} size="large">
          {index + 1}
        </Button>)}
    </div>
  );
}


export default ClientAnswerTracker;