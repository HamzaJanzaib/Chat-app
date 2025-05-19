import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const loginUser = async (credentials ) => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify(credentials),
    });

    return data;
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
};