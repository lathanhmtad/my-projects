import axiosClient from "./axiosClient";

const answerTimeApi = {
  add: (data) => {
    const url = `/room/answer-times/`;
    return axiosClient.post(url, data);
  },
};

export default answerTimeApi;
