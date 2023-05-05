import configAPI from "../configuration/apiConfig.json";
import { axiosInstance } from "../configuration/axios.config";

const getAllCategory = () => {
  return axiosInstance
    .get(configAPI.baseUrlApiMain + "/category")
    .then((res) => {
      return res.data;
    });
};

export const CategoryService = {
  getAllCategory,
};
