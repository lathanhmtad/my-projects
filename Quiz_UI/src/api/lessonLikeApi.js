import axiosClient from "./axiosClient";

const lessonLikeApi = {
  addLike: (userId, lessonId) => {
    const url = `/lesson/lesson-likes/`;
    return axiosClient.post(url, {
      userId: userId,
      lesson: {
        id: lessonId,
      },
    });
  },
  removeLike: (data, lessonId) => {
    const url = `/lesson/lesson-likes/remove`;
    return axiosClient.post(url, {
      ...data,
      lesson: {
        id: lessonId,
      },
    });
  },
};

export default lessonLikeApi;
