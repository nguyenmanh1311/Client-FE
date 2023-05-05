import { axiosInstance } from "../configuration/axios.config";
import configAPI from "../configuration/apiConfig.json";

const getAllInvoice = () => {
  return axiosInstance
    .get(configAPI.baseUrlApiMain + "/invoice/my-invoice")
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

const placeOrderByPayMethodAndAddress = (data) => {
  return axiosInstance
    .post(configAPI.baseUrlApiMain + "/invoice", data)
    .then((res) => {
      return res.data;
    });
};

const placeOrderByCartIdAndAddress = (cartId, addressId) => {
  return axiosInstance
    .post(
      configAPI.baseUrlApiMain +
        `/api/v1/invoice/${cartId}/address/${addressId}`
    )
    .then((res) => {
      return res.data;
    });
};

const updatePaymentStatus = (id) => {
  return axiosInstance
    .patch(configAPI.baseUrlApiMain + "/api/v1/invoice/payment/" + id)
    .then((response) => {
      return response.data;
    });
};
const cancelInvoice = (id) => {
  return axiosInstance
    .delete(configAPI.baseUrlApiMain + "/api/v1/invoice/" + id)
    .then((response) => {
      return response.data;
    });
};

export const InvoiceService = {
  getAllInvoice,
  createInvoiceByCartId,
  placeOrderByCartIdAndAddress,
  placeOrderByPayMethodAndAddress,
  updatePaymentStatus,
  cancelInvoice,
  getInvoiceByInvoiceId,
};
