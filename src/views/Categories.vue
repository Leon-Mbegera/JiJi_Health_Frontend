<template>
  <div class="container">
    <h1 class="page-title">Categories</h1>

    <router-link :to="{ name: 'CategoryCreate' }" class="create-button">
      Create New Category
    </router-link>

    <div v-if="categoriesStore.loading" class="loading-message">Loading categories...</div>

    <div v-if="categoriesStore.error" class="error-message">{{ categoriesStore.error }}</div>

    <div
      v-if="!categoriesStore.loading && categoriesStore.categories.length > 0"
      class="table-container"
    >
      <table class="data-table">
        <thead>
          <tr>
            <th class="table-header">Name</th>
            <th class="table-header">Description</th>
            <th class="table-header">Color</th>
            <th class="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categoriesStore.categories" :key="category.id" class="table-row">
            <td class="table-cell">{{ category.name }}</td>
            <td class="table-cell">{{ category.description }}</td>
            <td class="table-cell">
              <span
                class="color-swatch"
                :style="{ backgroundColor: category.color }"
                :title="category.color"
              ></span>
              {{ category.color }}
            </td>
            <td class="table-cell">
              <router-link
                :to="{ name: 'CategoryDetail', params: { id: category.id } }"
                class="action-link view-link"
                >View/Edit</router-link
              >
              <button @click="deleteCategory(category.id)" class="action-link delete-link">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="
        !categoriesStore.loading &&
        categoriesStore.categories.length === 0 &&
        !categoriesStore.error
      "
      class="no-data-message"
    >
      No categories found.
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCategoriesStore } from '@/stores/categories'
import { RouterLink } from 'vue-router'

const categoriesStore = useCategoriesStore()

onMounted(() => {
  categoriesStore.fetchCategories()
})

const deleteCategory = (categoryId) => {
  console.log('Delete category:', categoryId)
}
</script>

<style scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.create-button {
  display: inline-block;
  background-color: #10b981;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.create-button:hover {
  background-color: #059669;
}

.loading-message,
.no-data-message {
  text-align: center;
  color: #6b7280;
}

.error-message {
  text-align: center;
  color: #ef4444;
}

.table-container {
  overflow-x: auto;
}

.data-table {
  min-width: 100%;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  border-collapse: collapse;
}

.table-header,
.table-cell {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
}

.table-header {
  color: #374151;
  font-weight: 600;
  background-color: #f9fafb;
}

.table-row:hover {
  background-color: #f3f4f6;
}

.data-table tbody tr:last-child .table-cell {
  border-bottom: none;
}

.color-swatch {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  vertical-align: middle;
  margin-right: 0.5rem;
}

.action-link {
  text-decoration: none;
  margin-right: 0.5rem;
  cursor: pointer;
}

.action-link:last-child {
  margin-right: 0;
}

.view-link {
  color: #3b82f6;
}

.view-link:hover {
  text-decoration: underline;
}

.delete-link {
  color: #ef4444;
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
}

.delete-link:hover {
  text-decoration: underline;
}
</style>
