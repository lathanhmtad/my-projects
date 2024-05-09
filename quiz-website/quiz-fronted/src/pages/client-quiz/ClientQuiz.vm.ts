import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useQuery } from '@tanstack/react-query';

import {
  handleFetchQuizQASuccess,
  setCurrentQues,
} from '../../redux/slices/clientQuizSlice';

import FetchUtils from '../../utils/FetchUtils';
import ResourceUrl from '../../constants/ResourceUrl';
import { ClientQuizQAResponse } from '../../types/ClientUI';

function useClientQuizViewModel() {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const {
    data: quizQAResponse,
    isLoading,
    isSuccess
  } = useQuery({
    queryKey: ['clientQuizWithQA', 'getQuizWithQA', id],
    queryFn: (): Promise<ClientQuizQAResponse> => FetchUtils.getWithToken(ResourceUrl.CLIENT_QUIZ + `/q-a/${id}`),
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(handleFetchQuizQASuccess(quizQAResponse));
    }
  }, [isSuccess]);

  const {
    currentQues,
    quizQA,
    totalQues
  } = useAppSelector(state => state.clientQuiz);

  const nextQuestion = () => {
    dispatch(setCurrentQues(currentQues + 1));
  };

  const prevQuestion = () => {
    dispatch(setCurrentQues(currentQues - 1));
  };

  return {
    nextQuestion,
    prevQuestion,
    isLoading,
    currentQues,
    quizQA,
    totalQues
  };
}

export default useClientQuizViewModel;