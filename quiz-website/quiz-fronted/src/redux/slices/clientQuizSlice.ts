import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientQuizQAResponse } from '../../types/ClientUI';
import { ErrorResponse } from '../../utils/FetchUtils';
import { QuestionTypes } from '../../types/QuestionTypes';

interface UserAnswer {
  questionId: number;
  answerId: number;
  questionType: string;
}

interface ClientQuizState {
  quizQA: ClientQuizQAResponse | null;
  currentQues: number;
  status: string,
  error: ErrorResponse | null,
  totalQues: number
}

const initialState: ClientQuizState = {
  quizQA: null,
  currentQues: -1,
  status: 'idle',
  error: null,
  totalQues: 0
};

export const clientQuizSlice = createSlice({
  name: 'clientQuiz',
  initialState,
  reducers: {
    setCurrentQues: (state, action: PayloadAction<number>) => {
      state.currentQues = action.payload;
    },

    setAnswer: (state, action: PayloadAction<UserAnswer>) => {
      const { questionId, answerId, questionType } = action.payload;

      if (state.quizQA) {
        state.quizQA.questions = state.quizQA.questions.map(question => {
          if (question.id === questionId) {
            question.options = question.options.map(option => {
              if (questionType === QuestionTypes.Single) {
                return {
                  ...option,
                  isSelected: +option.id === answerId
                };
              }

              if (questionType === QuestionTypes.Multiple) {
                if (+option.id === answerId) {
                  return { ...option, isSelected: true };
                }
              }

              return option;
            });
          }
          return question;
        });
      }
    },

    handleFetchQuizQASuccess: (state, action: PayloadAction<ClientQuizQAResponse>) => {
      const quizQAResponse = action.payload;

      state.totalQues = quizQAResponse.questions.length;
      state.currentQues = 0;
      state.quizQA = quizQAResponse;
    },

    checkQuestionAnswered: (state, action: PayloadAction<number>) => {

    }
  }
});

export const {
  setCurrentQues,
  setAnswer,
  handleFetchQuizQASuccess
} = clientQuizSlice.actions;

export default clientQuizSlice.reducer;