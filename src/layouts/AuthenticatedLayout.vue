<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleLogout = async () => {
  try {
    console.log('Logged out successfully')
    auth.clearAuthData()
    router.push({ name: 'Login' })
  } catch (error) {
    console.error('Logout failed:', error)
    auth.clearAuthData()
    router.push({ name: 'Login' })
  }
}

router.afterEach(() => {
  isMobileMenuOpen.value = false
})
</script>

<template>
  <div class="authenticated-layout-container">
    <header class="navbar">
      <div class="navbar-content">
        <h1 class="app-title">Jiji Health</h1>
        <button class="hamburger-menu" @click="toggleMobileMenu">&#9776;</button>
        <div class="desktop-nav">
          <button @click="handleLogout" class="logout-button">Logout</button>
        </div>
      </div>
    </header>

    <nav :class="['mobile-nav', { 'mobile-nav-open': isMobileMenuOpen }]">
      <RouterLink to="/dashboard" class="mobile-nav-link">Dashboard</RouterLink>
      <RouterLink to="/tasks" class="mobile-nav-link">Tasks</RouterLink>
      <RouterLink to="/categories" class="mobile-nav-link">Categories</RouterLink>
      <RouterLink to="/profile" class="mobile-nav-link">Profile</RouterLink>
      <button @click="handleLogout" class="mobile-logout-button">Logout</button>
    </nav>

    <div class="main-content-area">
      <aside class="sidebar">
        <h2 class="sidebar-title">Navigation</h2>
        <nav class="sidebar-nav">
          <RouterLink to="/dashboard" class="sidebar-nav-link">Dashboard</RouterLink>
          <RouterLink to="/tasks" class="sidebar-nav-link">Tasks</RouterLink>
          <RouterLink to="/categories" class="sidebar-nav-link">Categories</RouterLink>
          <RouterLink to="/profile" class="sidebar-nav-link">My Profile</RouterLink>
        </nav>
      </aside>

      <main class="router-view-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.authenticated-layout-container {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  height: 12%;
  background-color: #f472b6;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 1rem;
}

.navbar-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  font-size: 1.125rem;
  font-weight: bold;
}

.hamburger-menu {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: block;
}

.desktop-nav {
  display: none;
  align-items: center;
}

.nav-link {
  margin-left: 1rem;
  text-decoration: none;
  color: white;
}

.nav-link:hover {
  text-decoration: underline;
}

.logout-button {
  background-color: white;
  color: #f472b6;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  margin-left: 1rem;
  cursor: pointer;
  border: none;
}

.logout-button:hover {
  background-color: #f3f4f6;
}

.mobile-nav {
  background-color: #f3f4f6;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 12%;
  left: 0;
  width: 100%;
  height: 88%;
  overflow-y: auto;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  z-index: 10;
}

.mobile-nav-open {
  transform: translateX(0);
}

.mobile-nav-link {
  padding: 0.75rem 0;
  text-decoration: none;
  color: #1f2937;
  border-bottom: 1px solid #e5e7eb;
}

.mobile-nav-link:last-child {
  border-bottom: none;
}

.mobile-nav-link:hover {
  text-decoration: underline;
  background-color: #e5e7eb;
}

.mobile-logout-button {
  background-color: #f472b6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  margin-top: 1rem;
  cursor: pointer;
  border: none;
  align-self: flex-start;
}

.mobile-logout-button:hover {
  background-color: #ec4899;
}

.main-content-area {
  flex-grow: 1;
  display: flex;
  height: 88%;
}

.sidebar {
  width: 20%;
  background-color: #e5e7eb;
  overflow-y: auto;
  padding: 1rem;
  display: none;
  flex-direction: column;
}

.sidebar-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-nav-link {
  text-decoration: none;
  color: #1f2937;
}

.sidebar-nav-link:hover {
  text-decoration: underline;
}

.router-view-content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
}

@media (min-width: 768px) {
  .hamburger-menu {
    display: none;
  }

  .desktop-nav {
    display: flex;
  }

  .mobile-nav {
    display: none;
  }

  .sidebar {
    display: flex;
  }
}

.sidebar-nav-link.router-link-exact-active {
  font-weight: bold;
  color: #3b82f6;
}

.nav-link.router-link-exact-active {
  font-weight: bold;
  color: #3b82f6;
}
</style>
