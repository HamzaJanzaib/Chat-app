import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';



export const checkAuth = async ( token) => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.CHECK_AUTH, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include', // important for sending/receiving cookies
    });

    return data;
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
};