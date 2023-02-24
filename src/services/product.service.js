import axios from "axios";
import configAPI from "../configuration/apiConfig.json";

const getAllProduct = () => {
  return axios.get(configAPI.baseUrlApi + "/api/v1/product").then((res) => {
    return res.data;
  });
};
const getAllTopSelling = () => {
  return axios
    .get(configAPI.baseUrlApi + "/api/v1/product/topselling")
    .then((res) => {
      return res.data;
    });
};

const get10ProductFeature = () => {
  return axios.get(configAPI.baseUrlApi + "/api/v1/product").then((res) => {
    return res.data;
  });
};

const get8ProductNew = () => {
  return axios
    .get(configAPI.baseUrlApi + "/api/v1/product/top8new")
    .then((res) => {
      return res.data;
    });
};

const getProductByName = (name) => {
  return axios
    .get(configAPI.baseUrlApi + "/api/v1/product/search?input=" + name)
    .then((res) => {
      return res.data;
    });
};

const getProductSameCate = () => {
  return axios.get(configAPI.baseUrlApi + "/api/v1/product").then((res) => {
    return res.data;
  });
};

const getProductById = (id) => {
  return axios
    .get(`${configAPI.baseUrlApi}/api/v1/product/${id}`)
    .then((res) => {
      return res.data;
    });
};

const getProductByBrand = (id) => {
  return axios
    .get(`${configAPI.baseUrlApi}/api/v1/product/branch/${id}`)
    .then((res) => {
      return res.data;
    });
};

const getProductByCategory = (id) => {
  return axios
    .get(`${configAPI.baseUrlApi}/api/v1/product/cate/${id}`)
    .then((res) => {
      return res.data;
    });
};

const getProductByCateIdAndBrandId = (input) => {
  return axios
    .post(
      `${configAPI.baseUrlApi}/api/v1/product/search/bycateandbranch`,
      input
    )
    .then((res) => {
      return res.data;
    });
};

const get4RelateProduct = (idProduct) => {
  return axios
    .get(`${configAPI.baseUrlApi}/api/v1/product/top4related/${idProduct}`)
    .then((res) => {
      return res.data;
    });
};

const getProductByFilter = (data) => {
  return axios
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
  getProductByBrand,
  getProductByCategory,
  get10ProductFeature,
  getProductByName,
  getProductByCateIdAndBrandId,
  get4RelateProduct,
  getAllTopSelling,
  getProductByFilter,
};
