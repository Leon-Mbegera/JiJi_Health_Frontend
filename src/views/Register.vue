<template>
  <div class="max-w-md mx-auto mt-20 p-4 border rounded shadow">
    <h1 class="text-xl font-bold mb-4">Sign Up</h1>
    <form @submit.prevent="handleSignup">
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
      <div class="flex flex-col space-y-4">
        <button class="bg-cyan-500 text-white px-3 py-2 hover:cursor-pointer mb-2">Signup</button>
        <div>Or</div>
        <RouterLink to="/login">Already have an account ?</RouterLink>
      </div>
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
const auth = useAuthStore()
const router = useRouter()

const handleSignup = async () => {
  try {
    await auth.signup(
      firstName.value,
      lastName.value,
      email.value,
      password.value,
      passwordConfirmation.value,
    )
    router.push('/dashboard')
  } catch (err) {
    alert('Signup failed')
  }
}
</script>
