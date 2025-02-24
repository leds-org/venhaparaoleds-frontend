<template>
    <v-layout>
      <v-app-bar>
        <v-btn icon="mdi-menu" @click="appStore.toggleDrawer">
        </v-btn>
        oi
      </v-app-bar>
  
      <v-navigation-drawer
        v-model="appStore.drawerIsOpen"
      >
        <!-- <v-list>
          <v-list-item title="Navigation drawer"></v-list-item>
        </v-list> -->
      </v-navigation-drawer>
  
      <v-main class="d-flex align-start justify-center ma-4" style="min-height: 300px;">
        <router-view />
      </v-main>
    </v-layout>
</template>

<script setup>
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
</script>