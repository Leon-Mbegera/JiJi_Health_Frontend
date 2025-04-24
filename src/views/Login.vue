<template>
  <div class="max-w-md mx-auto mt-20 p-4">
    <h1 class="text-xl font-bold mb-4">Login</h1>
    <form @submit.prevent="handleLogin" class="p-4 border rounded shadow">
      <div class="form-container input-fields space-y-3">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="block w-full rounded-md border border-cyan-300 py-2 px-3 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="block w-full rounded-md border border-cyan-300 py-2 px-3 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div class="flex flex-col space-y-4 mt-4">
        <button
          type="submit"
          class="bg-cyan-500 text-white px-3 py-2 rounded hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 hover:cursor-pointer mb-2"
        >
          Login
        </button>
        <div class="text-center">Or</div>
        <RouterLink to="/signup" class="text-center text-blue-600 hover:underline"
          >Sign up here</RouterLink
        >
      </div>

      <p v-if="loginError" class="error-message mt-4">{{ loginError }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const loginError = ref(null)

const auth = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  loginError.value = null

  try {
    await auth.login(email.value, password.value)
    router.push('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)

    if (error.response && error.response.data) {
      const backendErrors = error.response.data
      let errorMessages = ''

      if (backendErrors.error) {
        errorMessages = backendErrors.error
      } else if (backendErrors.errors) {
        const validationErrors = backendErrors.errors
        for (const field in validationErrors) {
          if (validationErrors.hasOwnProperty(field)) {
            const messages = Array.isArray(validationErrors[field])
              ? validationErrors[field].join(', ')
              : validationErrors[field]
            errorMessages += `${field.replace('_', ' ')} ${messages}. `
          }
        }
      } else if (typeof backendErrors === 'string') {
        errorMessages = backendErrors
      } else {
        errorMessages = 'An error occurred during login.'
      }

      loginError.value = errorMessages.trim()
    } else {
      loginError.value = 'An unexpected error occurred during login. Please try again.'
    }
  }
}
</script>

<style scoped>
.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  font-style: italic;
  text-align: center;
}
.max-w-md {
  max-width: 28rem;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.mt-20 {
  margin-top: 5rem;
}
.p-4 {
  padding: 1rem;
}
.border {
  border-width: 1px;
}
.rounded {
  border-radius: 0.25rem;
}
.shadow {
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.font-bold {
  font-weight: 700;
}
.mb-4 {
  margin-bottom: 1rem;
}
.form-container.input-fields.space-y-3 > *:not(:last-child) {
  margin-bottom: 0.75rem;
}
.block {
  display: block;
}
.w-full {
  width: 100%;
}
.rounded-md {
  border-radius: 0.375rem;
}
.border-cyan-300 {
  border-color: #a5f3fc;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.focus\:ring-blue-500:focus {
  --tw-ring-color: #3b82f6;
  box-shadow:
    var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width))
    var(--tw-ring-color);
}
.focus\:border-blue-500:focus {
  border-color: #3b82f6;
}
.sm\:text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.space-y-4 > *:not(:last-child) {
  margin-bottom: 1rem;
}
.mt-4 {
  margin-top: 1rem;
}
.bg-cyan-500 {
  background-color: #06b6d4;
}
.text-white {
  color: #fff;
}
.hover\:bg-cyan-600:hover {
  background-color: #0891b2;
}
.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width)
    var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width))
    var(--tw-ring-color);
  box-shadow:
    var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.focus\:ring-cyan-500:focus {
  --tw-ring-color: #06b6d4;
}
.focus\:ring-opacity50:focus {
  --tw-ring-opacity: 0.5;
  --tw-ring-color: rgb(6 182 212 / var(--tw-ring-opacity));
}
.hover\:cursor-pointer:hover {
  cursor: pointer;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.text-center {
  text-align: center;
}
.text-blue-600 {
  color: #2563eb;
}
.hover\:underline:hover {
  text-decoration: underline;
}
</style>
