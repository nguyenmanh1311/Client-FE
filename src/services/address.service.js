import configAPI from "../configuration/apiConfig.json";
import { axiosInstance } from "../configuration/axios.config";

let token = "3c8a5816-6990-11ed-be76-3233f989b8f3";
const getProvince = () => {
  return axiosInstance
    .get(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/province`,
      { headers: { token: token } }
    )
    .then((res) => {
      return res.data;
    });
};

const getDistrict = (id) => {
  return axiosInstance
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
  return axiosInstance
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

const getAddress = () => {
  return axiosInstance
    .get(configAPI.baseUrlApiAuth + "/address/get-my-address")
    .then((res) => {
      return res.data;
    });
};

const getAddressByID = (id) => {
  return axiosInstance
    .get(configAPI.baseUrlApiAuth + `/address/get-by-id/${id}`)
    .then((res) => {
      return res.data;
    });
};

const createAddress = (data) => {
  return axiosInstance
    .post(configAPI.baseUrlApiAuth + "/address/add-new-address", data)
    .then((res) => {
      return res.data;
    });
};

const updateAddress = (data, id) => {
  return axiosInstance
    .patch(configAPI.baseUrlApiAuth + `/address/update/${id}`, data)
    .then((res) => {
      return res.data;
    });
};

const deleteAddress = (id) => {
  return axiosInstance
    .delete(configAPI.baseUrlApiAuth + `/address/delete/${id}`)
    .then((res) => {
      return res.data;
    });
};

export const AddressService = {
  getProvince,
  getDistrict,
  getWard,
  getAddress,
  getAddressByID,
  createAddress,
  updateAddress,
  deleteAddress,
};
