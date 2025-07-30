# Overwolf Vue3 示例应用 (JavaScript 版本)

本项目基于原作者 Ben-Guthrie 的 TypeScript 项目 [overwolf-vue3-sample-app](https://github.com/Ben-Guthrie/overwolf-vue3-sample-app) 转换为 JavaScript 版本，旨在为不想使用 TypeScript 的开发者提供参考。
本人菜鸡一枚，仅会转化 TypeScript 为 JavaScript，导致本项目极其简陋。如需查看完整项目，还请前往 [Ben-Guthrie 的仓库](https://github.com/Ben-Guthrie/overwolf-vue3-sample-app)。

该演示应用展示了如何为不同的应用窗口配置多个入口点，避免需要多个单独的项目，并使用在应用窗口之间共享的存储。

有关应用功能及如何在 Overwolf 中加载的详细信息，请查阅 [示例应用说明](https://github.com/overwolf/sample-app) 和 [Overwolf 文档](https://dev.overwolf.com/ow-native/getting-started/overview)。

## 项目设置

```sh
npm install
```

### 类型检查、编译和生产环境压缩

```sh
npm run build
```

## 应用窗口

每个窗口都是独立的入口点，由 HTML 文件 /windows/window_name.html 定义，并加载 /src/scripts 目录下对应的脚本文件，这些脚本负责创建和挂载 Vue 应用。
在 vite.config.js 中配置每个独立入口点的构建：

```
  build: {
    rollupOptions: {
      input: {
        background: 'windows/background.html',
        desktop: 'windows/desktop.html',
        inGame: 'windows/in-game.html'
      }
    }
  }
```

同时，在 public/manifest.json 中添加 HTML 文件路径，告知 Overwolf 将它们视为独立窗口。

## 共享 Pinia

为了实现应用窗口间的存储共享，我们在后台窗口暴露一个共享的 Pinia 实例，其他窗口可通过 overwolf.windows.getMainWindow().sharedPinia 访问。然后我们在其他窗口调用 app.use(sharedPinia) 传递共享的 Pinia 状态。
...这原本应该很完美，但实际上似乎无法正确初始化 Pinia 存储（原因超出我的理解能力）。为解决此问题，我们必须在每个窗口首次使用存储时显式传递共享的 Pinia 状态。
在本示例应用中，"background" 存储用于管理应用窗口状态并响应游戏启动。该存储可从所有应用窗口访问，并提供最小化、最大化和退出应用的功能