import BaseResponse from './BaseResponse';
import { CategoryResponse } from './Category';
import { QuizQuestionResponse } from './Question';

export interface QuizResponse extends BaseResponse {
  name: string;
  description: string;
  image: string;
  difficulty: string;
  category: CategoryResponse;
  questions: QuizQuestionResponse[];
}

