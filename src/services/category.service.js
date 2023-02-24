import axios from "axios";
import configAPI from "../configuration/apiConfig.json";

const getAllCategory = () => {
  return axios.get(configAPI.baseUrlApi + "/api/v1/category").then((res) => {
    return res.data;
  });
};

export const CategoryService = {
  getAllCategory,
};
