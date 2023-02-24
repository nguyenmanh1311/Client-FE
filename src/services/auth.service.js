import axios from "axios";
import configAPI from "../configuration/apiConfig.json";
import { AddressService } from "./address.service";
import Swal from "sweetalert2";

const login = (username, password) => {
  const data = { phone: username, password };
  return axios
    .post(configAPI.baseUrlApi + "/api/v1/auth/login", data)
    .then((response) => {
      try {
        if (response.data.data.accessToken) {
          localStorage.setItem("userId", JSON.stringify(response.data.data.id));
          localStorage.setItem(
            "accessToken",
            JSON.stringify(response.data.data.accessToken)
          );
          AddressService.getAddressByUserID(response.data.data.id).then(
            (res) => {
              localStorage.setItem(
                "idAddress",
                JSON.stringify(response.data.data?.id)
              );
            }
          );
        } else {
          Swal.fire(
            "Số điện thoại hoặc mật khẩu không đúng",
            "Thông báo",
            "error"
          );
        }
      } catch {
      } finally {
        return response.data;
      }
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const register = (phone, password, confirmPassword, email) => {
  const data = { phone, password, confirmPassword, email };
  return axios
    .post(configAPI.baseUrlApi + "/api/v1/auth/register", data)
    .then((res) => {
      return res.data;
    });
};

const changePassword = (userId, oldPassword, newPassword) => {
  const data = { userId, oldPassword, newPassword };
  return axios
    .post(configAPI.baseUrlApi + "/api/v1/auth/change-password", data)
    .then((res) => {
      return res.data;
    });
};

export const AuthService = {
  login,
  logout,
  register,
  changePassword,
};
