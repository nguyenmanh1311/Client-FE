import configAPI from "../configuration/apiConfig.json";
import { axiosInstance } from "../configuration/axios.config";

const getAllRating = (data) => {
  return axiosInstance
    .get(configAPI.baseUrlApiMain + "/product-review", { params: data })
    .then((res) => {
      return res.data;
    });
};

const postRating = (data) => {
  return axiosInstance
    .post(configAPI.baseUrlApiMain + "/product-review", data)
    .then((res) => {
      return res.data;
    });
};

export const RatingService = {
  getAllRating,
  postRating,
};
