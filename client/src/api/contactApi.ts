import { GET_CONTACTS_ROUTE, GET_MESSAGES_ROUTE } from "@/utils/constant";
import apiClient from "./axoisClient";

const contactApi = {
  getContacts: async (params?) => {
    return await apiClient.get(GET_CONTACTS_ROUTE, params);
  },
  getMessages: async (params) => {
    return await apiClient.get(`${GET_MESSAGES_ROUTE}/${params}`);
  },
};

export default contactApi;
