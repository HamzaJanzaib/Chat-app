// src/utils/fetchUtil.js
import { BASE_URL } from "../config/config";

const fetchUtil = async (url, options = {}) => {
  const fullUrl = `${BASE_URL}${url}`;
  console.log(fullUrl);
  try {
    const response = await fetch(fullUrl, options);
    if (!response.ok) {
      if (response.status === 0) {
        throw new Error("ERR_CONNECTION_REFUSED");
      }
      const data = await response.json();
      throw new Error(data.message || "Request failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message === "ERR_CONNECTION_REFUSED") {
      console.error("Connection refused. Please check if the server is running.");
    }
    throw new Error(error.message || "Network error");
  }
};

export default fetchUtil;