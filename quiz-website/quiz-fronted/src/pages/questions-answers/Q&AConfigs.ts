import ManagerPath from '../../constants/ManagerPath';
import ResourceUrl from '../../constants/ResourceUrl';
import { Configs } from '../../types/Configs';

class QAConfigs extends Configs {
  static resourceUrlAnswer = ResourceUrl.QUIZ_ANSWER;
  static resourceKeyAnswer = 'quiz-answers';
  static managerPath = ManagerPath.Q_A;
  static resourceUrl = ResourceUrl.QUIZ_QUESTION;
  static resourceKey = 'quiz-questions';
  static manageTitle = 'Quản lý questions và answer';
  static createTitle = 'Thêm bài câu hỏi';
  static updateTitle = 'Cập nhật câu hỏi';
}

export default QAConfigs;