<template>
  <div class="w-screen h-screen">
    <div class="h-1/12 bg-rose-400 navbar flex items-center justify-between px-4 text-white">
      <h1 class="text-lg font-bold">Jiji Health</h1>
      <button
        @click="handleLogout"
        class="bg-white text-rose-500 px-3 py-1 rounded hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
    <div class="h-11/12 overflow-y-auto">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const handleLogout = async () => {
  await auth.logout()
  router.push('/login')
}
</script>
