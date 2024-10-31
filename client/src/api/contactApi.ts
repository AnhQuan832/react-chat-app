import { GET_CONTACTS_ROUTE } from "@/utils/constant";
import apiClient from "./axoisClient";

const contactApi = {
  getContacts: async (params?) => {
    return await apiClient.get(GET_CONTACTS_ROUTE, params);
  },
};

export default contactApi;
