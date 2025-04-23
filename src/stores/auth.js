import { defineStore } from 'pinia'
import api from '@/api/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || '',
  }),
  actions: {
    async login(email, password) {
      console.log("does execution get here", email, password)
      const res = await api.post('/login', { user: { email, password } })

      this.token = res.data.token
      localStorage.setItem('token', this.token)
    },
    async signup(firstName, lastName, email, password, passwordConfirmation) {
      console.log("does execution get here", firstName, lastName, email, password, passwordConfirmation)
      const res = await api.post('/signup', { user: { first_name: firstName, last_name: lastName, email: email, password: password, password_confirmation: passwordConfirmation } })
      console.log("response", res)
      this.token = res.data.token
      localStorage.setItem('token', this.token)
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
