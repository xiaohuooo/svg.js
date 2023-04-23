# SVG.js
The lightweight library for manipulating and animating SVG.





# Why choose SVG.js?
SVG.js has no dependencies and aims to be as small as possible while providing close to complete coverage of the SVG spec. If you're not convinced yet, here are a few highlights.



# It's speedy.
SVG.js is fast. Obviously not as fast as vanilla js, but many times faster than the competition:


Index:

- rects: generate 10000 rects
- fill: generate 10000 rects with fill color
- gradient: generate 10000 rects with gradient fill
Less is better. Tested on an Intel Core i7-4702MQ @ 2.2GHz.



# Easy readable, uncluttered syntax.
Creating and manipulating SVG using JavaScript alone is pretty verbose. For example, just creating a simple pink square requires quite a lot of code:


SVG.js provides a syntax that is concise and easy to read. Doing the same as the vanilla js example above:

// SVG.js
var draw = SVG().addTo('#drawing')
  , rect = draw.rect(100, 100).fill('#f06')
That's just two lines of code instead of ten! And a whole lot less repetition.



# Go crazy with animations



# There is more...
- animations on size, position, transformations, color, ...
- painless extension thanks to the modular structure
- various useful plugins available
- unified api between shape types with move, size, center, ...
- binding events to elements
- full support for opacity masks and clipping paths
- text paths, even animated
- element groups
- dynamic gradients and patterns
- fully documented (you're looking at it :)
# License
SVG.js is licensed under the terms of the MIT License.

# Changelog
Wondering what has changed in the latest releases? Have a look at the change log.