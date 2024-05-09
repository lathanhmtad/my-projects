import axiosClient from "./axiosClient";

const statisticApi = {
  getAnswerTimeStatistic: (answerTimeId) => {
    const url = `/room/statistic/answer-times/${answerTimeId}/`;
    return axiosClient.get(url);
  },
  getAllRoomStatistic: () => {
    const url = `/room/statistic/rooms/`;
    return axiosClient.get(url);
  },
  getRoomStatistic: (roomId) => {
    const url = `/room/statistic/rooms/${roomId}`;
    return axiosClient.get(url);
  },
  getAfterQuestionRank: (answerTimeId, questionId) => {
    const url = `/room/statistic/answer-times/${answerTimeId}/questions/${questionId}/chart`;
    return axiosClient.get(url);
  },
  getAnswerTimeRank: (lessonId) => {
    const url = `/room/statistic/answer-times/${lessonId}/chart`;
    return axiosClient.get(url);
  },
  getRoomRank: (roomId) => {
    const url = `/room/statistic/rooms/${roomId}/chart`;
    return axiosClient.get(url);
  },
  getAllAnswerTime: (userId) => {
    const url = `/room/statistic/users/${userId}/answer-times`;
    return axiosClient.get(url);
  },
};

export default statisticApi;
