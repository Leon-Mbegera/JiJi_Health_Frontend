// src/stores/categories.js
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
      console.log("categories response obj", response);
      categories.value = response.data.categories;
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      error.value = 'Failed to load categories. Please try again.';
      categories.value = [];
    } finally {
      loading.value = false;
    }
  };

  const createCategory = async (categoryData) => {
    try {
      const response = await api.post('/categories', { category: categoryData });
      console.log('Category created successfully:', response.data);
      return response.data;
    } catch (err) {
      console.error('Failed to create category:', err);
      throw err;
    }
  };

  const fetchCategory = async (categoryId) => {
    try {
      const response = await api.get(`/categories/${categoryId}`);
      console.log('Category fetched successfully:', response.data);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch category:', err);
      throw err;
    }
  };

  const updateCategory = async (categoryId, categoryData) => {
    try {
      const response = await api.put(`/categories/${categoryId}`, { category: categoryData });
      console.log('Category updated successfully:', response.data);
      const index = categories.value.findIndex(cat => cat.id === categoryId);
      if (index !== -1) {
        categories.value[index] = response.data;
      }
      return response.data;
    } catch (err) {
      console.error('Failed to update category:', err);
      throw err;
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await api.delete(`/categories/${categoryId}`);
      console.log('Category deleted successfully:', categoryId);
      categories.value = categories.value.filter(cat => cat.id !== categoryId);
    } catch (err) {
      console.error('Failed to delete category:', err);
      throw err;
    }
  };

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    fetchCategory,
    updateCategory,
    deleteCategory,
  };
});
