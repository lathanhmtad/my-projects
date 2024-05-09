import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
});

axiosClient.interceptors.request.use(async (config) => {
  const access = window.localStorage.getItem("access");
  config.headers.Authorization = `Bearer ${access}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (err) => {
    //handle error
    throw err;
  }
);
export default axiosClient;
