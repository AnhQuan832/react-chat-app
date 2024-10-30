import {
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  REGISTER_ROUTE,
  USER_INFO_ROUTE,
} from "@/utils/constant";
import apiClient from "./axoisClient";

const UserApi = {
  login: async (params) => {
    return await apiClient.post(LOGIN_ROUTE, params);
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

  logout: async () => {
    return await apiClient.post(LOGOUT_ROUTE);
  },
};

export default UserApi;
