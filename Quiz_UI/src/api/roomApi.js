import axiosClient from "./axiosClient";

const roomApi = {
  get: (id) => {
    const url = `/room/rooms/${id}/`;
    return axiosClient.get(url);
  },
  add: (data) => {
    const url = `/room/rooms/`;
    return axiosClient.post(url, data);
  },
  checkStarted: (roomId) => {
    const url = `/room/rooms/${roomId}/check-started`;
    return axiosClient.get(url);
  },
};

export default roomApi;
