<script setup>
import AppWindow from "@/windows/AppWindow.vue";
import { useBackgroundStore } from "@/stores"
import {onMounted, ref, watchEffect} from "vue";
let backgroundStore = useBackgroundStore()
const bool = ref()
const bool_last = ref()
const bool_running = ref('并没有')
//获取desktop窗体属性
backgroundStore.window_size.get_desktop_Window()
//监听是否存在游戏
watchEffect(() => {
  bool.value = backgroundStore.window_game_bool.is_download ? '已' : '未'
  bool_last.value = backgroundStore.window_game_bool.is_download ? '赶紧启动试试吧' : '赶快去下载体验吧'
  bool_running.value = backgroundStore.window_game_bool.is_running ? '正在' : '还没有'
})
onMounted(()=>{
  console.log('pinia',backgroundStore.window_game_bool.is_running)
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
      <div>目前你的电脑里{{ bool }}安装了炉石传说,{{ bool_last }}</div>
      <div>当前你{{bool_running}}运行炉石传说</div>
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