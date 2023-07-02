import axios from "axios";
import configAPI from "../configuration/apiConfig.json";
import { axiosInstance } from "../configuration/axios.config";

const getAllPosts = () => {
  return axiosInstance.get(configAPI.baseUrlApiMain + "/posts").then((res) => {
    return res.data;
  });
};

const getPostsDetailById = (id) => {
  return axiosInstance
    .get(configAPI.baseUrlApiMain + "/posts/" + id)
    .then((res) => {
      return res.data;
    });
};

export const PostService = {
  getPostsDetailById,
  getAllPosts,
};
