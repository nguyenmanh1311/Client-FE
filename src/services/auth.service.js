import axios from "axios";
import configAPI from "../configuration/apiConfig.json";
import Swal from "sweetalert2";
import jwt from "jwt-decode";
import { axiosInstance } from "../configuration/axios.config";

const login = (username, password) => {
  const data = { username, password };
  return axios
    .post(configAPI.baseUrlApiAuth + "/auth/sign-in", data)
    .then((response) => {
      const user = jwt(response.data.data.access_token);

      if (response.data.status_code === 200) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.data.access_token)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(response.data.data.refresh_token)
        );
        localStorage.setItem(
          "Fullname",
          JSON.stringify(response.data.data.fullname)
        );

        if (user.role !== "99") {
          localStorage.clear();
          Swal.fire(
            "Thông báo",
            "Số điện thoại hoặc mật khẩu không đúng",
            "error"
          );
        }
      }
    })
    .catch(() => {
      Swal.fire(
        "Thông báo",
        "Số điện thoại đăng ký hoặc mật chưa đúng",
        "error"
      );
    });
};

const logout = () => {
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  const data = {
    refresh_token: refreshToken,
  };
  return axiosInstance.patch(configAPI.baseUrlApiAuth + "/auth/sign-out", data);
};

const register = (phone_number, email, password, fullname) => {
  const data = { phone_number, email, password, fullname };
  return axios
    .post(configAPI.baseUrlApiAuth + "/auth/sign-up", data)
    .then((response) => {
      if (response.data.status_code === 201) {
        Swal.fire("Đăng ký thành công", "Thông báo", "success");
      }
      if (response.data.status_code === 409) {
        Swal.fire(response.data.message, "Thông báo", "error");
      }
    })
    .catch(() => {
      Swal.fire("Email không đúng định dạng", "Thông báo", "error");
    });
};

const changePassword = (old_Password, password) => {
  const data = { old_Password, password };
  return axiosInstance.patch(
    configAPI.baseUrlApiAuth + "/auth/change-password",
    data
  );
};

const resetPassword = (phone) => {
  const data = {
    username: phone,
  };
  return axios.post(configAPI.baseUrlApiAuth + "/auth/reset-password", data);
};

const confirmPassword = (data) => {
  return axios.post(
    configAPI.baseUrlApiAuth + "/auth/confirm-new-password",
    data
  );
};

const getProfile = () => {
  return axiosInstance
    .get(configAPI.baseUrlApiAuth + "/auth/profile")
    .then((res) => {
      return res.data;
    });
};

const updateProfile = (input) => {
  return axiosInstance
    .patch(
      configAPI.baseUrlApiAuth + "/auth/update-profile/update-profile",
      input
    )
    .then((res) => {
      return res.data;
    });
};

export const AuthService = {
  login,
  logout,
  register,
  changePassword,
  resetPassword,
  confirmPassword,
  getProfile,
  updateProfile,
};
