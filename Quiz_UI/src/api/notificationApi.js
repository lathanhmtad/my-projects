import axiosClient from "./axiosClient";

const notificationApi = {
  makeAllRead: (userId) => {
    const url = `/notification/users/${userId}/make-read`;
    return axiosClient.put(url);
  },
};

export default notificationApi;
