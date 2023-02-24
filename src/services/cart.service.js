import axios from "axios";
import configAPI from "../configuration/apiConfig.json";

const addToCart = (cartDetail) => {
  return axios
    .post(configAPI.baseUrlApi + "/api/v1/cartdetail", cartDetail)
    .then((res) => {
      return res.data;
    });
};

const getCartId = (id) => {
  return axios
    .get(`${configAPI.baseUrlApi}/api/v1/cart/user/${id}`)
    .then((res) => {
      return res.data;
    });
};

const getAllCartDetailByCartID = (id) => {
  return axios
    .get(`${configAPI.baseUrlApi}/api/v1/cartdetail/${id}`)
    .then((res) => {
      return res.data;
    });
};

const deleteCartDetailById = (id) => {
  return axios
    .delete(`${configAPI.baseUrlApi}/api/v1/cartdetail/${id}`)
    .then((res) => {
      return res.data;
    });
};

const updateQuantity = (data) => {
  return axios
    .put(`${configAPI.baseUrlApi}/api/v1/cartdetail`, data)
    .then((res) => {
      return res.data;
    });
};
const calTotalPriceCart = (id) => {
  return axios.get(`${configAPI.baseUrlApi}/api/v1/cart/cal/${id}`);
};

export const CartService = {
  addToCart,
  getCartId,
  getAllCartDetailByCartID,
  deleteCartDetailById,
  updateQuantity,
  calTotalPriceCart,
};
