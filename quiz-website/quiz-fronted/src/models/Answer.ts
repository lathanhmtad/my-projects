import BaseResponse from './BaseResponse';

export interface QuizAnswerResponse extends BaseResponse {
  description: string;
  correctAnswer: boolean;
}

