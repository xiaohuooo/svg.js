# 容器元素
## .SVG。容器
该类是可以包含其他元素的所有元素的基包装器。SVG.Container

继承堆栈为：> 。SVG.Base > SVG.EventTarget > SVG.Dom > SVG.ElementSVG.Container



# SVG.Svg
SVG.js 初始化程序主函数在给定元素中创建一个根 svg 节点，并返回 的实例。SVG.Svg

## SVG（）
returns SVG.Svg SVG.容器which inherits from

```js
var draw = SVG().addTo('#drawing')
```

注意：第一次被调用，将创建第二个不可见的。这是我们的解析器，如常见问题解答中所述。SVG() ```<svg>```



SVG 文档也可以在另一个 SVG 文档中创建。然后，它被称为嵌套的SVG文档：

## 嵌套（）
constructor on .SVG。容器
SVG.Svg SVG.容器returnswhich inherits from
```js
var nested = draw.nested()

var rect = nested.rect(200, 200)
```

# .SVG。G
如果要将一组元素转换为一组元素，则对元素进行分组非常有用。组内的所有元素都保持其相对于其所属组的位置。

注意：组没有自己的几何图形，它是从其内容继承而来的。因此，组不侦听 、 和属性。如果这是您要查找的内容，请改用 svg。xywidthheightnested()

## 组（）
constructor on .SVG。容器
SVG.G SVG.容器returnswhich inherits from

组具有与根 SVG 文档相同的所有元素方法：
```js
var group = draw.group()
group.path('M10,20L30,40')
```
SVG 文档中的现有元素也可以添加到组中：
```js
group.add(rect)
```

# .SVG。象征
constructor on .SVG。容器
SVG。符号 SVG。容器returnswhich inherits from

与元素不同，元素是容器元素。符号和组之间的唯一区别是不呈现符号。因此，元素与元素组合是理想的：groupsymbolsymboluse
```js
var symbol = draw.symbol()
symbol.rect(100, 100).fill('#f09')

var use  = draw.use(symbol).move(200, 200)
```

# .SVG。定义
该元素是引用元素的容器。节点的后代不会直接呈现。节点位于主文档中，可以使用该方法进行访问。```<defs><defs><defs><svg>defs()```

## defs（）
constructor on .SVG。容器
SVG。Defs SVG.容器```returns which inherits from```
```js
var defs = draw.defs()
```
defs 也可以通过该方法用于任何其他元素：```root()```
```js
var defs = rect.root().defs()
```
defs 节点的工作方式与组完全相同。



# .SVG。一个
创建将在所有子元素上激活的超链接。

## 链接（）
constructor on .SVG。容器
SVG。一个SVG。容器```returns which inherits from```

超链接或标记创建一个容器，用于在所有子项上启用链接：```<a>```
```js
var link = draw.link('http://svgdotjs.github.io/')
var rect = link.rect(100, 100)
```
可以使用以下方法更新链接 URL：```to()```
```js
link.to('http://apple.com')
```
此外，link 元素具有创建属性的方法：```target()target```
```js
link.target('_blank')
```
元素也可以与该方法相反的方式链接：```linkTo()```
```js
rect.linkTo('http://svgdotjs.github.io/')
```
或者，可以传递一个块而不是 URL，以获取链接元素上的更多选项：
```js
rect.linkTo(function(link) {
  link.to('http://svgdotjs.github.io/').target('_blank')
})
```