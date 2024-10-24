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
    const request = await apiClient.post(REGISTER_ROUTE, params);
    const response = request.data.user;
    return response;
  },

  getUserInfo: async () => {
    const request = await apiClient.get(USER_INFO_ROUTE);
    const response = request.data.user;
    return response;
  },
};

export default UserApi;
