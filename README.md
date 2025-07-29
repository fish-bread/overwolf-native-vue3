# 简单的overwolf_native_vue3构建

## 通过修改vue路径为相对路径
在vite.config.js中设置base路径为`./`，确保所有资源使用相对路径：

```javascript:vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',  // 关键配置：所有资源使用相对路径
  build: {
    outDir: 'dist',
    assetsDir: './'  // 静态资源输出到根目录
  }
})
```

## 项目构建流程

### 1. 安装依赖
```bash
npm install
```

### 2. 测试Vue页面（开发模式） 注:(可直接点击package.json中的脚本命令运行)
```bash
npm run dev
```
- 访问 `http://localhost:5173` 查看效果
- 热重载功能自动应用代码修改

### 3. Overwolf开发模式运行
1. 构建生产版本：
```bash
npm run build
```
2. 在Overwolf开发者后台：
    - 创建新应用
    - 设置`dist`目录为应用根路径
    - 启用开发者模式
3. 通过Overwolf客户端加载应用

### 4. 生产环境构建
```bash
vite build
```
生成文件位于`dist`目录：
```
dist/
├── assets/
├── index.html
└── ...
```

## 关键注意事项
1. Overwolf要求所有路径必须为相对路径
```