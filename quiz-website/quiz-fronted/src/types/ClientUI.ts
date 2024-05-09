import BaseResponse from '../models/BaseResponse';

export interface ClientQuizResponse extends BaseResponse {
  name: string;
  description: string;
  image: string;
  difficulty: string;
  category: string;
}

export interface ClientQuizQAResponse extends ClientQuizResponse {
  questions: ClientQuestionResponse[];
}

export interface ClientQuestionResponse {
  id: number,
  description: string,
  image: string,
  type: string,
  options: ClientAnswerResponse[]
}

export interface ClientAnswerResponse {
  id: string;
  description: string;
  isSelected: boolean;
}