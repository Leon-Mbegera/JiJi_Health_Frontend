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
import { useCategoriesStore } from '@/stores/categories' // Import categories store

// Define props to receive initial task data (for editing) and editing state
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

// Reactive state for form data, initialized with initialData prop
const formData = ref({
  title: props.initialData.title,
  description: props.initialData.description,
  // Format date string from API to 'YYYY-MM-DD' for input[type="date"]
  due_date: props.initialData.due_date
    ? new Date(props.initialData.due_date).toISOString().split('T')[0]
    : '',
  priority: props.initialData.priority,
  status: props.initialData.status,
  // Ensure category_id is a number if it exists, or empty string
  category_id: props.initialData.category_id || '',
})

// Reactive state for displaying error messages from the parent
const error = ref(null)

// Define the custom event that this component can emit
const emit = defineEmits(['submit'])

// Use the categories store to fetch categories for the dropdown
const categoriesStore = useCategoriesStore()

// Fetch categories when the component is mounted
onMounted(() => {
  // Only fetch categories if they haven't been fetched yet or if there was an error
  if (
    categoriesStore.categories.length === 0 &&
    !categoriesStore.loading &&
    !categoriesStore.error
  ) {
    categoriesStore.fetchCategories()
  }
})

// Method to handle form submission
const onSubmit = () => {
  // Clear any previous internal errors (though we rely on parent for API errors)
  // error.value = null;
  // Emit the current form data to the parent component
  emit('submit', formData.value)
}

// Watch for changes in the initialData prop. This is important for
// updating the form when using this component for editing (e.g., in TaskDetail.vue)
watch(
  () => props.initialData,
  (newData) => {
    console.log('TaskForm: initialData changed', newData) // Debug log
    formData.value.title = newData.title
    formData.value.description = newData.description
    // Format date string from API to 'YYYY-MM-DD' for input[type="date"]
    formData.value.due_date = newData.due_date
      ? new Date(newData.due_date).toISOString().split('T')[0]
      : ''
    formData.value.priority = newData.priority
    formData.value.status = newData.status
    // Ensure category_id is a number if it exists, or empty string
    formData.value.category_id = newData.category_id || ''
    console.log('TaskForm: formData updated', formData.value) // Debug log
  },
  { immediate: true },
) // 'immediate: true' ensures the watcher runs immediately on component mount

// Expose the 'error' ref so the parent component can set it
defineExpose({
  error,
})
</script>

<style scoped>
/* Component-specific styles - Adapt from CategoryForm.vue */
.task-form {
  background-color: #fff; /* bg-white */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-md */
  border-radius: 0.25rem; /* rounded */
  padding: 1.5rem; /* px-8 pt-6 pb-8 */
  margin-bottom: 1rem; /* mb-4 */
}

.form-group {
  margin-bottom: 1rem; /* mb-4 */
}

.form-label {
  display: block; /* block */
  color: #374151; /* text-gray-700 */
  font-size: 0.875rem; /* text-sm */
  font-weight: bold; /* font-bold */
  margin-bottom: 0.5rem; /* mb-2 */
}

.form-input,
.form-select {
  /* Apply similar styles to select as input */
  display: block; /* block */
  width: 100%; /* w-full */
  border-radius: 0.25rem; /* rounded-md */
  border: 1px solid #60a5fa; /* border-cyan-300 */
  padding: 0.5rem 0.75rem; /* py-2 px-3 */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
  color: #374151; /* text-gray-700 */
  line-height: 1.25; /* leading-tight */
  background-color: white; /* Ensure background is white */
}

/* Styles specific to select dropdown */
.form-select {
  appearance: none; /* Remove default select arrow */
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2C114.7L159.3%2C2.1c-5.4-5.4-14.2-5.4-19.6%2C0L5.4%2C114.7c-5.4%2C5.4-5.4%2C14.2%2C0%2C19.6l109.2%2C109.2c5.4%2C5.4%2C14.2%2C5.4%2C19.6%2C0l109.2-109.2C292.4%2C128.9%2C292.4%2C120.1%2C287%2C114.7z%22%2F%3E%3C%2Fsvg%3E'); /* Custom arrow */
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 0.65em auto;
  padding-right: 2rem; /* Add padding to prevent text overlap with arrow */
}

.form-input:focus,
.form-select:focus {
  /* Apply focus styles */
  outline: none; /* focus:outline-none */
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* focus:ring-blue-500 focus:shadow-outline */
  border-color: #3b82f6; /* focus:border-blue-500 */
}

textarea.form-input {
  min-height: 80px; /* Optional: give textarea a default height */
  resize: vertical; /* Allow vertical resizing */
}

.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between; /* flex items-center justify-between */
}

.submit-button {
  background-color: #06b6d4; /* bg-cyan-500 */
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem; /* py-2 px-4 */
  border-radius: 0.25rem; /* rounded */
  cursor: pointer; /* hover:cursor-pointer */
  border: none; /* Remove default button border */
  transition: background-color 0.3s ease; /* Smooth hover effect */
}

.submit-button:hover {
  background-color: #0891b2; /* hover:bg-cyan-600 */
}

.submit-button:focus {
  outline: none; /* focus:outline-none */
  box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.5); /* focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 */
}

.error-message {
  color: #ef4444; /* text-red-500 */
  font-size: 0.875rem; /* text-sm */
  font-style: italic; /* italic */
  margin-top: 1rem; /* mt-4 */
}

/* Styles for inline loading/error messages within form groups */
.loading-inline,
.error-inline {
  font-size: 0.75rem; /* text-xs */
  margin-top: 0.25rem; /* mt-1 */
}

.loading-inline {
  color: #6b7280; /* gray-600 */
}

.error-inline {
  color: #ef4444; /* red-500 */
}
</style>
