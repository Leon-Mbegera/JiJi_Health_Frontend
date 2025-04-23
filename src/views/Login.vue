<template>
  <div class="max-w-md mx-auto mt-20 p-4 border rounded shadow">
    <h1 class="text-xl font-bold mb-4">Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-container input-fields">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="input-fields *:block w-full rounded-md border border-cyan-300 py-2 px-3 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="input-fields block w-full rounded-md border border-cyan-300 py-2 px-3 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <button class="bg-cyan-500 text-white px-3 py-2 hover:cursor-pointer">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  try {
    await auth.login(email.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    alert('Login failed')
  }
}
</script>
