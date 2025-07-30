<script setup>
import { onMounted, ref, useTemplateRef } from "vue"
import { useBackgroundStore } from "@/stores"

const backgroundStore = useBackgroundStore()
defineProps()

const showModal = ref(false)

const header = useTemplateRef("header")
onMounted(() => {
  if (header.value) setDrag(header.value)
  console.log('pinia',backgroundStore)
})
// 显示关闭确认模态框
function onCloseClicked() {
  showModal.value = true // 将显示模态框的状态设为true，弹出确认关闭的提示框
}

// 最小化当前窗口
function onMinimizeClicked() {
  backgroundStore.window_size.minimizeCurrentWindow() // 调用Pinia store中的方法最小化应用窗口
}

// 最大化/还原当前窗口
function onMaximizeClicked() {
  backgroundStore.window_size.maximimizeCurrentWindow() // 切换窗口的最大化/正常状态
}

// 设置窗口拖拽功能
async function setDrag() {
  backgroundStore.window_size.setCurrentWindowDrag() // 启用窗口拖拽功能（通常在标题栏区域）
}

// 模态框中的最小化操作
function onModalMinimize() {
  showModal.value = false // 隐藏关闭确认模态框
  backgroundStore.window_size.minimizeCurrentWindow() // 同时最小化窗口
}

// 关闭模态框（不执行任何操作）
function closeModal() {
  showModal.value = false // 仅隐藏关闭确认模态框，不执行实际关闭
}

// 退出应用程序
function exitApp() {
  backgroundStore.window_size.exitApp() // 调用Pinia store中的方法完全关闭应用
}
</script>

<template>
  <!-- -------------------------------- Header ------------------------------- -->
  <header  @mousedown.stop="setDrag" ref="header" class="app-header">
    <img src="/public/img/header_icon.svg" alt="" />
    <slot name="title" />
    <!--h1 class="hotkey-text" v-if="windowName === kWindowNames.inGame">
      Show/Hide Hotkey:
      <kbd id="hotkey"></kbd>
    </h1-->
    <div class="window-controls-group">
      <button
        id="minimizeButton"
        class="window-control window-control-minimize"
        @click="onMinimizeClicked"
      />
      <button
        id="maximizeButton"
        class="window-control window-control-maximize"
        @click="onMaximizeClicked"
      />
      <button
        id="closeButton"
        class="window-control window-control-close"
        @click="onCloseClicked"
      />
    </div>
  </header>

  <!-- -------------------------------- Body -------------------------------- -->
  <slot name="body" />
  <!-- -------------------------------- Modal -------------------------------- -->
  <div ref="exitMinimizeModal" class="modal" v-if="showModal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h3>Exit the app?</h3>
      <p>
        Exiting the app will close all the app windows and terminate the app process.<br />
        <br />
        Are you sure?
      </p>
      <span class="buttonBar">
        <button id="minimize" class="modalButton" @click="onModalMinimize">Minimize</button>
        <button id="exit" class="modalButton" @click="exitApp">Exit</button>
      </span>
    </div>
  </div>
</template>
<style scoped>
.toggle-icons svg {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.toggle-icons svg:nth-of-type(1) {
  opacity: 1;
}
.toggle-icons svg:nth-of-type(2) {
  opacity: 0;
}

.toggle-icons.toggled svg:nth-of-type(1) {
  opacity: 0;
}
.toggle-icons.toggled svg:nth-of-type(2) {
  opacity: 1;
}

.app-header {
  display: flex;
  align-items: center;
  z-index: 9999;
  background-color: #272727;
}

.app-header h1 {
  font-style: normal;
  font-weight: normal;
  color: #8d8d8d;
  font-size: 14px;
  padding-left: 8px;
  margin: 0;
  cursor: inherit;
}

.app-header .hotkey-text {
  margin: 0 auto;
}

.app-header .hotkey-text kbd {
  color: #fff;
  font-weight: bold;
}

.app-header.draggable {
  user-select: none;
  cursor: grab;
}

.app-header.draggable:active {
  cursor: grabbing;
}

.app-header img {
  padding-left: 10px;
  margin: 0;
}

.window-controls-group {
  display: flex;
  z-index: 1001;
  margin-left: auto;
}
.window-control {
  background-color: transparent;
  transition: background 0.15s ease-in-out;
}
.window-control:hover,
.window-control:active {
  background-color: #464646;
}
.window-control:before {
  display: block;
  content: '';
  width: 30px;
  height: 30px;
  mask: url('/img/window_minimize.svg') center center no-repeat;
  -webkit-mask: url('/img/window_minimize.svg') center center no-repeat;
  background-color: #a8a8a8;
  transition: inherit;
}
.window-control:hover:before,
.window-control:active:before {
  background-color: #dedede;
}
.window-control-minimize:before {
  mask-image: url('/img/window_minimize.svg');
  -webkit-mask-image: url('/img/window_minimize.svg');
}
.window-control-maximize:before {
  mask-image: url('/img/window_maximize.svg');
  -webkit-mask-image: url('/img/window_maximize.svg');
}
.window-control-restore:before {
  mask-image: url('/img/window_restore.svg');
  -webkit-mask-image: url('/img/window_restore.svg');
}
.window-control-settings:before {
  mask-image: url('/img/window_settings.svg');
  -webkit-mask-image: url('/img/window_settings.svg');
}
.window-control-support:before {
  mask-image: url('/img/window_support.svg');
  -webkit-mask-image: url('/img/window_support.svg');
}
.window-control-close:before {
  mask-image: url('/img/window_close.svg');
  -webkit-mask-image: url('/img/window_close.svg');
}
.window-control-close:hover,
.window-control-close:active {
  background-color: #c21913;
}
.window-control-close:hover:before,
.window-control-close:active:before {
  background-color: #dedede;
}

.tooltip {
  visibility: hidden;
  position: absolute;
  margin-top: -3px;
  width: 200px;
  right: 0px;
  background: #464646;
  padding: 30px 5px;
  line-height: 20px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #d5d5d5;
}

.tooltip a {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #d5d5d5;
}

.tooltip hr {
  border-color: #272727;
  border-width: 0.5px;
}

.tooltip a:visited {
  color: #d5d5d5;
}

.support:hover .tooltip {
  visibility: visible;
}

.socialIcons {
  margin-top: 20px;
  margin-right: 10px;
}

.socialIcons img {
  vertical-align: middle;
}

.socialIcons a {
  text-decoration: none;
}

</style>