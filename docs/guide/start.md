# 开始
## 制备
创建一个基本的 Html 标记并包含 svg.js 脚本：
```js
<!DOCTYPE html>
<html>
<head>
  <title>SVG.js</title>
  <script src="https://cdn.jsdelivr.net/npm/@svgdotjs/svg.js@3.0/dist/svg.min.js"></script>
</head>
<body>

</body>
</html>
```
或者只是在你的javascript应用程序中导入svg.js：
```js
import { SVG } from '@svgdotjs/svg.js'
```
注意：以前在全局 SVG 对象上可用的所有属性现在都需要导入，请参阅以下示例：
```js
import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js'
```
## 创建 SVG 文档
接下来，使用该函数创建一个 SVG 文档并将其添加到 html 页面：SVG()
```js
var draw = SVG().addTo('body').size(300, 300)
var rect = draw.rect(100, 100).attr({ fill: '#f06' })
```
您可以将任何 css 选择器传递给节点或只是节点。addTo
```js
<body>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300">
    <rect width="100" height="100" fill="#f06"></rect>
  </svg>
</body>
```
SVG.js 不会自动设置文档的大小。因此，请确保使用适当的值进行调用。
例如，要将大小设置为其父级的尺寸，请使用以下命令：size()
```js
var draw = SVG().addTo('#someId').size('100%', '100%')
```
## 等待 DOM 加载

这对许多人来说似乎很明显，但仍然值得一提。如果将 js 文件包含在文档的头部，请确保等待 DOM 加载：
```js
SVG.on(document, 'DOMContentLoaded', function() {
  var draw = SVG().addTo('body')
})
```
如果您在底部包含您的 js，这不是问题。

## 纯 SVG
SVG.js也可以在HTML DOM之外工作，例如在SVG文档中：
```js
<?xml version="1.0" encoding="utf-8" ?>
<svg id="drawing" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" >
  <script type="text/javascript" xlink:href="svg.min.js"></script>
  <script type="text/javascript">
    <![CDATA[
      var draw = SVG('#drawing')
      draw.rect(100,100).animate().fill('#f03').move(100,100)
    ]]>
  </script>
</svg>
```
## SVG（） 函数
此函数不仅可以创建新文档，还可以从 dom 中检索 svg.js 对象或从 svg 片段创建新对象：
```js
// new document
var draw = SVG()

// get rect from dom
var rect = SVG('#myRectId')
// or
var rect = SVG('rect')
// any css selector will do
var path = SVG('#group1 path.myClass')

// create new object from fragment
var circle = SVG('<circle>')

// convert node to svg.js object
var obj = SVG(node)
```
## 操场
只是为了让您开始，这是一个基本设置。一切都在场，开始摆弄。