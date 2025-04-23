<template>
  <div class="max-w-md mx-auto mt-20 p-4 border rounded shadow">
    <h1 class="text-xl font-bold mb-4">Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" class="input mb-2 w-full" />
      <input v-model="password" type="password" placeholder="Password" class="input mb-2 w-full" />
      <button class="btn w-full">Login</button>
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
