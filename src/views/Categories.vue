<template>
  <div class="container">
    <h1 class="page-title">Categories</h1>

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

const categoriesStore = useCategoriesStore()

onMounted(() => {
  categoriesStore.fetchCategories()
})
</script>
