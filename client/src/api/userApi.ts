import { LOGIN_ROUTE, REGISTER_ROUTE } from "@/utils/constant";
import apiClient from "./axoisClient";

const UserApi = {
  login: async (params) => {
    await apiClient
      .post(LOGIN_ROUTE, params)
      .then((res) => {
        return res.data.user;
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
  register: async (params) => {
    await apiClient
      .post(REGISTER_ROUTE, params)
      .then((res) => {
        return res.data.user;
      })
      .catch((err) => {
        console.log("err", err);
      });
  },
};

export default UserApi;
