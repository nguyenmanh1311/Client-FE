import axios from "axios";
import configAPI from "../configuration/apiConfig.json";

const createPayment = (data = {}) => {
  return axios
    .post(`${configAPI.baseUrlApi}/api/v1/payment/momo`, data)
    .then((response) => {
      return response.data;
    });
};

export const PaymentService = {
  createPayment,
};
