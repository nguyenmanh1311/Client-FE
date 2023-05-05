import configAPI from "../configuration/apiConfig.json";
import { axiosInstance } from "../configuration/axios.config";

const getAllBrand = () => {
  return axiosInstance.get(configAPI.baseUrlApiMain + "/brand").then((res) => {
    return res.data;
  });
};

const getBrandByID = (id) => {
  return axiosInstance
    .get(configAPI.baseUrlApiMain + `/brand/${id}`)
    .then((res) => {
      return res.data;
    });
};

export const BrandService = {
  getAllBrand,
  getBrandByID,
};
