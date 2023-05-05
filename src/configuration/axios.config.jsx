import axios from "axios";
const axiosInstance = axios.create({
  // headers: {
  //   "Content-Type": "application/json",
  // },
  // withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (req) {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { axiosInstance };
