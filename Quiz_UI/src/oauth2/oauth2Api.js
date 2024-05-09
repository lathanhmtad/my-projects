import axios from "axios";
import config from "./config";

export const login = (username, password) => {
  const bodyFormData = new FormData();
  bodyFormData.append("username", username);
  bodyFormData.append("password", password);
  bodyFormData.append("grant_type", config.grantType);
  bodyFormData.append("client_id", config.clientID);
  bodyFormData.append("client_secret", config.clientSecret);
  return axios({
    method: "post",
    url: config.accessTokenUrl,
    data: bodyFormData,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};
