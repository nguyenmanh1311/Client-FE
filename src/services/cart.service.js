import axios from "axios";
import configAPI from "../configuration/apiConfig.json";
import { axiosInstance } from "../configuration/axios.config";

const addToCart = (data) => {
  return axiosInstance
    .post(configAPI.baseUrlApiMain + "/cart", data)
    .then((res) => {
      return res.data;
    });
};

const getCart = () => {
  return axiosInstance.get(configAPI.baseUrlApiMain + "/cart").then((res) => {
    return res.data;
  });
};

const getAllCartDetailByCartID = (id) => {
  return axiosInstance
    .get(configAPI.baseUrlApiMain + `/cart/${id}`)
    .then((res) => {
      return res.data;
    });
};

const deleteCartDetailById = (cart_id) => {
  return axiosInstance
    .delete(`${configAPI.baseUrlApiMain}/cart/${cart_id}`)
    .then((res) => {
      return res.data;
    });
};

const updateQuantity = (cart_id, data) => {
  return axiosInstance
    .patch(`${configAPI.baseUrlApiMain}/cart/${cart_id}`, data)
    .then((res) => {
      return res.data;
    });
};

export const CartService = {
  addToCart,
  getCart,
  getAllCartDetailByCartID,
  deleteCartDetailById,
  updateQuantity,
};
