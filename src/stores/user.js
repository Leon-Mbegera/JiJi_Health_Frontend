import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/api/axios';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchProfile = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get('/profile');
      console.log("profile response", response);
      user.value = response.data;
      console.log('User profile fetched successfully:', user.value);
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      error.value = 'Failed to load profile data. Please try again.';
      user.value = null;
    } finally {
      loading.value = false;
    }
  };

  const updateProfile = async (profileData) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.put('/profile', { user: profileData });
      console.log('User profile updated successfully:', response.data);
      user.value = response.data;
      loading.value = false;
      return response.data;
    } catch (err) {
      console.error('Failed to update user profile:', err);
      error.value = 'Failed to update profile. Please check the form and try again.';
      loading.value = false;
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    fetchProfile,
    updateProfile,
  };
});
