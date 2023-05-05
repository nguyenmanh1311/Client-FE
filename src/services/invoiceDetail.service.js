import axios from "axios";
import configAPI from "../configuration/apiConfig.json";
import { axiosInstance } from "../configuration/axios.config";

const getInvoiceDetailByInvoiceId = (id) => {
  return axiosInstance
    .get(configAPI.baseUrlApiMain + "/invoice/" + id)
    .then((res) => {
      return res.data;
    });
};

export const InvoiceDetailService = {
  getInvoiceDetailByInvoiceId,
};
