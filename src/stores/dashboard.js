import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/api/axios';

export const useDashboardStore = defineStore('dashboard', () => {
  const stats = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchDashboardStats = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get('/dashboard');
      stats.value = response.data;
      console.log('Dashboard stats fetched successfully:', stats.value);
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
      error.value = 'Failed to load dashboard statistics. Please try again.';
      stats.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    stats,
    loading,
    error,
    fetchDashboardStats,
  };
});
