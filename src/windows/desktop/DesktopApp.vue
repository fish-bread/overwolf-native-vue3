<script setup>
import AppWindow from "@/windows/AppWindow.vue";
import { useBackgroundStore } from "@/stores"
import {onMounted, ref} from "vue";
const backgroundStore = useBackgroundStore()

onMounted(()=>{
  //获取desktop窗体属性
  backgroundStore.window_size.get_desktop_Window()
})
</script>

<template>
  <div class="desktop-page">
    <app-window></app-window>
    <div class="desktop-page-box">
      <div class="desktop-page-box-inbox">
        <div>恭喜你成功创建overwolf-native-vue3项目</div>
        <div>本项目基于原作者https://github.com/Ben-Guthrie的https://github.com/Ben-Guthrie/overwolf-vue3-sample-app的ts项目改为js项目,旨在为不想使用ts的人创建</div>
        <div>本人菜鸡一枚,仅会转化ts为js,导致本项目极其简陋,如需查看完整项目,还请前往https://github.com/Ben-Guthrie/overwolf-vue3-sample-app</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.desktop-page {
  background: aliceblue;
  width:  100%;
  height:  100vh;
  overflow: hidden;
}
.desktop-page-box {
  width: 100%;
  height: 100%;
  background-color: aquamarine;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.desktop-page-box-inbox {
  width: 80%;
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>