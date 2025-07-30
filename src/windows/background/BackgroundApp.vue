<!-- eslint-disable vue/valid-template-root -->
<script setup>
import { useBackgroundStore } from "@/stores"
const backgroundStore = useBackgroundStore()
//创建desktop
backgroundStore.window_create.createDesktopWindow()
</script>

<template>
  <div class="background_app">
    <div>BackgroundApp</div>
  </div>
</template>
<style scoped>
</style>
