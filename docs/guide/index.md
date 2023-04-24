# SVG.js

用于操作和动画化 SVG 的轻量级库。

[![GitHub Starts](https://img.shields.io/github/stars/svgdotjs/svg.js.svg?style=flat&label=Stars&logo=github)](https://github.com/xiaohuooo/svg.js)

[![GitHub All Releases](https://img.shields.io/github/downloads/svgdotjs/svg.js/total.svg)](https://github.com/xiaohuooo/svg.js)

## 为什么选择 SVG.js？

SVG.js 没有依赖关系，旨在尽可能小，同时提供接近完整的 SVG 规范覆盖。如果您还不相信，这里有一些亮点。

## 他很快。

SVG.js 很快。显然没有 vanilla js 快，但比竞争对手快很多倍：

:::demo 使用 Button 的样式

```vue
<template>
  <div ref="svg" id="drawing"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const svg = ref('')
onMounted(() => {
  svg.value = SVG().addTo('#drawing').size(400, 300)
  // 定义渐变
  const gradient = svg.value.gradient('linear', add => {
    add.stop(0, '#fff')
    add.stop(1, '#000')
  })
  // 循环生成 10000 个矩形，并添加到画布上
  for (let i = 0; i < 10000; i++) {
    svg.value
      .rect(5, 5)
      .fill(gradient)
      .move(Math.random() * 395, Math.random() * 295)
  }
})
</script>
```

:::

指数：

- rect：生成 10000 个矩形
- fill：生成 10000 个填充颜色的矩形
- gradient：生成 10000 个带有渐变填充的矩形

越少越好。在英特尔酷睿 i7-4702MQ @ 2.2GHz 上测试。

## 易于阅读、整洁的语法。

单独使用 JavaScript 创建和操作 SVG 是非常冗长的。例如，仅创建一个简单的粉红色方块就需要相当多的代码：

SVG.js 提供了一种简洁易读的语法。与上面的香草 js 示例相同：

```js
var draw = SVG().addTo('#drawing')
rect = draw.rect(100, 100).fill('#f06')
```

这只是两行代码，而不是十行代码！而且重复次数大大减少。

## 疯狂的动画

## 还有更多...

- 关于大小，位置，转换，颜色的动画，...
- 模块化结构，无痛伸展
- 提供各种有用的插件
- 形状类型之间的统一 API，包括移动、大小、中心...
- 将事件绑定到元素
- 完全支持不透明度蒙版和剪切路径
- 文本路径，甚至动画
- 元素组
- 动态渐变和图案
- 完整记录（您正在查看它:)

## 许可证

SVG.js 根据 MIT 许可证的条款进行许可。

## 更新日志

想知道最新版本中有哪些变化？查看更改日志。
