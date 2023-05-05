import axios from "axios";
import configAPI from "../configuration/apiConfig.json";
import { axiosInstance } from "../configuration/axios.config";

const getAllImageByProductId = (id) => {
  return axios
    .get(`${configAPI.baseUrlApi}/api/v1/image_product/product/${id}`)
    .then((res) => {
      return res.data;
    });
};
const saveImage = (id) => {
  return axios
    .get(`${configAPI.baseUrlApi}/api/v1/image_product/product/${id}`)
    .then((res) => {
      return res.data;
    });
};

const uploadImage = (file) => {
  return axiosInstance
    .post(configAPI.baseUrlApiMain + "/upload/image", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data;
    });
};

const uploadAvatar = (data) => {
  return axiosInstance
    .patch(configAPI.baseUrlApiAuth + "/auth/update-avatar/update-avatar", data)
    .then((res) => {
      return res.data;
    });
};

export const ImageService = {
  getAllImageByProductId,
  saveImage,
  uploadImage,
  uploadAvatar,
};
