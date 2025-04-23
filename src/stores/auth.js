import { defineStore } from 'pinia'
import api from '@/api/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || '',
  }),
  actions: {
    async login(email, password) {
      const res = await api.post('/login', { email, password })
      this.token = res.data.token
      localStorage.setItem('token', this.token)
      await this.getProfile()
    },
    async signup(payload) {
      const res = await api.post('/signup', payload)
      this.token = res.data.token
      localStorage.setItem('token', this.token)
      await this.getProfile()
    },
    async logout() {
      await api.delete('/logout')
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    },
    async getProfile() {
      const res = await api.get('/profile')
      this.user = res.data
    },
  },
})
