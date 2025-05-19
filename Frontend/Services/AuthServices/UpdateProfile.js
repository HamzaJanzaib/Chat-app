import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const updateProfile = async (credentials , token) => {
  try {
    const data = await fetchUtil(API_ENDPOINTS.UPDATEPROFILE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include', 
      body: JSON.stringify(credentials),
    });

    return data;
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
};