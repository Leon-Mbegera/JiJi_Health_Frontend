<template>
  <div class="container">
    <h1 class="page-title">Create New Task</h1>
    <TaskForm @submit="handleCreateTask" ref="taskFormRef" class="task-form-wrapper" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TaskForm from '@/components/TaskForm.vue'
import { useTasksStore } from '@/stores/tasks'
import { useRouter } from 'vue-router'

const router = useRouter()
const tasksStore = useTasksStore()
const taskFormRef = ref(null)

const handleCreateTask = async (formData) => {
  if (taskFormRef.value) {
    taskFormRef.value.error = null
  }

  try {
    const response = await tasksStore.createTask(formData)
    console.log('Task created successfully:', response)
    router.push({ name: 'Tasks' })
  } catch (error) {
    console.error('Task creation failed:', error.response.data)

    if (error.response && error.response.data) {
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

.task-form-wrapper {
  max-width: 400px;
  margin: 0 auto;
}
</style>
