import { createRouter, createWebHistory } from 'vue-router'
import Signup from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import Tasks from '@/views/Tasks.vue'
import Categories from '@/views/Categories.vue'
import { useAuthStore } from '@/stores/auth'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    redirect: () => {
      const auth = useAuthStore()
      const isAuthenticated = !!auth.token
      if (isAuthenticated) {
        return { name: 'Dashboard' }
      } else {
        return { name: 'Login' }
      }
    },
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: AuthenticatedLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'tasks',
        name: 'Tasks',
        component: Tasks,
      },
      {
        path: 'categories',
        name: 'Categories',
        component: Categories,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  const isAuthenticated = !!auth.token

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else if (!to.meta.requiresAuth && isAuthenticated) {
    if (to.name === 'Login' || to.name === 'Signup') {
       next({ name: 'Dashboard' })
    } else {
       next()
    }
  } else {
    next()
  }
})

export default router
