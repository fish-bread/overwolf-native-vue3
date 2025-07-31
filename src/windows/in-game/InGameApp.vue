<script setup>
import { useBackgroundStore } from "@/stores"
import {ref, watchEffect} from "vue";
const backgroundStore = useBackgroundStore()
//版本号
const Version_number = ref()
//创建ingaem窗体属性
backgroundStore.window_size.get_ingame_Window()
watchEffect(() => {
  Version_number.value = JSON.parse(backgroundStore.window_game.game_data.gep_internal.version_info).local_version
})
</script>

<template>
  <div class="ingame_page">
    <div class="ingame_page_box">
      <div>恭喜您成功进入游戏内界面</div>
      <div>您当前的游戏版本为{{Version_number}}</div>
    </div>
  </div>
</template>
<style scoped>
.ingame_page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.ingame_page_box {
  width: 300px;
  height: 100px;
  background-color: aquamarine;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}
</style>


