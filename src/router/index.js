import { createRouter, createWebHistory } from 'vue-router'
import Signup from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import Tasks from '@/views/Tasks.vue'
import TaskCreate from '@/views/TaskCreate.vue'
import TaskDetail from '@/views/TaskDetail.vue'
import Categories from '@/views/Categories.vue'
import CategoryCreate from '@/views/CategoryCreate.vue'
import CategoryDetail from '@/views/CategoryDetail.vue'
import Profile from '@/views/Profile.vue'
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
    redirect: (to) => {
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
        children: [
          {
            path: '',
            name: 'Tasks',
            component: Tasks,
          },
          {
            path: 'new',
            name: 'TaskCreate',
            component: TaskCreate,
          },
          {
            path: ':id',
            name: 'TaskDetail',
            component: TaskDetail,
            props: true,
          },
        ]
      },
      {
        path: 'categories',
        children: [
          {
            path: '',
            name: 'Categories',
            component: Categories,
          },
          {
            path: 'new',
            name: 'CategoryCreate',
            component: CategoryCreate,
          },
          {
            path: ':id',
            name: 'CategoryDetail',
            component: CategoryDetail,
            props: true,
          },
        ]
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
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
  }
  else {
    next()
  }
})

export default router
