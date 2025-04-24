<template>
  <form @submit.prevent="onSubmit" class="task-form">
    <div class="form-group">
      <label for="title" class="form-label">Title:</label>
      <input id="title" type="text" v-model="formData.title" class="form-input" />
    </div>

    <div class="form-group">
      <label for="description" class="form-label">Description:</label>
      <textarea id="description" v-model="formData.description" class="form-input"></textarea>
    </div>

    <div class="form-group">
      <label for="due_date" class="form-label">Due Date:</label>
      <input id="due_date" type="date" v-model="formData.due_date" class="form-input" />
    </div>

    <div class="form-group">
      <label for="priority" class="form-label">Priority:</label>
      <select id="priority" v-model="formData.priority" required class="form-select">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>

    <div class="form-group">
      <label for="status" class="form-label">Status:</label>
      <select id="status" v-model="formData.status" required class="form-select">
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <div class="form-group">
      <label for="category_id" class="form-label">Category:</label>
      <select id="category_id" v-model="formData.category_id" class="form-select">
        <option value="">Select a Category</option>
        <option
          v-for="category in categoriesStore.categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      <div v-if="categoriesStore.loading" class="loading-inline">Loading categories...</div>
      <div v-if="categoriesStore.error" class="error-inline">Failed to load categories.</div>
    </div>

    <div class="form-actions">
      <button type="submit" class="submit-button">
        {{ isEditing ? 'Update Task' : 'Create Task' }}
      </button>
    </div>

    <p v-if="error" class="error-message">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useCategoriesStore } from '@/stores/categories'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
      due_date: '',
      priority: 'low',
      status: 'pending',
      category_id: '',
    }),
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const formData = ref({
  title: props.initialData.title,
  description: props.initialData.description,
  due_date: props.initialData.due_date
    ? new Date(props.initialData.due_date).toISOString().split('T')[0]
    : '',
  priority: props.initialData.priority,
  status: props.initialData.status,
  category_id: props.initialData.category_id || '',
})

const error = ref(null)

const emit = defineEmits(['submit'])

const categoriesStore = useCategoriesStore()

onMounted(() => {
  if (
    categoriesStore.categories.length === 0 &&
    !categoriesStore.loading &&
    !categoriesStore.error
  ) {
    categoriesStore.fetchCategories()
  }
})

const onSubmit = () => {
  emit('submit', formData.value)
}

watch(
  () => props.initialData,
  (newData) => {
    formData.value.title = newData.title
    formData.value.description = newData.description
    formData.value.due_date = newData.due_date
      ? new Date(newData.due_date).toISOString().split('T')[0]
      : ''
    formData.value.priority = newData.priority
    formData.value.status = newData.status
    formData.value.category_id = newData.category_id || ''
  },
  { immediate: true },
)

defineExpose({
  error,
})
</script>

<style scoped>
.task-form {
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  color: #374151;
  font-size: 0.875rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-input,
.form-select {
  display: block;
  width: 100%;
  border-radius: 0.25rem;
  border: 1px solid #60a5fa;
  padding: 0.5rem 0.75rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  color: #374151;
  line-height: 1.25;
  background-color: white;
}

.form-select {
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2C114.7L159.3%2C2.1c-5.4-5.4-14.2-5.4-19.6%2C0L5.4%2C114.7c-5.4%2C5.4-5.4%2C14.2%2C0%2C19.6l109.2%2C109.2c5.4%2C5.4%2C14.2%2C5.4%2C19.6%2C0l109.2-109.2C292.4%2C128.9%2C292.4%2C120.1%2C287%2C114.7z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 0.65em auto;
  padding-right: 2rem;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 1px #2563eb;
}
</style>
