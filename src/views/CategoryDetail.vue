<template>
  <div class="container">
    <h1 class="page-title">
      {{ category ? `Edit Category: ${category.name}` : 'Category Details' }}
    </h1>

    <div v-if="loading" class="loading-message">Loading category...</div>

    <div v-if="error" class="error-message">{{ error }}</div>

    <div v-if="category && !loading">
      <CategoryForm
        :initialData="category"
        :isEditing="true"
        @submit="handleUpdateCategory"
        ref="categoryFormRef"
        class="category-form-wrapper"
      />
      <div v-if="updateSuccess" class="success-message">Category updated successfully!</div>
    </div>

    <div v-if="!category && !loading && !error" class="no-data-message">Category not found.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/axios'
import CategoryForm from '@/components/CategoryForm.vue'

const route = useRoute()
const router = useRouter()
const category = ref(null)
const loading = ref(true)
const error = ref(null)
const updateSuccess = ref(false)
const categoryFormRef = ref(null)

const fetchCategory = async () => {
  loading.value = true
  error.value = null

  const categoryId = route.params.id

  try {
    const response = await api.get(`/categories/${categoryId}`)
    category.value = response.data.category
  } catch (err) {
    console.error('Failed to fetch category:', err)
    error.value = 'Failed to load category. Please try again or the category might not exist.'
    category.value = null
  } finally {
    loading.value = false
  }
}

const handleUpdateCategory = async (formData) => {
  updateSuccess.value = false
  if (categoryFormRef.value) {
    categoryFormRef.value.error = null
  }

  const categoryId = route.params.id

  try {
    const response = await api.put(`/categories/${categoryId}`, { category: formData })
    category.value = response.data.category
    updateSuccess.value = true
  } catch (error) {
    console.error('Category update failed:', error)
    if (error.response && error.response.data && error.response.data) {
      const backendErrors = error.response.data
      let errorMessages = ''

      for (const field in backendErrors) {
        if (backendErrors.hasOwnProperty(field)) {
          const messages = backendErrors[field].join(', ')
          errorMessages += `${field.replace('_', ' ')} ${messages}. `
        }
      }

      if (categoryFormRef.value) {
        categoryFormRef.value.error = errorMessages.trim()
      }
    } else {
      if (categoryFormRef.value) {
        categoryFormRef.value.error = 'An unexpected error occurred during task creation.'
      }
    }
  }
}

onMounted(() => {
  fetchCategory()
})
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

.loading-message,
.no-data-message {
  text-align: center;
  color: #6b7280;
}

.error-message {
  text-align: center;
  color: #ef4444;
}

.success-message {
  text-align: center;
  color: #10b981;
  margin-top: 1rem;
  font-weight: bold;
}

.category-form-wrapper {
  max-width: 400px;
  margin: 0 auto;
}
</style>
