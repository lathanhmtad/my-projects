import axiosClient from "./axiosClient";

const tagApi = {
  getAll: () => {
    const url = `/lesson/tags/`;
    return axiosClient.get(url);
  },
};

export default tagApi;
