import axios from "axios";
import configAPI from "../configuration/apiConfig.json";

const getUserByUserID = (id) => {
  return axios.get(configAPI.baseUrlApi + "/api/v1/user/" + id).then((res) => {
    return res.data;
  });
};

export const UserService = {
  getUserByUserID,
};
