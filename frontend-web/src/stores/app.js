// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const loading = ref(false)
  return {
    loading
  }
})
