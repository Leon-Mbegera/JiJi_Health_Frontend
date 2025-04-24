<template>
  <div class="container">
    <h1 class="page-title">{{ task ? `Edit Task: ${task.title}` : 'Task Details' }}</h1>

    <div v-if="loading" class="loading-message">Loading task...</div>

    <div v-if="error" class="error-message">{{ error }}</div>

    <div v-if="task && !loading">
      <TaskForm
        :initialData="task"
        :isEditing="true"
        @submit="handleUpdateTask"
        ref="taskFormRef"
        class="task-form-wrapper"
      />
      <div v-if="updateSuccess" class="success-message">Task updated successfully!</div>
    </div>

    <div v-if="!task && !loading && !error" class="no-data-message">Task not found.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTasksStore } from '@/stores/tasks'
import TaskForm from '@/components/TaskForm.vue'

const route = useRoute()
const router = useRouter()
const tasksStore = useTasksStore()

const task = ref(null)
const loading = ref(true)
const error = ref(null)
const updateSuccess = ref(false)
const taskFormRef = ref(null)

const fetchTask = async () => {
  loading.value = true
  error.value = null

  const taskId = route.params.id

  try {
    const responseData = await tasksStore.fetchTask(taskId)
    task.value = responseData.task
  } catch (err) {
    console.error('Failed to fetch task:', err)
    error.value = 'Failed to load task. Please try again or the task might not exist.'
    task.value = null
  } finally {
    loading.value = false
  }
}

const handleUpdateTask = async (formData) => {
  updateSuccess.value = false
  if (taskFormRef.value) {
    taskFormRef.value.error = null
  }

  const taskId = route.params.id

  try {
    const responseData = await tasksStore.updateTask(taskId, formData)
    task.value = responseData.task
    updateSuccess.value = true
  } catch (error) {
    if (error.response && error.response.data && error.response.data) {
      const backendErrors = error.response.data
      let errorMessages = ''
      for (const field in backendErrors) {
        if (backendErrors.hasOwnProperty(field)) {
          const messages = backendErrors[field].join(', ')
          errorMessages += `${field.replace('_', ' ')} ${messages}. `
        }
      }
      if (taskFormRef.value) {
        taskFormRef.value.error = errorMessages.trim()
      }
    } else {
      if (taskFormRef.value) {
        taskFormRef.value.error = 'An unexpected error occurred during task creation.'
      }
    }
  }
}

onMounted(() => {
  fetchTask()
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

.task-form-wrapper {
  max-width: 400px;
  margin: 0 auto;
}
</style>
