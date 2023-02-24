import axios from "axios";
import configAPI from "../configuration/apiConfig.json";

const getAllInvoiceByUserId = (userId) => {
  return axios
    .get(configAPI.baseUrlApi + "/api/v1/invoice/" + userId)
    .then((res) => {
      return res.data;
    });
};

const createInvoiceByCartId = (cartId) => {
  return axios
    .post(configAPI.baseUrlApi + "/api/v1/invoice/" + cartId)
    .then((res) => {
      return res.data;
    });
};
const getInvoiceByInvoiceId = (id) => {
  return axios
    .get(configAPI.baseUrlApi + "/api/v1/invoice/invoiceid/" + id)
    .then((res) => {
      return res.data;
    });
};
const placeOrderByCartIdAndAddress = (cartId, addressId) => {
  return axios
    .post(
      configAPI.baseUrlApi + `/api/v1/invoice/${cartId}/address/${addressId}`
    )
    .then((res) => {
      return res.data;
    });
};

const updatePaymentStatus = (id) => {
  return axios
    .patch(configAPI.baseUrlApi + "/api/v1/invoice/payment/" + id)
    .then((response) => {
      return response.data;
    });
};
const cancelInvoice = (id) => {
  return axios
    .delete(configAPI.baseUrlApi + "/api/v1/invoice/" + id)
    .then((response) => {
      return response.data;
    });
};

export const InvoiceService = {
  getAllInvoiceByUserId,
  createInvoiceByCartId,
  placeOrderByCartIdAndAddress,
  updatePaymentStatus,
  cancelInvoice,
  getInvoiceByInvoiceId,
};
