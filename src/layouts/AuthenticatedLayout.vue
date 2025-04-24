<template>
  <div class="w-screen min-h-screen flex flex-col">
    <div class="h-1/12 bg-rose-400 navbar flex items-center justify-between px-4 text-white">
      <h1 class="text-lg font-bold">Jiji Health</h1>
      <button
        @click="handleLogout"
        class="bg-white text-rose-500 px-3 py-1 rounded hover:bg-gray-100 mx-4 hover:cursor-pointer"
      >
        Logout
      </button>
    </div>

    <div class="flex-grow flex h-11/12">
      <div class="w-1/5 bg-gray-200 sidebar overflow-y-auto p-4">
        <h2 class="text-lg font-semibold mb-4">Navigation</h2>
        <nav class="flex flex-col space-y-2">
          <RouterLink to="/dashboard" class="hover:underline">Dashboard</RouterLink>
          <RouterLink to="/tasks" class="hover:underline">Tasks</RouterLink>
          <RouterLink to="/categories" class="hover:underline">Categories</RouterLink>
          <RouterLink to="/profile" class="hover:underline">Profile</RouterLink>
        </nav>
      </div>

      <div class="flex-grow overflow-y-auto p-4">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const handleLogout = async () => {
  await auth.logout()
  router.push('/login')
}
</script>
