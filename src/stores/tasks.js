import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/api/axios';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchTasks = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get('/tasks');
      tasks.value = response.data.tasks;
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      error.value = 'Failed to load tasks. Please try again.';
      tasks.value = [];
    } finally {
      loading.value = false;
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await api.post('/tasks', { task: taskData });
      console.log('Task created successfully:', response.data);
      return response.data;
    } catch (err) {
      console.error('Failed to create task:', err);
      throw err;
    }
  };

  const fetchTask = async (taskId) => {
    try {
      const response = await api.get(`/tasks/${taskId}`);
      console.log('Task fetched successfully:', response.data);
      return response.data;
    } catch (err) {
      console.error('Failed to fetch task:', err);
      throw err;
    }
  };

  const updateTask = async (taskId, taskData) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, { task: taskData });
      console.log('Task updated successfully:', response.data);
      const index = tasks.value.findIndex(task => task.id === taskId);
      if (index !== -1) {
        tasks.value[index] = response.data;
      }
      return response.data;
    } catch (err) {
      console.error('Failed to update task:', err);
      throw err;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      console.log('Task deleted successfully:', taskId);
      tasks.value = tasks.value.filter(task => task.id !== taskId);
    } catch (err) {
      console.error('Failed to delete task:', err);
      throw err;
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    fetchTask,
    updateTask,
    deleteTask,
  };
});
