import axios from "axios";
import configAPI from "../configuration/apiConfig.json";
import { axiosInstance } from "../configuration/axios.config";

const createPayment = (data = {}) => {
  return axiosInstance
    .post(configAPI.baseUrlMain + "/api/v1/payment/momo", data)
    .then((response) => {
      return response.data;
    });
};

export const PaymentService = {
  createPayment,
};
