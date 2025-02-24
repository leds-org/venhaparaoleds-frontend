// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const drawerIsOpen = ref(true)
  const toggleDrawer = () => drawerIsOpen.value = !drawerIsOpen.value

  return {
    drawerIsOpen,
    toggleDrawer
  }
})
