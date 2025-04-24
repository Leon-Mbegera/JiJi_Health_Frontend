<template>
  <div class="container">
    <h1 class="page-title">My Profile</h1>

    <div v-if="userStore.loading" class="loading-message">Loading profile...</div>

    <div v-if="userStore.error" class="error-message">{{ userStore.error }}</div>

    <div v-if="userStore.user && !userStore.loading">
      <form @submit.prevent="handleProfileUpdate" class="profile-form">
        <div class="form-group">
          <label for="first_name" class="form-label">First Name:</label>
          <input id="first_name" type="text" v-model="formData.first_name" class="form-input" />
        </div>

        <div class="form-group">
          <label for="last_name" class="form-label">Last Name:</label>
          <input id="last_name" type="text" v-model="formData.last_name" class="form-input" />
        </div>

        <div class="form-group">
          <label for="email" class="form-label">Email:</label>
          <input id="email" type="email" v-model="formData.email" required class="form-input" />
        </div>

        <div class="form-actions">
          <button type="submit" class="submit-button">Update Profile</button>
        </div>

        <div v-if="updateSuccess" class="success-message">Profile updated successfully!</div>

        <p v-if="formError" class="error-message">{{ formError }}</p>
      </form>
    </div>

    <div v-if="!userStore.user && !userStore.loading && !userStore.error" class="no-data-message">
      Profile data not available.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const formData = ref({
  first_name: '',
  last_name: '',
  email: '',
})

const updateSuccess = ref(false)
const formError = ref(null)

watch(
  () => userStore.user,
  (newUser) => {
    if (newUser) {
      formData.value.first_name = newUser.first_name
      formData.value.last_name = newUser.last_name
      formData.value.email = newUser.email
    }
  },
  { immediate: true },
)

const handleProfileUpdate = async () => {
  updateSuccess.value = false
  formError.value = null

  try {
    const responseData = await userStore.updateProfile(formData.value)
    updateSuccess.value = true
  } catch (error) {
    if (error.response && error.response.data) {
      const backendErrors = error.response.data
      let errorMessages = ''
      for (const field in backendErrors) {
        if (backendErrors.hasOwnProperty(field)) {
          const messages = backendErrors[field].join(', ')
          errorMessages += `${field.replace('_', ' ')} ${messages}. `
        }
      }
      formError.value = errorMessages.trim()
    } else {
      formError.value = 'An unexpected error occurred during profile update.'
    }
  }
}

onMounted(() => {
  if (!userStore.user && !userStore.loading) {
    userStore.fetchProfile()
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

.success-message {
  text-align: center;
  color: #10b981;
  margin-top: 1rem;
  font-weight: bold;
}

.profile-form {
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  padding: 1.5rem;
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

.form-input {
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

.form-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  border-color: #3b82f6;
}

.form-actions {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1.5rem;
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

.profile-form .error-message {
  margin-top: 1rem;
  text-align: left;
}
</style>
