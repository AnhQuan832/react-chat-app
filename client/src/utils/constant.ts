export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTE = "/api/auth";
export const USER_ROUTE = "/api/user";

export const REGISTER_ROUTE = `${AUTH_ROUTE}/resgister`;
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const USER_INFO_ROUTE = `${AUTH_ROUTE}/user-info`;
export const LOGOUT_ROUTE = `${AUTH_ROUTE}/logout`;
