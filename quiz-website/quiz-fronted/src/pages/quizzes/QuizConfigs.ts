import ManagerPath from '../../constants/ManagerPath';
import ResourceUrl from '../../constants/ResourceUrl';
import { Configs } from '../../types/Configs';

class QuizConfigs extends Configs {
  static managerPath = ManagerPath.QUIZ;
  static resourceUrl = ResourceUrl.QUIZ;
  static resourceKey = 'quizzes';
  static manageTitle = 'Quản lý bài quiz';
  static createTitle = 'Thêm bài quiz';
  static updateTitle = 'Cập nhật bài quiz';
}

export default QuizConfigs;