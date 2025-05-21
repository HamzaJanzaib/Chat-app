import fetchUtil from '../../utils/fetchUtil';
import { API_ENDPOINTS } from '../../config/config';

export const updateProfile = async (credentials, token) => {
  console.log(credentials)
  try {
    const data = await fetchUtil(API_ENDPOINTS.UPDATEPROFILE, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    return data;
  } catch (error) {
    throw new Error('Update profile failed: ' + error.message);
  }
};