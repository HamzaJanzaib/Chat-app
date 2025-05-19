export const BASE_URL = import.meta.BASE_URL || "http://localhost:8080/api";

export const API_ENDPOINTS = {
  // AUTH APIS
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  UPDATEPROFILE: "/auth/update-user",
  CHECK_AUTH: "/auth/check-auth",

  // MESSAGE APIS
  GETALLUSERMESSAGES: "/message/Users",
  GETALLSINGLEUSERMESSAGES: (id) => `/message/${id}`,
  MARKMESSAGEASSEEN: (id) => `/message/mark/${id}`,
  SENDMESSAGE: (id) => `/message/send/${id}`,
};