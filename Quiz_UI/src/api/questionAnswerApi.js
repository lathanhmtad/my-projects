import axiosClient from "./axiosClient";

const answerTimeApi = {
  add: (data) => {
    const url = `/room/question-answers/`;
    return axiosClient.post(url, data);
  },
  delete: (id) => {
    const url = `/room/question-answers/${id}`;
    return axiosClient.delete(url);
  },
};

export default answerTimeApi;
