<template>
    <v-layout>
      <v-app-bar>
        <v-spacer></v-spacer>
        <v-tabs
          :model-value="$route.name"
          @update:model-value="updateRoute"
        >
          <v-tab v-for="route in routes"
            :key="route.name"
            :value="route.name"
          >
            {{ route.meta.tabTitle }}
          </v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-main style="min-height: 300px;" class="d-flex justify-center">
        <v-container class="ma-0">
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
</template>

<script setup>
const router = useRouter()

const routes = computed(() =>
  router.options.routes
    .find((route) => route.path === "/")
    .children
    .filter((route) => Object.hasOwn(route, "name")))

const updateRoute = (newRouteName) => {
  router.push({ name: newRouteName })
}
</script>