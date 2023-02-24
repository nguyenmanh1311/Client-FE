import axios from "axios";
import configAPI from "../configuration/apiConfig.json";

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

export const ImageService = {
  getAllImageByProductId,
  saveImage,
};
