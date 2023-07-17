import { axiosInstance } from "../configuration/axios.config";
import configAPI from "../configuration/apiConfig.json";

const getAllInvoice = (data1) => {
  return axiosInstance
    .get(configAPI.baseUrlApiMain + `/invoice/my-invoice`, { params: data1 })
    .then((res) => {
      return res.data;
    });
};

const createInvoiceByCartId = (cartId) => {
  return axiosInstance
    .post(configAPI.baseUrlApiMain + "/api/v1/invoice/" + cartId)
    .then((res) => {
      return res.data;
    });
};
const getInvoiceByInvoiceId = (id) => {
  return axiosInstance
    .get(configAPI.baseUrlApiMain + "/invoice/" + id)
    .then((res) => {
      return res.data;
    });
};

const placeOrderCOD = (data) => {
  return axiosInstance
    .post(configAPI.baseUrlApiMain + "/invoice/cod", data)
    .then((res) => {
      return res.data;
    });
};

const placeOrderMomo = (data) => {
  return axiosInstance
    .post(configAPI.baseUrlApiMain + "/invoice/momo", data)
    .then((res) => {
      return res.data;
    });
};

const placeOrderVNPay = (data) => {
  return axiosInstance
    .post(configAPI.baseUrlApiMain + "/invoice/vnpay", data)
    .then((res) => {
      return res.data;
    });
};

const updatePaymentStatus = (input) => {
  return axiosInstance
    .patch(configAPI.baseUrlApiMain + "/invoice/change-status", input)
    .then((response) => {
      return response.data;
    });
};

export const InvoiceService = {
  getAllInvoice,
  createInvoiceByCartId,
  placeOrderMomo,
  placeOrderCOD,
  placeOrderVNPay,
  updatePaymentStatus,
  getInvoiceByInvoiceId,
};
