<template>
  <div class="max-w-md mx-auto mt-20 p-4">
    <h1 class="text-xl font-bold mb-4">Sign Up</h1>
    <form @submit.prevent="handleSignup" class="p-4 border rounded shadow">
      <div class="form-container input-fields space-y-3">
        <input
          v-model="firstName"
          type="text"
          placeholder="First Name"
          class="block w-full rounded-md border border-cyan-300 py-2 px-3 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <input
          v-model="lastName"
          type="text"
          placeholder="Last Name"
          class="block w-full rounded-md border border-cyan-300 py-2 px-3 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
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
        <input
          v-model="passwordConfirmation"
          type="password"
          placeholder="Confirm Password"
          class="block w-full rounded-md border border-cyan-300 py-2 px-3 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div class="flex flex-col space-y-4 mt-4">
        <button
          type="submit"
          class="bg-cyan-500 text-white px-3 py-2 rounded hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 hover:cursor-pointer mb-2"
        >
          Signup
        </button>
        <div class="text-center">Or</div>
        <RouterLink to="/login" class="text-center text-blue-600 hover:underline"
          >Already have an account ?</RouterLink
        >
      </div>

      <p v-if="signupError" class="error-message mt-4">{{ signupError }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const signupError = ref(null)

const auth = useAuthStore()
const router = useRouter()

const handleSignup = async () => {
  signupError.value = null

  try {
    await auth.signup(
      firstName.value,
      lastName.value,
      email.value,
      password.value,
      passwordConfirmation.value,
    )
    router.push('/dashboard')
  } catch (error) {
    console.error('Signup failed:', error)

    if (error.response && error.response.data) {
      const backendErrors = error.response.data
      let errorMessages = ''

      if (backendErrors.errors) {
        const validationErrors = backendErrors.errors
        for (const field in validationErrors) {
          if (validationErrors.hasOwnProperty(field)) {
            const messages = validationErrors[field].join(', ')
            errorMessages += `${field.replace('_', ' ')} ${messages}. `
          }
        }
      } else if (typeof backendErrors === 'object') {
        for (const field in backendErrors) {
          if (backendErrors.hasOwnProperty(field)) {
            const messages = Array.isArray(backendErrors[field])
              ? backendErrors[field].join(', ')
              : backendErrors[field]
            errorMessages += `${field.replace('_', ' ')} ${messages}. `
          }
        }
      } else {
        errorMessages = 'An error occurred during signup.'
      }

      signupError.value = errorMessages.trim()
    } else {
      signupError.value = 'An unexpected error occurred during signup. Please try again.'
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
</style>
