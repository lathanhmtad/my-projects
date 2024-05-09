import axiosClient from "./axiosClient";

const lessonApi = {
  getAll: () => {
    const url = `/lesson/lessons/`;
    return axiosClient.get(url);
  },
  getById: (id) => {
    const url = `/lesson/lessons/${id}/`;
    return axiosClient.get(url);
  },
  getByRoomId: (roomId) => {
    const url = `/room/rooms/${roomId}/lessons/`;
    return axiosClient.get(url);
  },
};

export default lessonApi;
