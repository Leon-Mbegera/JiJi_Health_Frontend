<template>
  <form @submit.prevent="onSubmit" class="category-form">
    <div class="form-group">
      <label for="name" class="form-label">Name:</label>
      <input id="name" type="text" v-model="formData.name" class="form-input" />
    </div>

    <div class="form-group">
      <label for="description" class="form-label">Description:</label>
      <textarea id="description" v-model="formData.description" class="form-input"></textarea>
    </div>

    <div class="form-group">
      <label for="color" class="form-label">Color:</label>
      <select id="color" v-model="formData.color" class="form-select">
        <option value="">Select a color</option>
        <option v-for="color in availableColors" :key="color" :value="color">
          {{ color }}
        </option>
      </select>
    </div>

    <div class="form-actions">
      <button type="submit" class="submit-button">
        {{ isEditing ? 'Update Category' : 'Create Category' }}
      </button>
    </div>

    <p v-if="error" class="error-message">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({ name: '', description: '', color: '' }),
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
})

const formData = ref({
  name: props.initialData.name,
  description: props.initialData.description,
  color: props.initialData.color,
})

const error = ref(null)

const emit = defineEmits(['submit'])

const availableColors = ref([
  '#FF6347',
  '#4682B4',
  '#32CD32',
  '#FFD700',
  '#6A5ACD',
  '#FF69B4',
  '#00CED1',
  '#FF8C00',
  '#9370DB',
  '#ADFF2F',
])

const onSubmit = () => {
  emit('submit', formData.value)
}

watch(
  () => props.initialData,
  (newData) => {
    formData.value.name = newData.name
    formData.value.description = newData.description
    formData.value.color = newData.color
  },
  { immediate: true },
)

defineExpose({
  error,
})
</script>

<style scoped>
.category-form {
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
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2C114.7L159.3%2C2.1c-5.4-5.4-14.2-5.4-19.6%2C0L5.4%2C114.7c-5.4%2C5.4-5.4%2C14.2%2C0%2C19.6l109.2%2C109.2c5.4%2C5.4%2C14.2%2C5.4%2C19.6%2C0l109.2-109.2C292.4%2C128.9%2C292.4%2C120.1%2C287%2C114.7z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 0.65em auto;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  border-color: #3b82f6;
}

textarea.form-input {
  min-height: 80px;
  resize: vertical;
}

.form-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.submit-button {
  background-color: #06b6d4;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0891b2;
}

.submit-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.5);
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  font-style: italic;
  margin-top: 1rem;
}
</style>
