import BaseResponse from './BaseResponse';
import {  QuizAnswerResponse } from './Answer';

export interface QuizQuestionResponse extends BaseResponse {
  description: string;
  image: string;
  quizName: string;
  answers: QuizAnswerResponse[];
}