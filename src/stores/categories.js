import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/api/axios';

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchCategories = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get('/categories');
      console.log("categories response obj", response)
      categories.value = response.data.categories;
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      error.value = 'Failed to load categories. Please try again.';
    } finally {
      loading.value = false;
    }
  };

  return {
    categories,
    loading,
    error,
    fetchCategories,
  };
});
