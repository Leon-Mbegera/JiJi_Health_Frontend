<template>
  <div class="container">
    <h1 class="page-title">Tasks</h1>

    <router-link :to="{ name: 'TaskCreate' }" class="create-button"> Create New Task </router-link>

    <div v-if="tasksStore.loading" class="loading-message">Loading tasks...</div>

    <div v-if="tasksStore.error" class="error-message">{{ tasksStore.error }}</div>

    <div v-if="!tasksStore.loading && tasksStore.tasks.length > 0" class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th class="table-header">Title</th>
            <th class="table-header">Status</th>
            <th class="table-header">Priority</th>
            <th class="table-header">Due Date</th>
            <th class="table-header">Category</th>
            <th class="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasksStore.tasks" :key="task.id" class="table-row">
            <td class="table-cell">{{ task.title }}</td>
            <td class="table-cell">{{ task.status }}</td>
            <td class="table-cell">{{ task.priority }}</td>
            <td class="table-cell">{{ task.due_date ? formatDate(task.due_date) : 'N/A' }}</td>
            <td class="table-cell">{{ task.category ? task.category.name : 'Uncategorized' }}</td>
            <td class="table-cell">
              <router-link
                :to="{ name: 'TaskDetail', params: { id: task.id } }"
                class="action-link view-link"
              >
                View/Edit
              </router-link>
              <button @click="deleteTask(task.id)" class="action-link delete-link">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="!tasksStore.loading && tasksStore.tasks.length === 0 && !tasksStore.error"
      class="no-data-message"
    >
      No tasks found.
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import { RouterLink } from 'vue-router'

const tasksStore = useTasksStore()

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

onMounted(() => {
  tasksStore.fetchTasks()
})

const deleteTask = async (taskId) => {
  if (confirm('Are you sure you want to delete this task?')) {
    try {
      await tasksStore.deleteTask(taskId)
      console.log('Task deleted successfully:', taskId)
      tasksStore.error = null
    } catch (error) {
      console.error('Failed to delete task:', error)
      tasksStore.error = 'Failed to delete task. Please try again.'
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

.action-link {
  text-decoration:
