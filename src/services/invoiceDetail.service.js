import axios from "axios";
import configAPI from "../configuration/apiConfig.json";

const getInvoiceDetailByInvoiceId = (id) => {
  return axios
    .get(configAPI.baseUrlApi + "/api/v1/invoice-detail/" + id)
    .then((res) => {
      return res.data;
    });
};

export const InvoiceDetailService = {
  getInvoiceDetailByInvoiceId,
};
