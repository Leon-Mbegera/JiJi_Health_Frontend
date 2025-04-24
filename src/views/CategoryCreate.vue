<template>
  <div class="container">
    <h1 class="page-title">Create New Category</h1>

    <CategoryForm
      @submit="handleCreateCategory"
      ref="categoryFormRef"
      class="category-form-wrapper"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CategoryForm from '@/components/CategoryForm.vue'
import api from '@/api/axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const categoryFormRef = ref(null)

const handleCreateCategory = async (formData) => {
  if (categoryFormRef.value) {
    categoryFormRef.value.error = null
  }

  try {
    const response = await api.post('/categories', { category: formData })
    console.log('Category created successfully:', response.data)
    router.push({ name: 'Categories' })
  } catch (error) {
    console.error('Category creation failed:', error)

    if (error.response && error.response.data && error.response.data.errors) {
      const errorMessages = Object.values(error.response.data.errors).flat().join(', ')
      if (categoryFormRef.value) {
        categoryFormRef.value.error = errorMessages
      }
    } else {
      if (categoryFormRef.value) {
        categoryFormRef.value.error = 'An unexpected error occurred during category creation.'
      }
    }
  }
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

.category-form-wrapper {
  max-width: 400px;
  margin: 0 auto;
}
</style>
