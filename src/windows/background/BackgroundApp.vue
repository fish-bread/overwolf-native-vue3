<!-- eslint-disable vue/valid-template-root -->
<script setup>
import { useBackgroundStore } from "@/stores"
const backgroundStore = useBackgroundStore()
//创建back窗体属性
backgroundStore.window_size.get_background_Window()
//创建desktop
backgroundStore.window_create.createDesktopWindow()
//判断游戏是否存在
backgroundStore.window_game.getDownloadGame()
//搜索正在运行的游戏
backgroundStore.window_game.searchRunningGame()
</script>

<template>
  <div class="background_app">
    <div>BackgroundApp</div>
  </div>
</template>
<style scoped>
</style>
