import axios from "axios";

const axiosBase = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
});

axiosBase.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (err) => {
    throw err;
  }
);
export default axiosBase;
