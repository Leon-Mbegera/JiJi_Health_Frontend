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
import { useCategoriesStore } from '@/stores/categories'
import { useRouter } from 'vue-router'

const router = useRouter()
const categoriesStore = useCategoriesStore()
const categoryFormRef = ref(null)

const handleCreateCategory = async (formData) => {
  if (categoryFormRef.value) {
    categoryFormRef.value.error = null
  }

  try {
    const response = await categoriesStore.createCategory(formData)
    console.log('Category created successfully:', response)
    router.push({ name: 'Categories' })
  } catch (error) {
    console.error('Category creation failed:', error)

    if (error.response && error.response.data) {
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
