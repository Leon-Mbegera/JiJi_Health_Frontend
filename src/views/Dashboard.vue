<template>
  <div class="container">
    <h1 class="page-title">Dashboard</h1>

    <div v-if="dashboardStore.loading" class="loading-message">Loading dashboard stats...</div>
    <div v-if="dashboardStore.error" class="error-message">{{ dashboardStore.error }}</div>

    <div v-if="dashboardStore.stats && !dashboardStore.loading" class="dashboard-stats">
      <div class="stat-card">
        <h2 class="stat-title">Tasks by Status</h2>
        <ul class="stat-list">
          <template
            v-if="
              dashboardStore.stats.tasks_by_status &&
              Object.keys(dashboardStore.stats.tasks_by_status).length > 0
            "
          >
            <li
              v-for="(count, status) in dashboardStore.stats.tasks_by_status"
              :key="status"
              class="stat-item"
            >
              <span class="stat-label">{{ formatStatus(status) }}:</span>
              <span class="stat-value">{{ count }}</span>
            </li>
          </template>
          <li v-else class="stat-item no-data">No tasks by status data available.</li>
        </ul>
      </div>

      <div class="stat-card">
        <h2 class="stat-title">Tasks by Priority</h2>
        <ul class="stat-list">
          <template
            v-if="
              dashboardStore.stats.tasks_by_priority &&
              Object.keys(dashboardStore.stats.tasks_by_priority).length > 0
            "
          >
            <li
              v-for="(count, priority) in dashboardStore.stats.tasks_by_priority"
              :key="priority"
              class="stat-item"
            >
              <span class="stat-label">{{ formatPriority(priority) }}:</span>
              <span class="stat-value">{{ count }}</span>
            </li>
          </template>
          <li v-else class="stat-item no-data">No tasks by priority data available.</li>
        </ul>
      </div>

      <div class="stat-card">
        <h2 class="stat-title">Tasks by Category</h2>
        <ul class="stat-list">
          <template
            v-if="
              dashboardStore.stats.tasks_by_category &&
              Object.keys(dashboardStore.stats.tasks_by_category).length > 0
            "
          >
            <li
              v-for="(count, categoryName) in dashboardStore.stats.tasks_by_category"
              :key="categoryName"
              class="stat-item"
            >
              <span class="stat-label">{{ categoryName }}:</span>
              <span class="stat-value">{{ count }}</span>
            </li>
          </template>
          <li v-else class="stat-item no-data">No tasks by category data available.</li>
        </ul>
      </div>
    </div>

    <div
      v-if="!dashboardStore.stats && !dashboardStore.loading && !dashboardStore.error"
      class="no-data-message"
    >
      Dashboard data not available.
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const dashboardStore = useDashboardStore()

const formatStatus = (status) => {
  if (!status) return 'N/A'
  return status.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

const formatPriority = (priority) => {
  if (!priority) return 'N/A'
  return priority.charAt(0).toUpperCase() + priority.slice(1)
}

onMounted(() => {
  if (!dashboardStore.stats && !dashboardStore.loading) {
    dashboardStore.fetchDashboardStats()
  }
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
  margin-top: 1rem;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.stat-title {
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.stat-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px dashed #e5e7eb;
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-label {
  font-weight: 600;
  color: #4b5563;
}

.stat-value {
  font-weight: bold;
  color: #1f2937;
}

.stat-item.no-data {
  font-style: italic;
  color: #6b7280;
  justify-content: center;
  border-bottom: none;
}
</style>
