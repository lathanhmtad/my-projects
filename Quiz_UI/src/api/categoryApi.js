import axiosClient from "./axiosClient";

const categoryApi = {
  getAll: () => {
    const url = `/lesson/categories/`;
    return axiosClient.get(url);
  },
};

export default categoryApi;
