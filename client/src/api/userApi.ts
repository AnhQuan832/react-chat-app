import { LOGIN_ROUTE, REGISTER_ROUTE, USER_INFO_ROUTE } from "@/utils/constant";
import apiClient from "./axoisClient";
import { User } from "@/utils/User";

const UserApi = {
  login: async (params) => {
    const request = await apiClient.post(LOGIN_ROUTE, params);
    const response = request.data.user;
    return new User(response);
  },
  register: async (params) => {
    await apiClient.post(REGISTER_ROUTE, params);
  },

  getUserInfo: async (params) => {
    await apiClient.get(USER_INFO_ROUTE, {
      headers: { Authorization: `Bearer ${params.token}` },
    });
  },
};

export default UserApi;
