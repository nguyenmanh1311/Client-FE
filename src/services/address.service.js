import axios from "axios";
import configAPI from "../configuration/apiConfig.json";

let token = "3c8a5816-6990-11ed-be76-3233f989b8f3";
const getProvince = () => {
  return axios
    .get(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/province`,
      { headers: { token: token } }
    )
    .then((res) => {
      return res.data;
    });
};

const getDistrict = (id) => {
  return axios
    .get(
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=" +
        id,
      { headers: { token: token } }
    )
    .then((res) => {
      return res.data;
    });
};

const getWard = (id) => {
  return axios
    .get(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=` +
        id,
      {
        headers: { token: token },
      }
    )
    .then((res) => {
      return res.data;
    });
};

const getAddressByUserID = (id) => {
  return axios
    .get(`${configAPI.baseUrlApi}/api/v1/address/user/${id}`)
    .then((res) => {
      return res.data;
    });
};

const getAddressByID = (id) => {
  return axios
    .get(`${configAPI.baseUrlApi}/api/v1/address/${id}`)
    .then((res) => {
      return res.data;
    });
};

const createAddress = (data) => {
  return axios
    .post(`${configAPI.baseUrlApi}/api/v1/address`, data)
    .then((res) => {
      return res.data;
    });
};

const updateAddress = (data, id) => {
  return axios
    .put(`${configAPI.baseUrlApi}/api/v1/address/${id}`, data)
    .then((res) => {
      return res.data;
    });
};

const deleteAddress = (id) => {
  return axios
    .delete(`${configAPI.baseUrlApi}/api/v1/address/${id}`)
    .then((res) => {
      return res.data;
    });
};

export const AddressService = {
  getProvince,
  getDistrict,
  getWard,
  getAddressByUserID,
  getAddressByID,
  createAddress,
  updateAddress,
  deleteAddress,
};
