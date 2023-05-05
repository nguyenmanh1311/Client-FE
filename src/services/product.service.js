import configAPI from "../configuration/apiConfig.json";
import { axiosInstance } from "../configuration/axios.config";

const getAllProduct = (data) => {
  return axiosInstance
    .get(configAPI.baseUrlApiMain + "/product", { params: data })
    .then((res) => {
      return res.data;
    });
};
const getAllTopSelling = () => {
  return axiosInstance
    .get(configAPI.baseUrlApi + "/api/v1/product/topselling")
    .then((res) => {
      return res.data;
    });
};

const get10ProductFeature = () => {
  return axiosInstance
    .get(configAPI.baseUrlApi + "/api/v1/product")
    .then((res) => {
      return res.data;
    });
};

const get8ProductNew = () => {
  return axiosInstance
    .get(configAPI.baseUrlApi + "/api/v1/product/top8new")
    .then((res) => {
      return res.data;
    });
};

const getProductByName = (name) => {
  return axiosInstance
    .get(configAPI.baseUrlApiMain + "/product/", { params: name })
    .then((res) => {
      return res.data;
    });
};

const getProductSameCate = () => {
  return axiosInstance
    .get(configAPI.baseUrlApi + "/api/v1/product")
    .then((res) => {
      return res.data;
    });
};

const getProductById = (id) => {
  return axiosInstance
    .get(`${configAPI.baseUrlApiMain}/product/${id}`)
    .then((res) => {
      return res.data;
    });
};

const get4RelateProduct = (idProduct) => {
  return axiosInstance
    .get(`${configAPI.baseUrlApi}/api/v1/product/top4related/${idProduct}`)
    .then((res) => {
      return res.data;
    });
};

const getProductByFilter = (data) => {
  return axiosInstance
    .post(`${configAPI.baseUrlApi}/api/v1/product/filter`, data)
    .then((response) => {
      return response.data;
    });
};

export const ProductService = {
  getAllProduct,
  get8ProductNew,
  getProductById,
  getProductSameCate,
  get10ProductFeature,
  getProductByName,
  get4RelateProduct,
  getAllTopSelling,
  getProductByFilter,
};
