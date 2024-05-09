import ApplicationConstants from './ApplicationConstants';

const apiPathV1: string = ApplicationConstants.API_PATH_V1;

class ResourceUrl {
  // admin
  static PARTICIPANT = apiPathV1 + '/participants';
  static CATEGORY = apiPathV1 + '/categories';
  static QUIZ = apiPathV1 + '/quizzes';
  static QUIZ_QUESTION = apiPathV1 + '/quiz-questions';
  static QUIZ_ANSWER = apiPathV1 + '/quiz-answers';

  // client
  static CLIENT_QUIZ = apiPathV1 + '/client-api/quizzes';
  static CLIENT_PARTICIPANT_INFO = apiPathV1 + '/client-api/participants/info';

  // auth
  static LOGIN = apiPathV1 + '/auth/login';
}

export default ResourceUrl;