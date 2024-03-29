// node_modules/.pnpm/registry.npmmirror.com+@svgdotjs+svg.js@3.1.2/node_modules/@svgdotjs/svg.js/dist/svg.esm.js
var methods$1 = {};
var names = [];
function registerMethods(name, m) {
  if (Array.isArray(name)) {
    for (const _name of name) {
      registerMethods(_name, m);
    }
    return;
  }
  if (typeof name === "object") {
    for (const _name in name) {
      registerMethods(_name, name[_name]);
    }
    return;
  }
  addMethodNames(Object.getOwnPropertyNames(m));
  methods$1[name] = Object.assign(methods$1[name] || {}, m);
}
function getMethodsFor(name) {
  return methods$1[name] || {};
}
function getMethodNames() {
  return [...new Set(names)];
}
function addMethodNames(_names) {
  names.push(..._names);
}
function map(array2, block) {
  let i;
  const il = array2.length;
  const result = [];
  for (i = 0; i < il; i++) {
    result.push(block(array2[i]));
  }
  return result;
}
function filter(array2, block) {
  let i;
  const il = array2.length;
  const result = [];
  for (i = 0; i < il; i++) {
    if (block(array2[i])) {
      result.push(array2[i]);
    }
  }
  return result;
}
function radians(d) {
  return d % 360 * Math.PI / 180;
}
function degrees(r) {
  return r * 180 / Math.PI % 360;
}
function camelCase(s) {
  return s.toLowerCase().replace(/-(.)/g, function(m, g) {
    return g.toUpperCase();
  });
}
function unCamelCase(s) {
  return s.replace(/([A-Z])/g, function(m, g) {
    return "-" + g.toLowerCase();
  });
}
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function proportionalSize(element, width2, height2, box) {
  if (width2 == null || height2 == null) {
    box = box || element.bbox();
    if (width2 == null) {
      width2 = box.width / box.height * height2;
    } else if (height2 == null) {
      height2 = box.height / box.width * width2;
    }
  }
  return {
    width: width2,
    height: height2
  };
}
function getOrigin(o, element) {
  const origin = o.origin;
  let ox = o.ox != null ? o.ox : o.originX != null ? o.originX : "center";
  let oy = o.oy != null ? o.oy : o.originY != null ? o.originY : "center";
  if (origin != null) {
    [ox, oy] = Array.isArray(origin) ? origin : typeof origin === "object" ? [origin.x, origin.y] : [origin, origin];
  }
  const condX = typeof ox === "string";
  const condY = typeof oy === "string";
  if (condX || condY) {
    const {
      height: height2,
      width: width2,
      x: x2,
      y: y2
    } = element.bbox();
    if (condX) {
      ox = ox.includes("left") ? x2 : ox.includes("right") ? x2 + width2 : x2 + width2 / 2;
    }
    if (condY) {
      oy = oy.includes("top") ? y2 : oy.includes("bottom") ? y2 + height2 : y2 + height2 / 2;
    }
  }
  return [ox, oy];
}
var utils = {
  __proto__: null,
  map,
  filter,
  radians,
  degrees,
  camelCase,
  unCamelCase,
  capitalize,
  proportionalSize,
  getOrigin
};
var svg = "http://www.w3.org/2000/svg";
var html = "http://www.w3.org/1999/xhtml";
var xmlns = "http://www.w3.org/2000/xmlns/";
var xlink = "http://www.w3.org/1999/xlink";
var svgjs = "http://svgjs.dev/svgjs";
var namespaces = {
  __proto__: null,
  svg,
  html,
  xmlns,
  xlink,
  svgjs
};
var globals = {
  window: typeof window === "undefined" ? null : window,
  document: typeof document === "undefined" ? null : document
};
function registerWindow(win = null, doc = null) {
  globals.window = win;
  globals.document = doc;
}
var save = {};
function saveWindow() {
  save.window = globals.window;
  save.document = globals.document;
}
function restoreWindow() {
  globals.window = save.window;
  globals.document = save.document;
}
function withWindow(win, fn) {
  saveWindow();
  registerWindow(win, win.document);
  fn(win, win.document);
  restoreWindow();
}
function getWindow() {
  return globals.window;
}
var Base = class {
  // constructor (node/*, {extensions = []} */) {
  //   // this.tags = []
  //   //
  //   // for (let extension of extensions) {
  //   //   extension.setup.call(this, node)
  //   //   this.tags.push(extension.name)
  //   // }
  // }
};
var elements = {};
var root = "___SYMBOL___ROOT___";
function create(name, ns = svg) {
  return globals.document.createElementNS(ns, name);
}
function makeInstance(element, isHTML = false) {
  if (element instanceof Base)
    return element;
  if (typeof element === "object") {
    return adopter(element);
  }
  if (element == null) {
    return new elements[root]();
  }
  if (typeof element === "string" && element.charAt(0) !== "<") {
    return adopter(globals.document.querySelector(element));
  }
  const wrapper = isHTML ? globals.document.createElement("div") : create("svg");
  wrapper.innerHTML = element;
  element = adopter(wrapper.firstChild);
  wrapper.removeChild(wrapper.firstChild);
  return element;
}
function nodeOrNew(name, node) {
  return node && node.ownerDocument && node instanceof node.ownerDocument.defaultView.Node ? node : create(name);
}
function adopt(node) {
  if (!node)
    return null;
  if (node.instance instanceof Base)
    return node.instance;
  if (node.nodeName === "#document-fragment") {
    return new elements.Fragment(node);
  }
  let className = capitalize(node.nodeName || "Dom");
  if (className === "LinearGradient" || className === "RadialGradient") {
    className = "Gradient";
  } else if (!elements[className]) {
    className = "Dom";
  }
  return new elements[className](node);
}
var adopter = adopt;
function mockAdopt(mock = adopt) {
  adopter = mock;
}
function register(element, name = element.name, asRoot = false) {
  elements[name] = element;
  if (asRoot)
    elements[root] = element;
  addMethodNames(Object.getOwnPropertyNames(element.prototype));
  return element;
}
function getClass(name) {
  return elements[name];
}
var did = 1e3;
function eid(name) {
  return "Svgjs" + capitalize(name) + did++;
}
function assignNewId(node) {
  for (let i = node.children.length - 1; i >= 0; i--) {
    assignNewId(node.children[i]);
  }
  if (node.id) {
    node.id = eid(node.nodeName);
    return node;
  }
  return node;
}
function extend(modules, methods2) {
  let key, i;
  modules = Array.isArray(modules) ? modules : [modules];
  for (i = modules.length - 1; i >= 0; i--) {
    for (key in methods2) {
      modules[i].prototype[key] = methods2[key];
    }
  }
}
function wrapWithAttrCheck(fn) {
  return function(...args) {
    const o = args[args.length - 1];
    if (o && o.constructor === Object && !(o instanceof Array)) {
      return fn.apply(this, args.slice(0, -1)).attr(o);
    } else {
      return fn.apply(this, args);
    }
  };
}
function siblings() {
  return this.parent().children();
}
function position() {
  return this.parent().index(this);
}
function next() {
  return this.siblings()[this.position() + 1];
}
function prev() {
  return this.siblings()[this.position() - 1];
}
function forward() {
  const i = this.position();
  const p = this.parent();
  p.add(this.remove(), i + 1);
  return this;
}
function backward() {
  const i = this.position();
  const p = this.parent();
  p.add(this.remove(), i ? i - 1 : 0);
  return this;
}
function front() {
  const p = this.parent();
  p.add(this.remove());
  return this;
}
function back() {
  const p = this.parent();
  p.add(this.remove(), 0);
  return this;
}
function before(element) {
  element = makeInstance(element);
  element.remove();
  const i = this.position();
  this.parent().add(element, i);
  return this;
}
function after(element) {
  element = makeInstance(element);
  element.remove();
  const i = this.position();
  this.parent().add(element, i + 1);
  return this;
}
function insertBefore(element) {
  element = makeInstance(element);
  element.before(this);
  return this;
}
function insertAfter(element) {
  element = makeInstance(element);
  element.after(this);
  return this;
}
registerMethods("Dom", {
  siblings,
  position,
  next,
  prev,
  forward,
  backward,
  front,
  back,
  before,
  after,
  insertBefore,
  insertAfter
});
var numberAndUnit = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i;
var hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
var rgb = /rgb\((\d+),(\d+),(\d+)\)/;
var reference = /(#[a-z_][a-z0-9\-_]*)/i;
var transforms = /\)\s*,?\s*/;
var whitespace = /\s/g;
var isHex = /^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i;
var isRgb = /^rgb\(/;
var isBlank = /^(\s+)?$/;
var isNumber = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
var isImage = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i;
var delimiter = /[\s,]+/;
var isPathLetter = /[MLHVCSQTAZ]/i;
var regex = {
  __proto__: null,
  numberAndUnit,
  hex,
  rgb,
  reference,
  transforms,
  whitespace,
  isHex,
  isRgb,
  isBlank,
  isNumber,
  isImage,
  delimiter,
  isPathLetter
};
function classes() {
  const attr2 = this.attr("class");
  return attr2 == null ? [] : attr2.trim().split(delimiter);
}
function hasClass(name) {
  return this.classes().indexOf(name) !== -1;
}
function addClass(name) {
  if (!this.hasClass(name)) {
    const array2 = this.classes();
    array2.push(name);
    this.attr("class", array2.join(" "));
  }
  return this;
}
function removeClass(name) {
  if (this.hasClass(name)) {
    this.attr("class", this.classes().filter(function(c) {
      return c !== name;
    }).join(" "));
  }
  return this;
}
function toggleClass(name) {
  return this.hasClass(name) ? this.removeClass(name) : this.addClass(name);
}
registerMethods("Dom", {
  classes,
  hasClass,
  addClass,
  removeClass,
  toggleClass
});
function css(style, val) {
  const ret = {};
  if (arguments.length === 0) {
    this.node.style.cssText.split(/\s*;\s*/).filter(function(el) {
      return !!el.length;
    }).forEach(function(el) {
      const t = el.split(/\s*:\s*/);
      ret[t[0]] = t[1];
    });
    return ret;
  }
  if (arguments.length < 2) {
    if (Array.isArray(style)) {
      for (const name of style) {
        const cased = camelCase(name);
        ret[name] = this.node.style[cased];
      }
      return ret;
    }
    if (typeof style === "string") {
      return this.node.style[camelCase(style)];
    }
    if (typeof style === "object") {
      for (const name in style) {
        this.node.style[camelCase(name)] = style[name] == null || isBlank.test(style[name]) ? "" : style[name];
      }
    }
  }
  if (arguments.length === 2) {
    this.node.style[camelCase(style)] = val == null || isBlank.test(val) ? "" : val;
  }
  return this;
}
function show() {
  return this.css("display", "");
}
function hide() {
  return this.css("display", "none");
}
function visible() {
  return this.css("display") !== "none";
}
registerMethods("Dom", {
  css,
  show,
  hide,
  visible
});
function data(a, v, r) {
  if (a == null) {
    return this.data(map(filter(this.node.attributes, (el) => el.nodeName.indexOf("data-") === 0), (el) => el.nodeName.slice(5)));
  } else if (a instanceof Array) {
    const data2 = {};
    for (const key of a) {
      data2[key] = this.data(key);
    }
    return data2;
  } else if (typeof a === "object") {
    for (v in a) {
      this.data(v, a[v]);
    }
  } else if (arguments.length < 2) {
    try {
      return JSON.parse(this.attr("data-" + a));
    } catch (e) {
      return this.attr("data-" + a);
    }
  } else {
    this.attr("data-" + a, v === null ? null : r === true || typeof v === "string" || typeof v === "number" ? v : JSON.stringify(v));
  }
  return this;
}
registerMethods("Dom", {
  data
});
function remember(k, v) {
  if (typeof arguments[0] === "object") {
    for (const key in k) {
      this.remember(key, k[key]);
    }
  } else if (arguments.length === 1) {
    return this.memory()[k];
  } else {
    this.memory()[k] = v;
  }
  return this;
}
function forget() {
  if (arguments.length === 0) {
    this._memory = {};
  } else {
    for (let i = arguments.length - 1; i >= 0; i--) {
      delete this.memory()[arguments[i]];
    }
  }
  return this;
}
function memory() {
  return this._memory = this._memory || {};
}
registerMethods("Dom", {
  remember,
  forget,
  memory
});
function sixDigitHex(hex2) {
  return hex2.length === 4 ? ["#", hex2.substring(1, 2), hex2.substring(1, 2), hex2.substring(2, 3), hex2.substring(2, 3), hex2.substring(3, 4), hex2.substring(3, 4)].join("") : hex2;
}
function componentHex(component) {
  const integer = Math.round(component);
  const bounded = Math.max(0, Math.min(255, integer));
  const hex2 = bounded.toString(16);
  return hex2.length === 1 ? "0" + hex2 : hex2;
}
function is(object, space) {
  for (let i = space.length; i--; ) {
    if (object[space[i]] == null) {
      return false;
    }
  }
  return true;
}
function getParameters(a, b) {
  const params = is(a, "rgb") ? {
    _a: a.r,
    _b: a.g,
    _c: a.b,
    _d: 0,
    space: "rgb"
  } : is(a, "xyz") ? {
    _a: a.x,
    _b: a.y,
    _c: a.z,
    _d: 0,
    space: "xyz"
  } : is(a, "hsl") ? {
    _a: a.h,
    _b: a.s,
    _c: a.l,
    _d: 0,
    space: "hsl"
  } : is(a, "lab") ? {
    _a: a.l,
    _b: a.a,
    _c: a.b,
    _d: 0,
    space: "lab"
  } : is(a, "lch") ? {
    _a: a.l,
    _b: a.c,
    _c: a.h,
    _d: 0,
    space: "lch"
  } : is(a, "cmyk") ? {
    _a: a.c,
    _b: a.m,
    _c: a.y,
    _d: a.k,
    space: "cmyk"
  } : {
    _a: 0,
    _b: 0,
    _c: 0,
    space: "rgb"
  };
  params.space = b || params.space;
  return params;
}
function cieSpace(space) {
  if (space === "lab" || space === "xyz" || space === "lch") {
    return true;
  } else {
    return false;
  }
}
function hueToRgb(p, q, t) {
  if (t < 0)
    t += 1;
  if (t > 1)
    t -= 1;
  if (t < 1 / 6)
    return p + (q - p) * 6 * t;
  if (t < 1 / 2)
    return q;
  if (t < 2 / 3)
    return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
var Color = class {
  constructor(...inputs) {
    this.init(...inputs);
  }
  // Test if given value is a color
  static isColor(color) {
    return color && (color instanceof Color || this.isRgb(color) || this.test(color));
  }
  // Test if given value is an rgb object
  static isRgb(color) {
    return color && typeof color.r === "number" && typeof color.g === "number" && typeof color.b === "number";
  }
  /*
  Generating random colors
  */
  static random(mode = "vibrant", t, u) {
    const {
      random,
      round,
      sin,
      PI: pi
    } = Math;
    if (mode === "vibrant") {
      const l = (81 - 57) * random() + 57;
      const c = (83 - 45) * random() + 45;
      const h = 360 * random();
      const color = new Color(l, c, h, "lch");
      return color;
    } else if (mode === "sine") {
      t = t == null ? random() : t;
      const r = round(80 * sin(2 * pi * t / 0.5 + 0.01) + 150);
      const g = round(50 * sin(2 * pi * t / 0.5 + 4.6) + 200);
      const b = round(100 * sin(2 * pi * t / 0.5 + 2.3) + 150);
      const color = new Color(r, g, b);
      return color;
    } else if (mode === "pastel") {
      const l = (94 - 86) * random() + 86;
      const c = (26 - 9) * random() + 9;
      const h = 360 * random();
      const color = new Color(l, c, h, "lch");
      return color;
    } else if (mode === "dark") {
      const l = 10 + 10 * random();
      const c = (125 - 75) * random() + 86;
      const h = 360 * random();
      const color = new Color(l, c, h, "lch");
      return color;
    } else if (mode === "rgb") {
      const r = 255 * random();
      const g = 255 * random();
      const b = 255 * random();
      const color = new Color(r, g, b);
      return color;
    } else if (mode === "lab") {
      const l = 100 * random();
      const a = 256 * random() - 128;
      const b = 256 * random() - 128;
      const color = new Color(l, a, b, "lab");
      return color;
    } else if (mode === "grey") {
      const grey = 255 * random();
      const color = new Color(grey, grey, grey);
      return color;
    } else {
      throw new Error("Unsupported random color mode");
    }
  }
  // Test if given value is a color string
  static test(color) {
    return typeof color === "string" && (isHex.test(color) || isRgb.test(color));
  }
  cmyk() {
    const {
      _a,
      _b,
      _c
    } = this.rgb();
    const [r, g, b] = [_a, _b, _c].map((v) => v / 255);
    const k = Math.min(1 - r, 1 - g, 1 - b);
    if (k === 1) {
      return new Color(0, 0, 0, 1, "cmyk");
    }
    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y2 = (1 - b - k) / (1 - k);
    const color = new Color(c, m, y2, k, "cmyk");
    return color;
  }
  hsl() {
    const {
      _a,
      _b,
      _c
    } = this.rgb();
    const [r, g, b] = [_a, _b, _c].map((v) => v / 255);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    const isGrey = max === min;
    const delta = max - min;
    const s = isGrey ? 0 : l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    const h = isGrey ? 0 : max === r ? ((g - b) / delta + (g < b ? 6 : 0)) / 6 : max === g ? ((b - r) / delta + 2) / 6 : max === b ? ((r - g) / delta + 4) / 6 : 0;
    const color = new Color(360 * h, 100 * s, 100 * l, "hsl");
    return color;
  }
  init(a = 0, b = 0, c = 0, d = 0, space = "rgb") {
    a = !a ? 0 : a;
    if (this.space) {
      for (const component in this.space) {
        delete this[this.space[component]];
      }
    }
    if (typeof a === "number") {
      space = typeof d === "string" ? d : space;
      d = typeof d === "string" ? 0 : d;
      Object.assign(this, {
        _a: a,
        _b: b,
        _c: c,
        _d: d,
        space
      });
    } else if (a instanceof Array) {
      this.space = b || (typeof a[3] === "string" ? a[3] : a[4]) || "rgb";
      Object.assign(this, {
        _a: a[0],
        _b: a[1],
        _c: a[2],
        _d: a[3] || 0
      });
    } else if (a instanceof Object) {
      const values = getParameters(a, b);
      Object.assign(this, values);
    } else if (typeof a === "string") {
      if (isRgb.test(a)) {
        const noWhitespace = a.replace(whitespace, "");
        const [_a2, _b2, _c2] = rgb.exec(noWhitespace).slice(1, 4).map((v) => parseInt(v));
        Object.assign(this, {
          _a: _a2,
          _b: _b2,
          _c: _c2,
          _d: 0,
          space: "rgb"
        });
      } else if (isHex.test(a)) {
        const hexParse = (v) => parseInt(v, 16);
        const [, _a2, _b2, _c2] = hex.exec(sixDigitHex(a)).map(hexParse);
        Object.assign(this, {
          _a: _a2,
          _b: _b2,
          _c: _c2,
          _d: 0,
          space: "rgb"
        });
      } else
        throw Error("Unsupported string format, can't construct Color");
    }
    const {
      _a,
      _b,
      _c,
      _d
    } = this;
    const components = this.space === "rgb" ? {
      r: _a,
      g: _b,
      b: _c
    } : this.space === "xyz" ? {
      x: _a,
      y: _b,
      z: _c
    } : this.space === "hsl" ? {
      h: _a,
      s: _b,
      l: _c
    } : this.space === "lab" ? {
      l: _a,
      a: _b,
      b: _c
    } : this.space === "lch" ? {
      l: _a,
      c: _b,
      h: _c
    } : this.space === "cmyk" ? {
      c: _a,
      m: _b,
      y: _c,
      k: _d
    } : {};
    Object.assign(this, components);
  }
  lab() {
    const {
      x: x2,
      y: y2,
      z
    } = this.xyz();
    const l = 116 * y2 - 16;
    const a = 500 * (x2 - y2);
    const b = 200 * (y2 - z);
    const color = new Color(l, a, b, "lab");
    return color;
  }
  lch() {
    const {
      l,
      a,
      b
    } = this.lab();
    const c = Math.sqrt(a ** 2 + b ** 2);
    let h = 180 * Math.atan2(b, a) / Math.PI;
    if (h < 0) {
      h *= -1;
      h = 360 - h;
    }
    const color = new Color(l, c, h, "lch");
    return color;
  }
  /*
  Conversion Methods
  */
  rgb() {
    if (this.space === "rgb") {
      return this;
    } else if (cieSpace(this.space)) {
      let {
        x: x2,
        y: y2,
        z
      } = this;
      if (this.space === "lab" || this.space === "lch") {
        let {
          l,
          a,
          b: b2
        } = this;
        if (this.space === "lch") {
          const {
            c,
            h
          } = this;
          const dToR = Math.PI / 180;
          a = c * Math.cos(dToR * h);
          b2 = c * Math.sin(dToR * h);
        }
        const yL = (l + 16) / 116;
        const xL = a / 500 + yL;
        const zL = yL - b2 / 200;
        const ct = 16 / 116;
        const mx = 8856e-6;
        const nm = 7.787;
        x2 = 0.95047 * (xL ** 3 > mx ? xL ** 3 : (xL - ct) / nm);
        y2 = 1 * (yL ** 3 > mx ? yL ** 3 : (yL - ct) / nm);
        z = 1.08883 * (zL ** 3 > mx ? zL ** 3 : (zL - ct) / nm);
      }
      const rU = x2 * 3.2406 + y2 * -1.5372 + z * -0.4986;
      const gU = x2 * -0.9689 + y2 * 1.8758 + z * 0.0415;
      const bU = x2 * 0.0557 + y2 * -0.204 + z * 1.057;
      const pow = Math.pow;
      const bd = 31308e-7;
      const r = rU > bd ? 1.055 * pow(rU, 1 / 2.4) - 0.055 : 12.92 * rU;
      const g = gU > bd ? 1.055 * pow(gU, 1 / 2.4) - 0.055 : 12.92 * gU;
      const b = bU > bd ? 1.055 * pow(bU, 1 / 2.4) - 0.055 : 12.92 * bU;
      const color = new Color(255 * r, 255 * g, 255 * b);
      return color;
    } else if (this.space === "hsl") {
      let {
        h,
        s,
        l
      } = this;
      h /= 360;
      s /= 100;
      l /= 100;
      if (s === 0) {
        l *= 255;
        const color2 = new Color(l, l, l);
        return color2;
      }
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      const r = 255 * hueToRgb(p, q, h + 1 / 3);
      const g = 255 * hueToRgb(p, q, h);
      const b = 255 * hueToRgb(p, q, h - 1 / 3);
      const color = new Color(r, g, b);
      return color;
    } else if (this.space === "cmyk") {
      const {
        c,
        m,
        y: y2,
        k
      } = this;
      const r = 255 * (1 - Math.min(1, c * (1 - k) + k));
      const g = 255 * (1 - Math.min(1, m * (1 - k) + k));
      const b = 255 * (1 - Math.min(1, y2 * (1 - k) + k));
      const color = new Color(r, g, b);
      return color;
    } else {
      return this;
    }
  }
  toArray() {
    const {
      _a,
      _b,
      _c,
      _d,
      space
    } = this;
    return [_a, _b, _c, _d, space];
  }
  toHex() {
    const [r, g, b] = this._clamped().map(componentHex);
    return `#${r}${g}${b}`;
  }
  toRgb() {
    const [rV, gV, bV] = this._clamped();
    const string = `rgb(${rV},${gV},${bV})`;
    return string;
  }
  toString() {
    return this.toHex();
  }
  xyz() {
    const {
      _a: r255,
      _b: g255,
      _c: b255
    } = this.rgb();
    const [r, g, b] = [r255, g255, b255].map((v) => v / 255);
    const rL = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    const gL = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    const bL = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
    const xU = (rL * 0.4124 + gL * 0.3576 + bL * 0.1805) / 0.95047;
    const yU = (rL * 0.2126 + gL * 0.7152 + bL * 0.0722) / 1;
    const zU = (rL * 0.0193 + gL * 0.1192 + bL * 0.9505) / 1.08883;
    const x2 = xU > 8856e-6 ? Math.pow(xU, 1 / 3) : 7.787 * xU + 16 / 116;
    const y2 = yU > 8856e-6 ? Math.pow(yU, 1 / 3) : 7.787 * yU + 16 / 116;
    const z = zU > 8856e-6 ? Math.pow(zU, 1 / 3) : 7.787 * zU + 16 / 116;
    const color = new Color(x2, y2, z, "xyz");
    return color;
  }
  /*
  Input and Output methods
  */
  _clamped() {
    const {
      _a,
      _b,
      _c
    } = this.rgb();
    const {
      max,
      min,
      round
    } = Math;
    const format = (v) => max(0, min(round(v), 255));
    return [_a, _b, _c].map(format);
  }
  /*
  Constructing colors
  */
};
var Point = class {
  // Initialize
  constructor(...args) {
    this.init(...args);
  }
  // Clone point
  clone() {
    return new Point(this);
  }
  init(x2, y2) {
    const base = {
      x: 0,
      y: 0
    };
    const source = Array.isArray(x2) ? {
      x: x2[0],
      y: x2[1]
    } : typeof x2 === "object" ? {
      x: x2.x,
      y: x2.y
    } : {
      x: x2,
      y: y2
    };
    this.x = source.x == null ? base.x : source.x;
    this.y = source.y == null ? base.y : source.y;
    return this;
  }
  toArray() {
    return [this.x, this.y];
  }
  transform(m) {
    return this.clone().transformO(m);
  }
  // Transform point with matrix
  transformO(m) {
    if (!Matrix.isMatrixLike(m)) {
      m = new Matrix(m);
    }
    const {
      x: x2,
      y: y2
    } = this;
    this.x = m.a * x2 + m.c * y2 + m.e;
    this.y = m.b * x2 + m.d * y2 + m.f;
    return this;
  }
};
function point(x2, y2) {
  return new Point(x2, y2).transform(this.screenCTM().inverse());
}
function closeEnough(a, b, threshold) {
  return Math.abs(b - a) < (threshold || 1e-6);
}
var Matrix = class {
  constructor(...args) {
    this.init(...args);
  }
  static formatTransforms(o) {
    const flipBoth = o.flip === "both" || o.flip === true;
    const flipX = o.flip && (flipBoth || o.flip === "x") ? -1 : 1;
    const flipY = o.flip && (flipBoth || o.flip === "y") ? -1 : 1;
    const skewX = o.skew && o.skew.length ? o.skew[0] : isFinite(o.skew) ? o.skew : isFinite(o.skewX) ? o.skewX : 0;
    const skewY = o.skew && o.skew.length ? o.skew[1] : isFinite(o.skew) ? o.skew : isFinite(o.skewY) ? o.skewY : 0;
    const scaleX = o.scale && o.scale.length ? o.scale[0] * flipX : isFinite(o.scale) ? o.scale * flipX : isFinite(o.scaleX) ? o.scaleX * flipX : flipX;
    const scaleY = o.scale && o.scale.length ? o.scale[1] * flipY : isFinite(o.scale) ? o.scale * flipY : isFinite(o.scaleY) ? o.scaleY * flipY : flipY;
    const shear = o.shear || 0;
    const theta = o.rotate || o.theta || 0;
    const origin = new Point(o.origin || o.around || o.ox || o.originX, o.oy || o.originY);
    const ox = origin.x;
    const oy = origin.y;
    const position2 = new Point(o.position || o.px || o.positionX || NaN, o.py || o.positionY || NaN);
    const px = position2.x;
    const py = position2.y;
    const translate = new Point(o.translate || o.tx || o.translateX, o.ty || o.translateY);
    const tx = translate.x;
    const ty = translate.y;
    const relative = new Point(o.relative || o.rx || o.relativeX, o.ry || o.relativeY);
    const rx2 = relative.x;
    const ry2 = relative.y;
    return {
      scaleX,
      scaleY,
      skewX,
      skewY,
      shear,
      theta,
      rx: rx2,
      ry: ry2,
      tx,
      ty,
      ox,
      oy,
      px,
      py
    };
  }
  static fromArray(a) {
    return {
      a: a[0],
      b: a[1],
      c: a[2],
      d: a[3],
      e: a[4],
      f: a[5]
    };
  }
  static isMatrixLike(o) {
    return o.a != null || o.b != null || o.c != null || o.d != null || o.e != null || o.f != null;
  }
  // left matrix, right matrix, target matrix which is overwritten
  static matrixMultiply(l, r, o) {
    const a = l.a * r.a + l.c * r.b;
    const b = l.b * r.a + l.d * r.b;
    const c = l.a * r.c + l.c * r.d;
    const d = l.b * r.c + l.d * r.d;
    const e = l.e + l.a * r.e + l.c * r.f;
    const f = l.f + l.b * r.e + l.d * r.f;
    o.a = a;
    o.b = b;
    o.c = c;
    o.d = d;
    o.e = e;
    o.f = f;
    return o;
  }
  around(cx2, cy2, matrix) {
    return this.clone().aroundO(cx2, cy2, matrix);
  }
  // Transform around a center point
  aroundO(cx2, cy2, matrix) {
    const dx2 = cx2 || 0;
    const dy2 = cy2 || 0;
    return this.translateO(-dx2, -dy2).lmultiplyO(matrix).translateO(dx2, dy2);
  }
  // Clones this matrix
  clone() {
    return new Matrix(this);
  }
  // Decomposes this matrix into its affine parameters
  decompose(cx2 = 0, cy2 = 0) {
    const a = this.a;
    const b = this.b;
    const c = this.c;
    const d = this.d;
    const e = this.e;
    const f = this.f;
    const determinant = a * d - b * c;
    const ccw = determinant > 0 ? 1 : -1;
    const sx = ccw * Math.sqrt(a * a + b * b);
    const thetaRad = Math.atan2(ccw * b, ccw * a);
    const theta = 180 / Math.PI * thetaRad;
    const ct = Math.cos(thetaRad);
    const st = Math.sin(thetaRad);
    const lam = (a * c + b * d) / determinant;
    const sy = c * sx / (lam * a - b) || d * sx / (lam * b + a);
    const tx = e - cx2 + cx2 * ct * sx + cy2 * (lam * ct * sx - st * sy);
    const ty = f - cy2 + cx2 * st * sx + cy2 * (lam * st * sx + ct * sy);
    return {
      // Return the affine parameters
      scaleX: sx,
      scaleY: sy,
      shear: lam,
      rotate: theta,
      translateX: tx,
      translateY: ty,
      originX: cx2,
      originY: cy2,
      // Return the matrix parameters
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    };
  }
  // Check if two matrices are equal
  equals(other) {
    if (other === this)
      return true;
    const comp = new Matrix(other);
    return closeEnough(this.a, comp.a) && closeEnough(this.b, comp.b) && closeEnough(this.c, comp.c) && closeEnough(this.d, comp.d) && closeEnough(this.e, comp.e) && closeEnough(this.f, comp.f);
  }
  // Flip matrix on x or y, at a given offset
  flip(axis, around) {
    return this.clone().flipO(axis, around);
  }
  flipO(axis, around) {
    return axis === "x" ? this.scaleO(-1, 1, around, 0) : axis === "y" ? this.scaleO(1, -1, 0, around) : this.scaleO(-1, -1, axis, around || axis);
  }
  // Initialize
  init(source) {
    const base = Matrix.fromArray([1, 0, 0, 1, 0, 0]);
    source = source instanceof Element ? source.matrixify() : typeof source === "string" ? Matrix.fromArray(source.split(delimiter).map(parseFloat)) : Array.isArray(source) ? Matrix.fromArray(source) : typeof source === "object" && Matrix.isMatrixLike(source) ? source : typeof source === "object" ? new Matrix().transform(source) : arguments.length === 6 ? Matrix.fromArray([].slice.call(arguments)) : base;
    this.a = source.a != null ? source.a : base.a;
    this.b = source.b != null ? source.b : base.b;
    this.c = source.c != null ? source.c : base.c;
    this.d = source.d != null ? source.d : base.d;
    this.e = source.e != null ? source.e : base.e;
    this.f = source.f != null ? source.f : base.f;
    return this;
  }
  inverse() {
    return this.clone().inverseO();
  }
  // Inverses matrix
  inverseO() {
    const a = this.a;
    const b = this.b;
    const c = this.c;
    const d = this.d;
    const e = this.e;
    const f = this.f;
    const det = a * d - b * c;
    if (!det)
      throw new Error("Cannot invert " + this);
    const na = d / det;
    const nb = -b / det;
    const nc = -c / det;
    const nd = a / det;
    const ne = -(na * e + nc * f);
    const nf = -(nb * e + nd * f);
    this.a = na;
    this.b = nb;
    this.c = nc;
    this.d = nd;
    this.e = ne;
    this.f = nf;
    return this;
  }
  lmultiply(matrix) {
    return this.clone().lmultiplyO(matrix);
  }
  lmultiplyO(matrix) {
    const r = this;
    const l = matrix instanceof Matrix ? matrix : new Matrix(matrix);
    return Matrix.matrixMultiply(l, r, this);
  }
  // Left multiplies by the given matrix
  multiply(matrix) {
    return this.clone().multiplyO(matrix);
  }
  multiplyO(matrix) {
    const l = this;
    const r = matrix instanceof Matrix ? matrix : new Matrix(matrix);
    return Matrix.matrixMultiply(l, r, this);
  }
  // Rotate matrix
  rotate(r, cx2, cy2) {
    return this.clone().rotateO(r, cx2, cy2);
  }
  rotateO(r, cx2 = 0, cy2 = 0) {
    r = radians(r);
    const cos = Math.cos(r);
    const sin = Math.sin(r);
    const {
      a,
      b,
      c,
      d,
      e,
      f
    } = this;
    this.a = a * cos - b * sin;
    this.b = b * cos + a * sin;
    this.c = c * cos - d * sin;
    this.d = d * cos + c * sin;
    this.e = e * cos - f * sin + cy2 * sin - cx2 * cos + cx2;
    this.f = f * cos + e * sin - cx2 * sin - cy2 * cos + cy2;
    return this;
  }
  // Scale matrix
  scale(x2, y2, cx2, cy2) {
    return this.clone().scaleO(...arguments);
  }
  scaleO(x2, y2 = x2, cx2 = 0, cy2 = 0) {
    if (arguments.length === 3) {
      cy2 = cx2;
      cx2 = y2;
      y2 = x2;
    }
    const {
      a,
      b,
      c,
      d,
      e,
      f
    } = this;
    this.a = a * x2;
    this.b = b * y2;
    this.c = c * x2;
    this.d = d * y2;
    this.e = e * x2 - cx2 * x2 + cx2;
    this.f = f * y2 - cy2 * y2 + cy2;
    return this;
  }
  // Shear matrix
  shear(a, cx2, cy2) {
    return this.clone().shearO(a, cx2, cy2);
  }
  shearO(lx, cx2 = 0, cy2 = 0) {
    const {
      a,
      b,
      c,
      d,
      e,
      f
    } = this;
    this.a = a + b * lx;
    this.c = c + d * lx;
    this.e = e + f * lx - cy2 * lx;
    return this;
  }
  // Skew Matrix
  skew(x2, y2, cx2, cy2) {
    return this.clone().skewO(...arguments);
  }
  skewO(x2, y2 = x2, cx2 = 0, cy2 = 0) {
    if (arguments.length === 3) {
      cy2 = cx2;
      cx2 = y2;
      y2 = x2;
    }
    x2 = radians(x2);
    y2 = radians(y2);
    const lx = Math.tan(x2);
    const ly = Math.tan(y2);
    const {
      a,
      b,
      c,
      d,
      e,
      f
    } = this;
    this.a = a + b * lx;
    this.b = b + a * ly;
    this.c = c + d * lx;
    this.d = d + c * ly;
    this.e = e + f * lx - cy2 * lx;
    this.f = f + e * ly - cx2 * ly;
    return this;
  }
  // SkewX
  skewX(x2, cx2, cy2) {
    return this.skew(x2, 0, cx2, cy2);
  }
  // SkewY
  skewY(y2, cx2, cy2) {
    return this.skew(0, y2, cx2, cy2);
  }
  toArray() {
    return [this.a, this.b, this.c, this.d, this.e, this.f];
  }
  // Convert matrix to string
  toString() {
    return "matrix(" + this.a + "," + this.b + "," + this.c + "," + this.d + "," + this.e + "," + this.f + ")";
  }
  // Transform a matrix into another matrix by manipulating the space
  transform(o) {
    if (Matrix.isMatrixLike(o)) {
      const matrix = new Matrix(o);
      return matrix.multiplyO(this);
    }
    const t = Matrix.formatTransforms(o);
    const current = this;
    const {
      x: ox,
      y: oy
    } = new Point(t.ox, t.oy).transform(current);
    const transformer = new Matrix().translateO(t.rx, t.ry).lmultiplyO(current).translateO(-ox, -oy).scaleO(t.scaleX, t.scaleY).skewO(t.skewX, t.skewY).shearO(t.shear).rotateO(t.theta).translateO(ox, oy);
    if (isFinite(t.px) || isFinite(t.py)) {
      const origin = new Point(ox, oy).transform(transformer);
      const dx2 = isFinite(t.px) ? t.px - origin.x : 0;
      const dy2 = isFinite(t.py) ? t.py - origin.y : 0;
      transformer.translateO(dx2, dy2);
    }
    transformer.translateO(t.tx, t.ty);
    return transformer;
  }
  // Translate matrix
  translate(x2, y2) {
    return this.clone().translateO(x2, y2);
  }
  translateO(x2, y2) {
    this.e += x2 || 0;
    this.f += y2 || 0;
    return this;
  }
  valueOf() {
    return {
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    };
  }
};
function ctm() {
  return new Matrix(this.node.getCTM());
}
function screenCTM() {
  if (typeof this.isRoot === "function" && !this.isRoot()) {
    const rect = this.rect(1, 1);
    const m = rect.node.getScreenCTM();
    rect.remove();
    return new Matrix(m);
  }
  return new Matrix(this.node.getScreenCTM());
}
register(Matrix, "Matrix");
function parser() {
  if (!parser.nodes) {
    const svg2 = makeInstance().size(2, 0);
    svg2.node.style.cssText = ["opacity: 0", "position: absolute", "left: -100%", "top: -100%", "overflow: hidden"].join(";");
    svg2.attr("focusable", "false");
    svg2.attr("aria-hidden", "true");
    const path = svg2.path().node;
    parser.nodes = {
      svg: svg2,
      path
    };
  }
  if (!parser.nodes.svg.node.parentNode) {
    const b = globals.document.body || globals.document.documentElement;
    parser.nodes.svg.addTo(b);
  }
  return parser.nodes;
}
function isNulledBox(box) {
  return !box.width && !box.height && !box.x && !box.y;
}
function domContains(node) {
  return node === globals.document || (globals.document.documentElement.contains || function(node2) {
    while (node2.parentNode) {
      node2 = node2.parentNode;
    }
    return node2 === globals.document;
  }).call(globals.document.documentElement, node);
}
var Box = class {
  constructor(...args) {
    this.init(...args);
  }
  addOffset() {
    this.x += globals.window.pageXOffset;
    this.y += globals.window.pageYOffset;
    return new Box(this);
  }
  init(source) {
    const base = [0, 0, 0, 0];
    source = typeof source === "string" ? source.split(delimiter).map(parseFloat) : Array.isArray(source) ? source : typeof source === "object" ? [source.left != null ? source.left : source.x, source.top != null ? source.top : source.y, source.width, source.height] : arguments.length === 4 ? [].slice.call(arguments) : base;
    this.x = source[0] || 0;
    this.y = source[1] || 0;
    this.width = this.w = source[2] || 0;
    this.height = this.h = source[3] || 0;
    this.x2 = this.x + this.w;
    this.y2 = this.y + this.h;
    this.cx = this.x + this.w / 2;
    this.cy = this.y + this.h / 2;
    return this;
  }
  isNulled() {
    return isNulledBox(this);
  }
  // Merge rect box with another, return a new instance
  merge(box) {
    const x2 = Math.min(this.x, box.x);
    const y2 = Math.min(this.y, box.y);
    const width2 = Math.max(this.x + this.width, box.x + box.width) - x2;
    const height2 = Math.max(this.y + this.height, box.y + box.height) - y2;
    return new Box(x2, y2, width2, height2);
  }
  toArray() {
    return [this.x, this.y, this.width, this.height];
  }
  toString() {
    return this.x + " " + this.y + " " + this.width + " " + this.height;
  }
  transform(m) {
    if (!(m instanceof Matrix)) {
      m = new Matrix(m);
    }
    let xMin = Infinity;
    let xMax = -Infinity;
    let yMin = Infinity;
    let yMax = -Infinity;
    const pts = [new Point(this.x, this.y), new Point(this.x2, this.y), new Point(this.x, this.y2), new Point(this.x2, this.y2)];
    pts.forEach(function(p) {
      p = p.transform(m);
      xMin = Math.min(xMin, p.x);
      xMax = Math.max(xMax, p.x);
      yMin = Math.min(yMin, p.y);
      yMax = Math.max(yMax, p.y);
    });
    return new Box(xMin, yMin, xMax - xMin, yMax - yMin);
  }
};
function getBox(el, getBBoxFn, retry) {
  let box;
  try {
    box = getBBoxFn(el.node);
    if (isNulledBox(box) && !domContains(el.node)) {
      throw new Error("Element not in the dom");
    }
  } catch (e) {
    box = retry(el);
  }
  return box;
}
function bbox() {
  const getBBox = (node) => node.getBBox();
  const retry = (el) => {
    try {
      const clone = el.clone().addTo(parser().svg).show();
      const box2 = clone.node.getBBox();
      clone.remove();
      return box2;
    } catch (e) {
      throw new Error(`Getting bbox of element "${el.node.nodeName}" is not possible: ${e.toString()}`);
    }
  };
  const box = getBox(this, getBBox, retry);
  const bbox2 = new Box(box);
  return bbox2;
}
function rbox(el) {
  const getRBox = (node) => node.getBoundingClientRect();
  const retry = (el2) => {
    throw new Error(`Getting rbox of element "${el2.node.nodeName}" is not possible`);
  };
  const box = getBox(this, getRBox, retry);
  const rbox2 = new Box(box);
  if (el) {
    return rbox2.transform(el.screenCTM().inverseO());
  }
  return rbox2.addOffset();
}
function inside(x2, y2) {
  const box = this.bbox();
  return x2 > box.x && y2 > box.y && x2 < box.x + box.width && y2 < box.y + box.height;
}
registerMethods({
  viewbox: {
    viewbox(x2, y2, width2, height2) {
      if (x2 == null)
        return new Box(this.attr("viewBox"));
      return this.attr("viewBox", new Box(x2, y2, width2, height2));
    },
    zoom(level, point2) {
      let {
        width: width2,
        height: height2
      } = this.attr(["width", "height"]);
      if (!width2 && !height2 || typeof width2 === "string" || typeof height2 === "string") {
        width2 = this.node.clientWidth;
        height2 = this.node.clientHeight;
      }
      if (!width2 || !height2) {
        throw new Error("Impossible to get absolute width and height. Please provide an absolute width and height attribute on the zooming element");
      }
      const v = this.viewbox();
      const zoomX = width2 / v.width;
      const zoomY = height2 / v.height;
      const zoom = Math.min(zoomX, zoomY);
      if (level == null) {
        return zoom;
      }
      let zoomAmount = zoom / level;
      if (zoomAmount === Infinity)
        zoomAmount = Number.MAX_SAFE_INTEGER / 100;
      point2 = point2 || new Point(width2 / 2 / zoomX + v.x, height2 / 2 / zoomY + v.y);
      const box = new Box(v).transform(new Matrix({
        scale: zoomAmount,
        origin: point2
      }));
      return this.viewbox(box);
    }
  }
});
register(Box, "Box");
var List = class extends Array {
  constructor(arr = [], ...args) {
    super(arr, ...args);
    if (typeof arr === "number")
      return this;
    this.length = 0;
    this.push(...arr);
  }
};
extend([List], {
  each(fnOrMethodName, ...args) {
    if (typeof fnOrMethodName === "function") {
      return this.map((el, i, arr) => {
        return fnOrMethodName.call(el, el, i, arr);
      });
    } else {
      return this.map((el) => {
        return el[fnOrMethodName](...args);
      });
    }
  },
  toArray() {
    return Array.prototype.concat.apply([], this);
  }
});
var reserved = ["toArray", "constructor", "each"];
List.extend = function(methods2) {
  methods2 = methods2.reduce((obj, name) => {
    if (reserved.includes(name))
      return obj;
    if (name[0] === "_")
      return obj;
    obj[name] = function(...attrs2) {
      return this.each(name, ...attrs2);
    };
    return obj;
  }, {});
  extend([List], methods2);
};
function baseFind(query, parent) {
  return new List(map((parent || globals.document).querySelectorAll(query), function(node) {
    return adopt(node);
  }));
}
function find(query) {
  return baseFind(query, this.node);
}
function findOne(query) {
  return adopt(this.node.querySelector(query));
}
var listenerId = 0;
var windowEvents = {};
function getEvents(instance) {
  let n = instance.getEventHolder();
  if (n === globals.window)
    n = windowEvents;
  if (!n.events)
    n.events = {};
  return n.events;
}
function getEventTarget(instance) {
  return instance.getEventTarget();
}
function clearEvents(instance) {
  let n = instance.getEventHolder();
  if (n === globals.window)
    n = windowEvents;
  if (n.events)
    n.events = {};
}
function on(node, events, listener, binding, options) {
  const l = listener.bind(binding || node);
  const instance = makeInstance(node);
  const bag = getEvents(instance);
  const n = getEventTarget(instance);
  events = Array.isArray(events) ? events : events.split(delimiter);
  if (!listener._svgjsListenerId) {
    listener._svgjsListenerId = ++listenerId;
  }
  events.forEach(function(event) {
    const ev = event.split(".")[0];
    const ns = event.split(".")[1] || "*";
    bag[ev] = bag[ev] || {};
    bag[ev][ns] = bag[ev][ns] || {};
    bag[ev][ns][listener._svgjsListenerId] = l;
    n.addEventListener(ev, l, options || false);
  });
}
function off(node, events, listener, options) {
  const instance = makeInstance(node);
  const bag = getEvents(instance);
  const n = getEventTarget(instance);
  if (typeof listener === "function") {
    listener = listener._svgjsListenerId;
    if (!listener)
      return;
  }
  events = Array.isArray(events) ? events : (events || "").split(delimiter);
  events.forEach(function(event) {
    const ev = event && event.split(".")[0];
    const ns = event && event.split(".")[1];
    let namespace, l;
    if (listener) {
      if (bag[ev] && bag[ev][ns || "*"]) {
        n.removeEventListener(ev, bag[ev][ns || "*"][listener], options || false);
        delete bag[ev][ns || "*"][listener];
      }
    } else if (ev && ns) {
      if (bag[ev] && bag[ev][ns]) {
        for (l in bag[ev][ns]) {
          off(n, [ev, ns].join("."), l);
        }
        delete bag[ev][ns];
      }
    } else if (ns) {
      for (event in bag) {
        for (namespace in bag[event]) {
          if (ns === namespace) {
            off(n, [event, ns].join("."));
          }
        }
      }
    } else if (ev) {
      if (bag[ev]) {
        for (namespace in bag[ev]) {
          off(n, [ev, namespace].join("."));
        }
        delete bag[ev];
      }
    } else {
      for (event in bag) {
        off(n, event);
      }
      clearEvents(instance);
    }
  });
}
function dispatch(node, event, data2, options) {
  const n = getEventTarget(node);
  if (event instanceof globals.window.Event) {
    n.dispatchEvent(event);
  } else {
    event = new globals.window.CustomEvent(event, {
      detail: data2,
      cancelable: true,
      ...options
    });
    n.dispatchEvent(event);
  }
  return event;
}
var EventTarget = class extends Base {
  addEventListener() {
  }
  dispatch(event, data2, options) {
    return dispatch(this, event, data2, options);
  }
  dispatchEvent(event) {
    const bag = this.getEventHolder().events;
    if (!bag)
      return true;
    const events = bag[event.type];
    for (const i in events) {
      for (const j in events[i]) {
        events[i][j](event);
      }
    }
    return !event.defaultPrevented;
  }
  // Fire given event
  fire(event, data2, options) {
    this.dispatch(event, data2, options);
    return this;
  }
  getEventHolder() {
    return this;
  }
  getEventTarget() {
    return this;
  }
  // Unbind event from listener
  off(event, listener, options) {
    off(this, event, listener, options);
    return this;
  }
  // Bind given event to listener
  on(event, listener, binding, options) {
    on(this, event, listener, binding, options);
    return this;
  }
  removeEventListener() {
  }
};
register(EventTarget, "EventTarget");
function noop() {
}
var timeline = {
  duration: 400,
  ease: ">",
  delay: 0
};
var attrs = {
  // fill and stroke
  "fill-opacity": 1,
  "stroke-opacity": 1,
  "stroke-width": 0,
  "stroke-linejoin": "miter",
  "stroke-linecap": "butt",
  fill: "#000000",
  stroke: "#000000",
  opacity: 1,
  // position
  x: 0,
  y: 0,
  cx: 0,
  cy: 0,
  // size
  width: 0,
  height: 0,
  // radius
  r: 0,
  rx: 0,
  ry: 0,
  // gradient
  offset: 0,
  "stop-opacity": 1,
  "stop-color": "#000000",
  // text
  "text-anchor": "start"
};
var defaults = {
  __proto__: null,
  noop,
  timeline,
  attrs
};
var SVGArray = class extends Array {
  constructor(...args) {
    super(...args);
    this.init(...args);
  }
  clone() {
    return new this.constructor(this);
  }
  init(arr) {
    if (typeof arr === "number")
      return this;
    this.length = 0;
    this.push(...this.parse(arr));
    return this;
  }
  // Parse whitespace separated string
  parse(array2 = []) {
    if (array2 instanceof Array)
      return array2;
    return array2.trim().split(delimiter).map(parseFloat);
  }
  toArray() {
    return Array.prototype.concat.apply([], this);
  }
  toSet() {
    return new Set(this);
  }
  toString() {
    return this.join(" ");
  }
  // Flattens the array if needed
  valueOf() {
    const ret = [];
    ret.push(...this);
    return ret;
  }
};
var SVGNumber = class {
  // Initialize
  constructor(...args) {
    this.init(...args);
  }
  convert(unit) {
    return new SVGNumber(this.value, unit);
  }
  // Divide number
  divide(number) {
    number = new SVGNumber(number);
    return new SVGNumber(this / number, this.unit || number.unit);
  }
  init(value, unit) {
    unit = Array.isArray(value) ? value[1] : unit;
    value = Array.isArray(value) ? value[0] : value;
    this.value = 0;
    this.unit = unit || "";
    if (typeof value === "number") {
      this.value = isNaN(value) ? 0 : !isFinite(value) ? value < 0 ? -34e37 : 34e37 : value;
    } else if (typeof value === "string") {
      unit = value.match(numberAndUnit);
      if (unit) {
        this.value = parseFloat(unit[1]);
        if (unit[5] === "%") {
          this.value /= 100;
        } else if (unit[5] === "s") {
          this.value *= 1e3;
        }
        this.unit = unit[5];
      }
    } else {
      if (value instanceof SVGNumber) {
        this.value = value.valueOf();
        this.unit = value.unit;
      }
    }
    return this;
  }
  // Subtract number
  minus(number) {
    number = new SVGNumber(number);
    return new SVGNumber(this - number, this.unit || number.unit);
  }
  // Add number
  plus(number) {
    number = new SVGNumber(number);
    return new SVGNumber(this + number, this.unit || number.unit);
  }
  // Multiply number
  times(number) {
    number = new SVGNumber(number);
    return new SVGNumber(this * number, this.unit || number.unit);
  }
  toArray() {
    return [this.value, this.unit];
  }
  toJSON() {
    return this.toString();
  }
  toString() {
    return (this.unit === "%" ? ~~(this.value * 1e8) / 1e6 : this.unit === "s" ? this.value / 1e3 : this.value) + this.unit;
  }
  valueOf() {
    return this.value;
  }
};
var hooks = [];
function registerAttrHook(fn) {
  hooks.push(fn);
}
function attr(attr2, val, ns) {
  if (attr2 == null) {
    attr2 = {};
    val = this.node.attributes;
    for (const node of val) {
      attr2[node.nodeName] = isNumber.test(node.nodeValue) ? parseFloat(node.nodeValue) : node.nodeValue;
    }
    return attr2;
  } else if (attr2 instanceof Array) {
    return attr2.reduce((last, curr) => {
      last[curr] = this.attr(curr);
      return last;
    }, {});
  } else if (typeof attr2 === "object" && attr2.constructor === Object) {
    for (val in attr2)
      this.attr(val, attr2[val]);
  } else if (val === null) {
    this.node.removeAttribute(attr2);
  } else if (val == null) {
    val = this.node.getAttribute(attr2);
    return val == null ? attrs[attr2] : isNumber.test(val) ? parseFloat(val) : val;
  } else {
    val = hooks.reduce((_val, hook) => {
      return hook(attr2, _val, this);
    }, val);
    if (typeof val === "number") {
      val = new SVGNumber(val);
    } else if (Color.isColor(val)) {
      val = new Color(val);
    } else if (val.constructor === Array) {
      val = new SVGArray(val);
    }
    if (attr2 === "leading") {
      if (this.leading) {
        this.leading(val);
      }
    } else {
      typeof ns === "string" ? this.node.setAttributeNS(ns, attr2, val.toString()) : this.node.setAttribute(attr2, val.toString());
    }
    if (this.rebuild && (attr2 === "font-size" || attr2 === "x")) {
      this.rebuild();
    }
  }
  return this;
}
var Dom = class extends EventTarget {
  constructor(node, attrs2) {
    super();
    this.node = node;
    this.type = node.nodeName;
    if (attrs2 && node !== attrs2) {
      this.attr(attrs2);
    }
  }
  // Add given element at a position
  add(element, i) {
    element = makeInstance(element);
    if (element.removeNamespace && this.node instanceof globals.window.SVGElement) {
      element.removeNamespace();
    }
    if (i == null) {
      this.node.appendChild(element.node);
    } else if (element.node !== this.node.childNodes[i]) {
      this.node.insertBefore(element.node, this.node.childNodes[i]);
    }
    return this;
  }
  // Add element to given container and return self
  addTo(parent, i) {
    return makeInstance(parent).put(this, i);
  }
  // Returns all child elements
  children() {
    return new List(map(this.node.children, function(node) {
      return adopt(node);
    }));
  }
  // Remove all elements in this container
  clear() {
    while (this.node.hasChildNodes()) {
      this.node.removeChild(this.node.lastChild);
    }
    return this;
  }
  // Clone element
  clone(deep = true) {
    this.writeDataToDom();
    return new this.constructor(assignNewId(this.node.cloneNode(deep)));
  }
  // Iterates over all children and invokes a given block
  each(block, deep) {
    const children = this.children();
    let i, il;
    for (i = 0, il = children.length; i < il; i++) {
      block.apply(children[i], [i, children]);
      if (deep) {
        children[i].each(block, deep);
      }
    }
    return this;
  }
  element(nodeName, attrs2) {
    return this.put(new Dom(create(nodeName), attrs2));
  }
  // Get first child
  first() {
    return adopt(this.node.firstChild);
  }
  // Get a element at the given index
  get(i) {
    return adopt(this.node.childNodes[i]);
  }
  getEventHolder() {
    return this.node;
  }
  getEventTarget() {
    return this.node;
  }
  // Checks if the given element is a child
  has(element) {
    return this.index(element) >= 0;
  }
  html(htmlOrFn, outerHTML) {
    return this.xml(htmlOrFn, outerHTML, html);
  }
  // Get / set id
  id(id) {
    if (typeof id === "undefined" && !this.node.id) {
      this.node.id = eid(this.type);
    }
    return this.attr("id", id);
  }
  // Gets index of given element
  index(element) {
    return [].slice.call(this.node.childNodes).indexOf(element.node);
  }
  // Get the last child
  last() {
    return adopt(this.node.lastChild);
  }
  // matches the element vs a css selector
  matches(selector) {
    const el = this.node;
    const matcher = el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector || null;
    return matcher && matcher.call(el, selector);
  }
  // Returns the parent element instance
  parent(type) {
    let parent = this;
    if (!parent.node.parentNode)
      return null;
    parent = adopt(parent.node.parentNode);
    if (!type)
      return parent;
    do {
      if (typeof type === "string" ? parent.matches(type) : parent instanceof type)
        return parent;
    } while (parent = adopt(parent.node.parentNode));
    return parent;
  }
  // Basically does the same as `add()` but returns the added element instead
  put(element, i) {
    element = makeInstance(element);
    this.add(element, i);
    return element;
  }
  // Add element to given container and return container
  putIn(parent, i) {
    return makeInstance(parent).add(this, i);
  }
  // Remove element
  remove() {
    if (this.parent()) {
      this.parent().removeElement(this);
    }
    return this;
  }
  // Remove a given child
  removeElement(element) {
    this.node.removeChild(element.node);
    return this;
  }
  // Replace this with element
  replace(element) {
    element = makeInstance(element);
    if (this.node.parentNode) {
      this.node.parentNode.replaceChild(element.node, this.node);
    }
    return element;
  }
  round(precision = 2, map2 = null) {
    const factor = 10 ** precision;
    const attrs2 = this.attr(map2);
    for (const i in attrs2) {
      if (typeof attrs2[i] === "number") {
        attrs2[i] = Math.round(attrs2[i] * factor) / factor;
      }
    }
    this.attr(attrs2);
    return this;
  }
  // Import / Export raw svg
  svg(svgOrFn, outerSVG) {
    return this.xml(svgOrFn, outerSVG, svg);
  }
  // Return id on string conversion
  toString() {
    return this.id();
  }
  words(text) {
    this.node.textContent = text;
    return this;
  }
  wrap(node) {
    const parent = this.parent();
    if (!parent) {
      return this.addTo(node);
    }
    const position2 = parent.index(this);
    return parent.put(node, position2).put(this);
  }
  // write svgjs data to the dom
  writeDataToDom() {
    this.each(function() {
      this.writeDataToDom();
    });
    return this;
  }
  // Import / Export raw svg
  xml(xmlOrFn, outerXML, ns) {
    if (typeof xmlOrFn === "boolean") {
      ns = outerXML;
      outerXML = xmlOrFn;
      xmlOrFn = null;
    }
    if (xmlOrFn == null || typeof xmlOrFn === "function") {
      outerXML = outerXML == null ? true : outerXML;
      this.writeDataToDom();
      let current = this;
      if (xmlOrFn != null) {
        current = adopt(current.node.cloneNode(true));
        if (outerXML) {
          const result = xmlOrFn(current);
          current = result || current;
          if (result === false)
            return "";
        }
        current.each(function() {
          const result = xmlOrFn(this);
          const _this = result || this;
          if (result === false) {
            this.remove();
          } else if (result && this !== _this) {
            this.replace(_this);
          }
        }, true);
      }
      return outerXML ? current.node.outerHTML : current.node.innerHTML;
    }
    outerXML = outerXML == null ? false : outerXML;
    const well = create("wrapper", ns);
    const fragment = globals.document.createDocumentFragment();
    well.innerHTML = xmlOrFn;
    for (let len = well.children.length; len--; ) {
      fragment.appendChild(well.firstElementChild);
    }
    const parent = this.parent();
    return outerXML ? this.replace(fragment) && parent : this.add(fragment);
  }
};
extend(Dom, {
  attr,
  find,
  findOne
});
register(Dom, "Dom");
var Element = class extends Dom {
  constructor(node, attrs2) {
    super(node, attrs2);
    this.dom = {};
    this.node.instance = this;
    if (node.hasAttribute("svgjs:data")) {
      this.setData(JSON.parse(node.getAttribute("svgjs:data")) || {});
    }
  }
  // Move element by its center
  center(x2, y2) {
    return this.cx(x2).cy(y2);
  }
  // Move by center over x-axis
  cx(x2) {
    return x2 == null ? this.x() + this.width() / 2 : this.x(x2 - this.width() / 2);
  }
  // Move by center over y-axis
  cy(y2) {
    return y2 == null ? this.y() + this.height() / 2 : this.y(y2 - this.height() / 2);
  }
  // Get defs
  defs() {
    const root2 = this.root();
    return root2 && root2.defs();
  }
  // Relative move over x and y axes
  dmove(x2, y2) {
    return this.dx(x2).dy(y2);
  }
  // Relative move over x axis
  dx(x2 = 0) {
    return this.x(new SVGNumber(x2).plus(this.x()));
  }
  // Relative move over y axis
  dy(y2 = 0) {
    return this.y(new SVGNumber(y2).plus(this.y()));
  }
  getEventHolder() {
    return this;
  }
  // Set height of element
  height(height2) {
    return this.attr("height", height2);
  }
  // Move element to given x and y values
  move(x2, y2) {
    return this.x(x2).y(y2);
  }
  // return array of all ancestors of given type up to the root svg
  parents(until = this.root()) {
    const isSelector = typeof until === "string";
    if (!isSelector) {
      until = makeInstance(until);
    }
    const parents = new List();
    let parent = this;
    while ((parent = parent.parent()) && parent.node !== globals.document && parent.nodeName !== "#document-fragment") {
      parents.push(parent);
      if (!isSelector && parent.node === until.node) {
        break;
      }
      if (isSelector && parent.matches(until)) {
        break;
      }
      if (parent.node === this.root().node) {
        return null;
      }
    }
    return parents;
  }
  // Get referenced element form attribute value
  reference(attr2) {
    attr2 = this.attr(attr2);
    if (!attr2)
      return null;
    const m = (attr2 + "").match(reference);
    return m ? makeInstance(m[1]) : null;
  }
  // Get parent document
  root() {
    const p = this.parent(getClass(root));
    return p && p.root();
  }
  // set given data to the elements data property
  setData(o) {
    this.dom = o;
    return this;
  }
  // Set element size to given width and height
  size(width2, height2) {
    const p = proportionalSize(this, width2, height2);
    return this.width(new SVGNumber(p.width)).height(new SVGNumber(p.height));
  }
  // Set width of element
  width(width2) {
    return this.attr("width", width2);
  }
  // write svgjs data to the dom
  writeDataToDom() {
    this.node.removeAttribute("svgjs:data");
    if (Object.keys(this.dom).length) {
      this.node.setAttribute("svgjs:data", JSON.stringify(this.dom));
    }
    return super.writeDataToDom();
  }
  // Move over x-axis
  x(x2) {
    return this.attr("x", x2);
  }
  // Move over y-axis
  y(y2) {
    return this.attr("y", y2);
  }
};
extend(Element, {
  bbox,
  rbox,
  inside,
  point,
  ctm,
  screenCTM
});
register(Element, "Element");
var sugar = {
  stroke: ["color", "width", "opacity", "linecap", "linejoin", "miterlimit", "dasharray", "dashoffset"],
  fill: ["color", "opacity", "rule"],
  prefix: function(t, a) {
    return a === "color" ? t : t + "-" + a;
  }
};
["fill", "stroke"].forEach(function(m) {
  const extension = {};
  let i;
  extension[m] = function(o) {
    if (typeof o === "undefined") {
      return this.attr(m);
    }
    if (typeof o === "string" || o instanceof Color || Color.isRgb(o) || o instanceof Element) {
      this.attr(m, o);
    } else {
      for (i = sugar[m].length - 1; i >= 0; i--) {
        if (o[sugar[m][i]] != null) {
          this.attr(sugar.prefix(m, sugar[m][i]), o[sugar[m][i]]);
        }
      }
    }
    return this;
  };
  registerMethods(["Element", "Runner"], extension);
});
registerMethods(["Element", "Runner"], {
  // Let the user set the matrix directly
  matrix: function(mat, b, c, d, e, f) {
    if (mat == null) {
      return new Matrix(this);
    }
    return this.attr("transform", new Matrix(mat, b, c, d, e, f));
  },
  // Map rotation to transform
  rotate: function(angle, cx2, cy2) {
    return this.transform({
      rotate: angle,
      ox: cx2,
      oy: cy2
    }, true);
  },
  // Map skew to transform
  skew: function(x2, y2, cx2, cy2) {
    return arguments.length === 1 || arguments.length === 3 ? this.transform({
      skew: x2,
      ox: y2,
      oy: cx2
    }, true) : this.transform({
      skew: [x2, y2],
      ox: cx2,
      oy: cy2
    }, true);
  },
  shear: function(lam, cx2, cy2) {
    return this.transform({
      shear: lam,
      ox: cx2,
      oy: cy2
    }, true);
  },
  // Map scale to transform
  scale: function(x2, y2, cx2, cy2) {
    return arguments.length === 1 || arguments.length === 3 ? this.transform({
      scale: x2,
      ox: y2,
      oy: cx2
    }, true) : this.transform({
      scale: [x2, y2],
      ox: cx2,
      oy: cy2
    }, true);
  },
  // Map translate to transform
  translate: function(x2, y2) {
    return this.transform({
      translate: [x2, y2]
    }, true);
  },
  // Map relative translations to transform
  relative: function(x2, y2) {
    return this.transform({
      relative: [x2, y2]
    }, true);
  },
  // Map flip to transform
  flip: function(direction = "both", origin = "center") {
    if ("xybothtrue".indexOf(direction) === -1) {
      origin = direction;
      direction = "both";
    }
    return this.transform({
      flip: direction,
      origin
    }, true);
  },
  // Opacity
  opacity: function(value) {
    return this.attr("opacity", value);
  }
});
registerMethods("radius", {
  // Add x and y radius
  radius: function(x2, y2 = x2) {
    const type = (this._element || this).type;
    return type === "radialGradient" ? this.attr("r", new SVGNumber(x2)) : this.rx(x2).ry(y2);
  }
});
registerMethods("Path", {
  // Get path length
  length: function() {
    return this.node.getTotalLength();
  },
  // Get point at length
  pointAt: function(length2) {
    return new Point(this.node.getPointAtLength(length2));
  }
});
registerMethods(["Element", "Runner"], {
  // Set font
  font: function(a, v) {
    if (typeof a === "object") {
      for (v in a)
        this.font(v, a[v]);
      return this;
    }
    return a === "leading" ? this.leading(v) : a === "anchor" ? this.attr("text-anchor", v) : a === "size" || a === "family" || a === "weight" || a === "stretch" || a === "variant" || a === "style" ? this.attr("font-" + a, v) : this.attr(a, v);
  }
});
var methods = ["click", "dblclick", "mousedown", "mouseup", "mouseover", "mouseout", "mousemove", "mouseenter", "mouseleave", "touchstart", "touchmove", "touchleave", "touchend", "touchcancel"].reduce(function(last, event) {
  const fn = function(f) {
    if (f === null) {
      this.off(event);
    } else {
      this.on(event, f);
    }
    return this;
  };
  last[event] = fn;
  return last;
}, {});
registerMethods("Element", methods);
function untransform() {
  return this.attr("transform", null);
}
function matrixify() {
  const matrix = (this.attr("transform") || "").split(transforms).slice(0, -1).map(function(str) {
    const kv = str.trim().split("(");
    return [kv[0], kv[1].split(delimiter).map(function(str2) {
      return parseFloat(str2);
    })];
  }).reverse().reduce(function(matrix2, transform2) {
    if (transform2[0] === "matrix") {
      return matrix2.lmultiply(Matrix.fromArray(transform2[1]));
    }
    return matrix2[transform2[0]].apply(matrix2, transform2[1]);
  }, new Matrix());
  return matrix;
}
function toParent(parent, i) {
  if (this === parent)
    return this;
  const ctm2 = this.screenCTM();
  const pCtm = parent.screenCTM().inverse();
  this.addTo(parent, i).untransform().transform(pCtm.multiply(ctm2));
  return this;
}
function toRoot(i) {
  return this.toParent(this.root(), i);
}
function transform(o, relative) {
  if (o == null || typeof o === "string") {
    const decomposed = new Matrix(this).decompose();
    return o == null ? decomposed : decomposed[o];
  }
  if (!Matrix.isMatrixLike(o)) {
    o = {
      ...o,
      origin: getOrigin(o, this)
    };
  }
  const cleanRelative = relative === true ? this : relative || false;
  const result = new Matrix(cleanRelative).transform(o);
  return this.attr("transform", result);
}
registerMethods("Element", {
  untransform,
  matrixify,
  toParent,
  toRoot,
  transform
});
var Container = class extends Element {
  flatten(parent = this, index) {
    this.each(function() {
      if (this instanceof Container) {
        return this.flatten().ungroup();
      }
    });
    return this;
  }
  ungroup(parent = this.parent(), index = parent.index(this)) {
    index = index === -1 ? parent.children().length : index;
    this.each(function(i, children) {
      return children[children.length - i - 1].toParent(parent, index);
    });
    return this.remove();
  }
};
register(Container, "Container");
var Defs = class extends Container {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("defs", node), attrs2);
  }
  flatten() {
    return this;
  }
  ungroup() {
    return this;
  }
};
register(Defs, "Defs");
var Shape = class extends Element {
};
register(Shape, "Shape");
function rx(rx2) {
  return this.attr("rx", rx2);
}
function ry(ry2) {
  return this.attr("ry", ry2);
}
function x$3(x2) {
  return x2 == null ? this.cx() - this.rx() : this.cx(x2 + this.rx());
}
function y$3(y2) {
  return y2 == null ? this.cy() - this.ry() : this.cy(y2 + this.ry());
}
function cx$1(x2) {
  return this.attr("cx", x2);
}
function cy$1(y2) {
  return this.attr("cy", y2);
}
function width$2(width2) {
  return width2 == null ? this.rx() * 2 : this.rx(new SVGNumber(width2).divide(2));
}
function height$2(height2) {
  return height2 == null ? this.ry() * 2 : this.ry(new SVGNumber(height2).divide(2));
}
var circled = {
  __proto__: null,
  rx,
  ry,
  x: x$3,
  y: y$3,
  cx: cx$1,
  cy: cy$1,
  width: width$2,
  height: height$2
};
var Ellipse = class extends Shape {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("ellipse", node), attrs2);
  }
  size(width2, height2) {
    const p = proportionalSize(this, width2, height2);
    return this.rx(new SVGNumber(p.width).divide(2)).ry(new SVGNumber(p.height).divide(2));
  }
};
extend(Ellipse, circled);
registerMethods("Container", {
  // Create an ellipse
  ellipse: wrapWithAttrCheck(function(width2 = 0, height2 = width2) {
    return this.put(new Ellipse()).size(width2, height2).move(0, 0);
  })
});
register(Ellipse, "Ellipse");
var Fragment = class extends Dom {
  constructor(node = globals.document.createDocumentFragment()) {
    super(node);
  }
  // Import / Export raw xml
  xml(xmlOrFn, outerXML, ns) {
    if (typeof xmlOrFn === "boolean") {
      ns = outerXML;
      outerXML = xmlOrFn;
      xmlOrFn = null;
    }
    if (xmlOrFn == null || typeof xmlOrFn === "function") {
      const wrapper = new Dom(create("wrapper", ns));
      wrapper.add(this.node.cloneNode(true));
      return wrapper.xml(false, ns);
    }
    return super.xml(xmlOrFn, false, ns);
  }
};
register(Fragment, "Fragment");
function from(x2, y2) {
  return (this._element || this).type === "radialGradient" ? this.attr({
    fx: new SVGNumber(x2),
    fy: new SVGNumber(y2)
  }) : this.attr({
    x1: new SVGNumber(x2),
    y1: new SVGNumber(y2)
  });
}
function to(x2, y2) {
  return (this._element || this).type === "radialGradient" ? this.attr({
    cx: new SVGNumber(x2),
    cy: new SVGNumber(y2)
  }) : this.attr({
    x2: new SVGNumber(x2),
    y2: new SVGNumber(y2)
  });
}
var gradiented = {
  __proto__: null,
  from,
  to
};
var Gradient = class extends Container {
  constructor(type, attrs2) {
    super(nodeOrNew(type + "Gradient", typeof type === "string" ? null : type), attrs2);
  }
  // custom attr to handle transform
  attr(a, b, c) {
    if (a === "transform")
      a = "gradientTransform";
    return super.attr(a, b, c);
  }
  bbox() {
    return new Box();
  }
  targets() {
    return baseFind('svg [fill*="' + this.id() + '"]');
  }
  // Alias string conversion to fill
  toString() {
    return this.url();
  }
  // Update gradient
  update(block) {
    this.clear();
    if (typeof block === "function") {
      block.call(this, this);
    }
    return this;
  }
  // Return the fill id
  url() {
    return 'url("#' + this.id() + '")';
  }
};
extend(Gradient, gradiented);
registerMethods({
  Container: {
    // Create gradient element in defs
    gradient(...args) {
      return this.defs().gradient(...args);
    }
  },
  // define gradient
  Defs: {
    gradient: wrapWithAttrCheck(function(type, block) {
      return this.put(new Gradient(type)).update(block);
    })
  }
});
register(Gradient, "Gradient");
var Pattern = class extends Container {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("pattern", node), attrs2);
  }
  // custom attr to handle transform
  attr(a, b, c) {
    if (a === "transform")
      a = "patternTransform";
    return super.attr(a, b, c);
  }
  bbox() {
    return new Box();
  }
  targets() {
    return baseFind('svg [fill*="' + this.id() + '"]');
  }
  // Alias string conversion to fill
  toString() {
    return this.url();
  }
  // Update pattern by rebuilding
  update(block) {
    this.clear();
    if (typeof block === "function") {
      block.call(this, this);
    }
    return this;
  }
  // Return the fill id
  url() {
    return 'url("#' + this.id() + '")';
  }
};
registerMethods({
  Container: {
    // Create pattern element in defs
    pattern(...args) {
      return this.defs().pattern(...args);
    }
  },
  Defs: {
    pattern: wrapWithAttrCheck(function(width2, height2, block) {
      return this.put(new Pattern()).update(block).attr({
        x: 0,
        y: 0,
        width: width2,
        height: height2,
        patternUnits: "userSpaceOnUse"
      });
    })
  }
});
register(Pattern, "Pattern");
var Image = class extends Shape {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("image", node), attrs2);
  }
  // (re)load image
  load(url, callback) {
    if (!url)
      return this;
    const img = new globals.window.Image();
    on(img, "load", function(e) {
      const p = this.parent(Pattern);
      if (this.width() === 0 && this.height() === 0) {
        this.size(img.width, img.height);
      }
      if (p instanceof Pattern) {
        if (p.width() === 0 && p.height() === 0) {
          p.size(this.width(), this.height());
        }
      }
      if (typeof callback === "function") {
        callback.call(this, e);
      }
    }, this);
    on(img, "load error", function() {
      off(img);
    });
    return this.attr("href", img.src = url, xlink);
  }
};
registerAttrHook(function(attr2, val, _this) {
  if (attr2 === "fill" || attr2 === "stroke") {
    if (isImage.test(val)) {
      val = _this.root().defs().image(val);
    }
  }
  if (val instanceof Image) {
    val = _this.root().defs().pattern(0, 0, (pattern) => {
      pattern.add(val);
    });
  }
  return val;
});
registerMethods({
  Container: {
    // create image element, load image and set its size
    image: wrapWithAttrCheck(function(source, callback) {
      return this.put(new Image()).size(0, 0).load(source, callback);
    })
  }
});
register(Image, "Image");
var PointArray = class extends SVGArray {
  // Get bounding box of points
  bbox() {
    let maxX = -Infinity;
    let maxY = -Infinity;
    let minX = Infinity;
    let minY = Infinity;
    this.forEach(function(el) {
      maxX = Math.max(el[0], maxX);
      maxY = Math.max(el[1], maxY);
      minX = Math.min(el[0], minX);
      minY = Math.min(el[1], minY);
    });
    return new Box(minX, minY, maxX - minX, maxY - minY);
  }
  // Move point string
  move(x2, y2) {
    const box = this.bbox();
    x2 -= box.x;
    y2 -= box.y;
    if (!isNaN(x2) && !isNaN(y2)) {
      for (let i = this.length - 1; i >= 0; i--) {
        this[i] = [this[i][0] + x2, this[i][1] + y2];
      }
    }
    return this;
  }
  // Parse point string and flat array
  parse(array2 = [0, 0]) {
    const points = [];
    if (array2 instanceof Array) {
      array2 = Array.prototype.concat.apply([], array2);
    } else {
      array2 = array2.trim().split(delimiter).map(parseFloat);
    }
    if (array2.length % 2 !== 0)
      array2.pop();
    for (let i = 0, len = array2.length; i < len; i = i + 2) {
      points.push([array2[i], array2[i + 1]]);
    }
    return points;
  }
  // Resize poly string
  size(width2, height2) {
    let i;
    const box = this.bbox();
    for (i = this.length - 1; i >= 0; i--) {
      if (box.width)
        this[i][0] = (this[i][0] - box.x) * width2 / box.width + box.x;
      if (box.height)
        this[i][1] = (this[i][1] - box.y) * height2 / box.height + box.y;
    }
    return this;
  }
  // Convert array to line object
  toLine() {
    return {
      x1: this[0][0],
      y1: this[0][1],
      x2: this[1][0],
      y2: this[1][1]
    };
  }
  // Convert array to string
  toString() {
    const array2 = [];
    for (let i = 0, il = this.length; i < il; i++) {
      array2.push(this[i].join(","));
    }
    return array2.join(" ");
  }
  transform(m) {
    return this.clone().transformO(m);
  }
  // transform points with matrix (similar to Point.transform)
  transformO(m) {
    if (!Matrix.isMatrixLike(m)) {
      m = new Matrix(m);
    }
    for (let i = this.length; i--; ) {
      const [x2, y2] = this[i];
      this[i][0] = m.a * x2 + m.c * y2 + m.e;
      this[i][1] = m.b * x2 + m.d * y2 + m.f;
    }
    return this;
  }
};
var MorphArray = PointArray;
function x$2(x2) {
  return x2 == null ? this.bbox().x : this.move(x2, this.bbox().y);
}
function y$2(y2) {
  return y2 == null ? this.bbox().y : this.move(this.bbox().x, y2);
}
function width$1(width2) {
  const b = this.bbox();
  return width2 == null ? b.width : this.size(width2, b.height);
}
function height$1(height2) {
  const b = this.bbox();
  return height2 == null ? b.height : this.size(b.width, height2);
}
var pointed = {
  __proto__: null,
  MorphArray,
  x: x$2,
  y: y$2,
  width: width$1,
  height: height$1
};
var Line = class extends Shape {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("line", node), attrs2);
  }
  // Get array
  array() {
    return new PointArray([[this.attr("x1"), this.attr("y1")], [this.attr("x2"), this.attr("y2")]]);
  }
  // Move by left top corner
  move(x2, y2) {
    return this.attr(this.array().move(x2, y2).toLine());
  }
  // Overwrite native plot() method
  plot(x1, y1, x2, y2) {
    if (x1 == null) {
      return this.array();
    } else if (typeof y1 !== "undefined") {
      x1 = {
        x1,
        y1,
        x2,
        y2
      };
    } else {
      x1 = new PointArray(x1).toLine();
    }
    return this.attr(x1);
  }
  // Set element size to given width and height
  size(width2, height2) {
    const p = proportionalSize(this, width2, height2);
    return this.attr(this.array().size(p.width, p.height).toLine());
  }
};
extend(Line, pointed);
registerMethods({
  Container: {
    // Create a line element
    line: wrapWithAttrCheck(function(...args) {
      return Line.prototype.plot.apply(this.put(new Line()), args[0] != null ? args : [0, 0, 0, 0]);
    })
  }
});
register(Line, "Line");
var Marker = class extends Container {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("marker", node), attrs2);
  }
  // Set height of element
  height(height2) {
    return this.attr("markerHeight", height2);
  }
  orient(orient) {
    return this.attr("orient", orient);
  }
  // Set marker refX and refY
  ref(x2, y2) {
    return this.attr("refX", x2).attr("refY", y2);
  }
  // Return the fill id
  toString() {
    return "url(#" + this.id() + ")";
  }
  // Update marker
  update(block) {
    this.clear();
    if (typeof block === "function") {
      block.call(this, this);
    }
    return this;
  }
  // Set width of element
  width(width2) {
    return this.attr("markerWidth", width2);
  }
};
registerMethods({
  Container: {
    marker(...args) {
      return this.defs().marker(...args);
    }
  },
  Defs: {
    // Create marker
    marker: wrapWithAttrCheck(function(width2, height2, block) {
      return this.put(new Marker()).size(width2, height2).ref(width2 / 2, height2 / 2).viewbox(0, 0, width2, height2).attr("orient", "auto").update(block);
    })
  },
  marker: {
    // Create and attach markers
    marker(marker, width2, height2, block) {
      let attr2 = ["marker"];
      if (marker !== "all")
        attr2.push(marker);
      attr2 = attr2.join("-");
      marker = arguments[1] instanceof Marker ? arguments[1] : this.defs().marker(width2, height2, block);
      return this.attr(attr2, marker);
    }
  }
});
register(Marker, "Marker");
function makeSetterGetter(k, f) {
  return function(v) {
    if (v == null)
      return this[k];
    this[k] = v;
    if (f)
      f.call(this);
    return this;
  };
}
var easing = {
  "-": function(pos) {
    return pos;
  },
  "<>": function(pos) {
    return -Math.cos(pos * Math.PI) / 2 + 0.5;
  },
  ">": function(pos) {
    return Math.sin(pos * Math.PI / 2);
  },
  "<": function(pos) {
    return -Math.cos(pos * Math.PI / 2) + 1;
  },
  bezier: function(x1, y1, x2, y2) {
    return function(t) {
      if (t < 0) {
        if (x1 > 0) {
          return y1 / x1 * t;
        } else if (x2 > 0) {
          return y2 / x2 * t;
        } else {
          return 0;
        }
      } else if (t > 1) {
        if (x2 < 1) {
          return (1 - y2) / (1 - x2) * t + (y2 - x2) / (1 - x2);
        } else if (x1 < 1) {
          return (1 - y1) / (1 - x1) * t + (y1 - x1) / (1 - x1);
        } else {
          return 1;
        }
      } else {
        return 3 * t * (1 - t) ** 2 * y1 + 3 * t ** 2 * (1 - t) * y2 + t ** 3;
      }
    };
  },
  // see https://www.w3.org/TR/css-easing-1/#step-timing-function-algo
  steps: function(steps, stepPosition = "end") {
    stepPosition = stepPosition.split("-").reverse()[0];
    let jumps = steps;
    if (stepPosition === "none") {
      --jumps;
    } else if (stepPosition === "both") {
      ++jumps;
    }
    return (t, beforeFlag = false) => {
      let step = Math.floor(t * steps);
      const jumping = t * step % 1 === 0;
      if (stepPosition === "start" || stepPosition === "both") {
        ++step;
      }
      if (beforeFlag && jumping) {
        --step;
      }
      if (t >= 0 && step < 0) {
        step = 0;
      }
      if (t <= 1 && step > jumps) {
        step = jumps;
      }
      return step / jumps;
    };
  }
};
var Stepper = class {
  done() {
    return false;
  }
};
var Ease = class extends Stepper {
  constructor(fn = timeline.ease) {
    super();
    this.ease = easing[fn] || fn;
  }
  step(from2, to2, pos) {
    if (typeof from2 !== "number") {
      return pos < 1 ? from2 : to2;
    }
    return from2 + (to2 - from2) * this.ease(pos);
  }
};
var Controller = class extends Stepper {
  constructor(fn) {
    super();
    this.stepper = fn;
  }
  done(c) {
    return c.done;
  }
  step(current, target, dt, c) {
    return this.stepper(current, target, dt, c);
  }
};
function recalculate() {
  const duration = (this._duration || 500) / 1e3;
  const overshoot = this._overshoot || 0;
  const eps = 1e-10;
  const pi = Math.PI;
  const os = Math.log(overshoot / 100 + eps);
  const zeta = -os / Math.sqrt(pi * pi + os * os);
  const wn = 3.9 / (zeta * duration);
  this.d = 2 * zeta * wn;
  this.k = wn * wn;
}
var Spring = class extends Controller {
  constructor(duration = 500, overshoot = 0) {
    super();
    this.duration(duration).overshoot(overshoot);
  }
  step(current, target, dt, c) {
    if (typeof current === "string")
      return current;
    c.done = dt === Infinity;
    if (dt === Infinity)
      return target;
    if (dt === 0)
      return current;
    if (dt > 100)
      dt = 16;
    dt /= 1e3;
    const velocity = c.velocity || 0;
    const acceleration = -this.d * velocity - this.k * (current - target);
    const newPosition = current + velocity * dt + acceleration * dt * dt / 2;
    c.velocity = velocity + acceleration * dt;
    c.done = Math.abs(target - newPosition) + Math.abs(velocity) < 2e-3;
    return c.done ? target : newPosition;
  }
};
extend(Spring, {
  duration: makeSetterGetter("_duration", recalculate),
  overshoot: makeSetterGetter("_overshoot", recalculate)
});
var PID = class extends Controller {
  constructor(p = 0.1, i = 0.01, d = 0, windup = 1e3) {
    super();
    this.p(p).i(i).d(d).windup(windup);
  }
  step(current, target, dt, c) {
    if (typeof current === "string")
      return current;
    c.done = dt === Infinity;
    if (dt === Infinity)
      return target;
    if (dt === 0)
      return current;
    const p = target - current;
    let i = (c.integral || 0) + p * dt;
    const d = (p - (c.error || 0)) / dt;
    const windup = this._windup;
    if (windup !== false) {
      i = Math.max(-windup, Math.min(i, windup));
    }
    c.error = p;
    c.integral = i;
    c.done = Math.abs(p) < 1e-3;
    return c.done ? target : current + (this.P * p + this.I * i + this.D * d);
  }
};
extend(PID, {
  windup: makeSetterGetter("_windup"),
  p: makeSetterGetter("P"),
  i: makeSetterGetter("I"),
  d: makeSetterGetter("D")
});
var segmentParameters = {
  M: 2,
  L: 2,
  H: 1,
  V: 1,
  C: 6,
  S: 4,
  Q: 4,
  T: 2,
  A: 7,
  Z: 0
};
var pathHandlers = {
  M: function(c, p, p0) {
    p.x = p0.x = c[0];
    p.y = p0.y = c[1];
    return ["M", p.x, p.y];
  },
  L: function(c, p) {
    p.x = c[0];
    p.y = c[1];
    return ["L", c[0], c[1]];
  },
  H: function(c, p) {
    p.x = c[0];
    return ["H", c[0]];
  },
  V: function(c, p) {
    p.y = c[0];
    return ["V", c[0]];
  },
  C: function(c, p) {
    p.x = c[4];
    p.y = c[5];
    return ["C", c[0], c[1], c[2], c[3], c[4], c[5]];
  },
  S: function(c, p) {
    p.x = c[2];
    p.y = c[3];
    return ["S", c[0], c[1], c[2], c[3]];
  },
  Q: function(c, p) {
    p.x = c[2];
    p.y = c[3];
    return ["Q", c[0], c[1], c[2], c[3]];
  },
  T: function(c, p) {
    p.x = c[0];
    p.y = c[1];
    return ["T", c[0], c[1]];
  },
  Z: function(c, p, p0) {
    p.x = p0.x;
    p.y = p0.y;
    return ["Z"];
  },
  A: function(c, p) {
    p.x = c[5];
    p.y = c[6];
    return ["A", c[0], c[1], c[2], c[3], c[4], c[5], c[6]];
  }
};
var mlhvqtcsaz = "mlhvqtcsaz".split("");
for (let i = 0, il = mlhvqtcsaz.length; i < il; ++i) {
  pathHandlers[mlhvqtcsaz[i]] = function(i2) {
    return function(c, p, p0) {
      if (i2 === "H")
        c[0] = c[0] + p.x;
      else if (i2 === "V")
        c[0] = c[0] + p.y;
      else if (i2 === "A") {
        c[5] = c[5] + p.x;
        c[6] = c[6] + p.y;
      } else {
        for (let j = 0, jl = c.length; j < jl; ++j) {
          c[j] = c[j] + (j % 2 ? p.y : p.x);
        }
      }
      return pathHandlers[i2](c, p, p0);
    };
  }(mlhvqtcsaz[i].toUpperCase());
}
function makeAbsolut(parser2) {
  const command = parser2.segment[0];
  return pathHandlers[command](parser2.segment.slice(1), parser2.p, parser2.p0);
}
function segmentComplete(parser2) {
  return parser2.segment.length && parser2.segment.length - 1 === segmentParameters[parser2.segment[0].toUpperCase()];
}
function startNewSegment(parser2, token) {
  parser2.inNumber && finalizeNumber(parser2, false);
  const pathLetter = isPathLetter.test(token);
  if (pathLetter) {
    parser2.segment = [token];
  } else {
    const lastCommand = parser2.lastCommand;
    const small = lastCommand.toLowerCase();
    const isSmall = lastCommand === small;
    parser2.segment = [small === "m" ? isSmall ? "l" : "L" : lastCommand];
  }
  parser2.inSegment = true;
  parser2.lastCommand = parser2.segment[0];
  return pathLetter;
}
function finalizeNumber(parser2, inNumber) {
  if (!parser2.inNumber)
    throw new Error("Parser Error");
  parser2.number && parser2.segment.push(parseFloat(parser2.number));
  parser2.inNumber = inNumber;
  parser2.number = "";
  parser2.pointSeen = false;
  parser2.hasExponent = false;
  if (segmentComplete(parser2)) {
    finalizeSegment(parser2);
  }
}
function finalizeSegment(parser2) {
  parser2.inSegment = false;
  if (parser2.absolute) {
    parser2.segment = makeAbsolut(parser2);
  }
  parser2.segments.push(parser2.segment);
}
function isArcFlag(parser2) {
  if (!parser2.segment.length)
    return false;
  const isArc = parser2.segment[0].toUpperCase() === "A";
  const length2 = parser2.segment.length;
  return isArc && (length2 === 4 || length2 === 5);
}
function isExponential(parser2) {
  return parser2.lastToken.toUpperCase() === "E";
}
function pathParser(d, toAbsolute = true) {
  let index = 0;
  let token = "";
  const parser2 = {
    segment: [],
    inNumber: false,
    number: "",
    lastToken: "",
    inSegment: false,
    segments: [],
    pointSeen: false,
    hasExponent: false,
    absolute: toAbsolute,
    p0: new Point(),
    p: new Point()
  };
  while (parser2.lastToken = token, token = d.charAt(index++)) {
    if (!parser2.inSegment) {
      if (startNewSegment(parser2, token)) {
        continue;
      }
    }
    if (token === ".") {
      if (parser2.pointSeen || parser2.hasExponent) {
        finalizeNumber(parser2, false);
        --index;
        continue;
      }
      parser2.inNumber = true;
      parser2.pointSeen = true;
      parser2.number += token;
      continue;
    }
    if (!isNaN(parseInt(token))) {
      if (parser2.number === "0" || isArcFlag(parser2)) {
        parser2.inNumber = true;
        parser2.number = token;
        finalizeNumber(parser2, true);
        continue;
      }
      parser2.inNumber = true;
      parser2.number += token;
      continue;
    }
    if (token === " " || token === ",") {
      if (parser2.inNumber) {
        finalizeNumber(parser2, false);
      }
      continue;
    }
    if (token === "-") {
      if (parser2.inNumber && !isExponential(parser2)) {
        finalizeNumber(parser2, false);
        --index;
        continue;
      }
      parser2.number += token;
      parser2.inNumber = true;
      continue;
    }
    if (token.toUpperCase() === "E") {
      parser2.number += token;
      parser2.hasExponent = true;
      continue;
    }
    if (isPathLetter.test(token)) {
      if (parser2.inNumber) {
        finalizeNumber(parser2, false);
      } else if (!segmentComplete(parser2)) {
        throw new Error("parser Error");
      } else {
        finalizeSegment(parser2);
      }
      --index;
    }
  }
  if (parser2.inNumber) {
    finalizeNumber(parser2, false);
  }
  if (parser2.inSegment && segmentComplete(parser2)) {
    finalizeSegment(parser2);
  }
  return parser2.segments;
}
function arrayToString(a) {
  let s = "";
  for (let i = 0, il = a.length; i < il; i++) {
    s += a[i][0];
    if (a[i][1] != null) {
      s += a[i][1];
      if (a[i][2] != null) {
        s += " ";
        s += a[i][2];
        if (a[i][3] != null) {
          s += " ";
          s += a[i][3];
          s += " ";
          s += a[i][4];
          if (a[i][5] != null) {
            s += " ";
            s += a[i][5];
            s += " ";
            s += a[i][6];
            if (a[i][7] != null) {
              s += " ";
              s += a[i][7];
            }
          }
        }
      }
    }
  }
  return s + " ";
}
var PathArray = class extends SVGArray {
  // Get bounding box of path
  bbox() {
    parser().path.setAttribute("d", this.toString());
    return new Box(parser.nodes.path.getBBox());
  }
  // Move path string
  move(x2, y2) {
    const box = this.bbox();
    x2 -= box.x;
    y2 -= box.y;
    if (!isNaN(x2) && !isNaN(y2)) {
      for (let l, i = this.length - 1; i >= 0; i--) {
        l = this[i][0];
        if (l === "M" || l === "L" || l === "T") {
          this[i][1] += x2;
          this[i][2] += y2;
        } else if (l === "H") {
          this[i][1] += x2;
        } else if (l === "V") {
          this[i][1] += y2;
        } else if (l === "C" || l === "S" || l === "Q") {
          this[i][1] += x2;
          this[i][2] += y2;
          this[i][3] += x2;
          this[i][4] += y2;
          if (l === "C") {
            this[i][5] += x2;
            this[i][6] += y2;
          }
        } else if (l === "A") {
          this[i][6] += x2;
          this[i][7] += y2;
        }
      }
    }
    return this;
  }
  // Absolutize and parse path to array
  parse(d = "M0 0") {
    if (Array.isArray(d)) {
      d = Array.prototype.concat.apply([], d).toString();
    }
    return pathParser(d);
  }
  // Resize path string
  size(width2, height2) {
    const box = this.bbox();
    let i, l;
    box.width = box.width === 0 ? 1 : box.width;
    box.height = box.height === 0 ? 1 : box.height;
    for (i = this.length - 1; i >= 0; i--) {
      l = this[i][0];
      if (l === "M" || l === "L" || l === "T") {
        this[i][1] = (this[i][1] - box.x) * width2 / box.width + box.x;
        this[i][2] = (this[i][2] - box.y) * height2 / box.height + box.y;
      } else if (l === "H") {
        this[i][1] = (this[i][1] - box.x) * width2 / box.width + box.x;
      } else if (l === "V") {
        this[i][1] = (this[i][1] - box.y) * height2 / box.height + box.y;
      } else if (l === "C" || l === "S" || l === "Q") {
        this[i][1] = (this[i][1] - box.x) * width2 / box.width + box.x;
        this[i][2] = (this[i][2] - box.y) * height2 / box.height + box.y;
        this[i][3] = (this[i][3] - box.x) * width2 / box.width + box.x;
        this[i][4] = (this[i][4] - box.y) * height2 / box.height + box.y;
        if (l === "C") {
          this[i][5] = (this[i][5] - box.x) * width2 / box.width + box.x;
          this[i][6] = (this[i][6] - box.y) * height2 / box.height + box.y;
        }
      } else if (l === "A") {
        this[i][1] = this[i][1] * width2 / box.width;
        this[i][2] = this[i][2] * height2 / box.height;
        this[i][6] = (this[i][6] - box.x) * width2 / box.width + box.x;
        this[i][7] = (this[i][7] - box.y) * height2 / box.height + box.y;
      }
    }
    return this;
  }
  // Convert array to string
  toString() {
    return arrayToString(this);
  }
};
var getClassForType = (value) => {
  const type = typeof value;
  if (type === "number") {
    return SVGNumber;
  } else if (type === "string") {
    if (Color.isColor(value)) {
      return Color;
    } else if (delimiter.test(value)) {
      return isPathLetter.test(value) ? PathArray : SVGArray;
    } else if (numberAndUnit.test(value)) {
      return SVGNumber;
    } else {
      return NonMorphable;
    }
  } else if (morphableTypes.indexOf(value.constructor) > -1) {
    return value.constructor;
  } else if (Array.isArray(value)) {
    return SVGArray;
  } else if (type === "object") {
    return ObjectBag;
  } else {
    return NonMorphable;
  }
};
var Morphable = class {
  constructor(stepper) {
    this._stepper = stepper || new Ease("-");
    this._from = null;
    this._to = null;
    this._type = null;
    this._context = null;
    this._morphObj = null;
  }
  at(pos) {
    return this._morphObj.morph(this._from, this._to, pos, this._stepper, this._context);
  }
  done() {
    const complete = this._context.map(this._stepper.done).reduce(function(last, curr) {
      return last && curr;
    }, true);
    return complete;
  }
  from(val) {
    if (val == null) {
      return this._from;
    }
    this._from = this._set(val);
    return this;
  }
  stepper(stepper) {
    if (stepper == null)
      return this._stepper;
    this._stepper = stepper;
    return this;
  }
  to(val) {
    if (val == null) {
      return this._to;
    }
    this._to = this._set(val);
    return this;
  }
  type(type) {
    if (type == null) {
      return this._type;
    }
    this._type = type;
    return this;
  }
  _set(value) {
    if (!this._type) {
      this.type(getClassForType(value));
    }
    let result = new this._type(value);
    if (this._type === Color) {
      result = this._to ? result[this._to[4]]() : this._from ? result[this._from[4]]() : result;
    }
    if (this._type === ObjectBag) {
      result = this._to ? result.align(this._to) : this._from ? result.align(this._from) : result;
    }
    result = result.toConsumable();
    this._morphObj = this._morphObj || new this._type();
    this._context = this._context || Array.apply(null, Array(result.length)).map(Object).map(function(o) {
      o.done = true;
      return o;
    });
    return result;
  }
};
var NonMorphable = class {
  constructor(...args) {
    this.init(...args);
  }
  init(val) {
    val = Array.isArray(val) ? val[0] : val;
    this.value = val;
    return this;
  }
  toArray() {
    return [this.value];
  }
  valueOf() {
    return this.value;
  }
};
var TransformBag = class {
  constructor(...args) {
    this.init(...args);
  }
  init(obj) {
    if (Array.isArray(obj)) {
      obj = {
        scaleX: obj[0],
        scaleY: obj[1],
        shear: obj[2],
        rotate: obj[3],
        translateX: obj[4],
        translateY: obj[5],
        originX: obj[6],
        originY: obj[7]
      };
    }
    Object.assign(this, TransformBag.defaults, obj);
    return this;
  }
  toArray() {
    const v = this;
    return [v.scaleX, v.scaleY, v.shear, v.rotate, v.translateX, v.translateY, v.originX, v.originY];
  }
};
TransformBag.defaults = {
  scaleX: 1,
  scaleY: 1,
  shear: 0,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
};
var sortByKey = (a, b) => {
  return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
};
var ObjectBag = class {
  constructor(...args) {
    this.init(...args);
  }
  align(other) {
    const values = this.values;
    for (let i = 0, il = values.length; i < il; ++i) {
      if (values[i + 1] === other[i + 1]) {
        if (values[i + 1] === Color && other[i + 7] !== values[i + 7]) {
          const space = other[i + 7];
          const color = new Color(this.values.splice(i + 3, 5))[space]().toArray();
          this.values.splice(i + 3, 0, ...color);
        }
        i += values[i + 2] + 2;
        continue;
      }
      if (!other[i + 1]) {
        return this;
      }
      const defaultObject = new other[i + 1]().toArray();
      const toDelete = values[i + 2] + 3;
      values.splice(i, toDelete, other[i], other[i + 1], other[i + 2], ...defaultObject);
      i += values[i + 2] + 2;
    }
    return this;
  }
  init(objOrArr) {
    this.values = [];
    if (Array.isArray(objOrArr)) {
      this.values = objOrArr.slice();
      return;
    }
    objOrArr = objOrArr || {};
    const entries = [];
    for (const i in objOrArr) {
      const Type = getClassForType(objOrArr[i]);
      const val = new Type(objOrArr[i]).toArray();
      entries.push([i, Type, val.length, ...val]);
    }
    entries.sort(sortByKey);
    this.values = entries.reduce((last, curr) => last.concat(curr), []);
    return this;
  }
  toArray() {
    return this.values;
  }
  valueOf() {
    const obj = {};
    const arr = this.values;
    while (arr.length) {
      const key = arr.shift();
      const Type = arr.shift();
      const num = arr.shift();
      const values = arr.splice(0, num);
      obj[key] = new Type(values);
    }
    return obj;
  }
};
var morphableTypes = [NonMorphable, TransformBag, ObjectBag];
function registerMorphableType(type = []) {
  morphableTypes.push(...[].concat(type));
}
function makeMorphable() {
  extend(morphableTypes, {
    to(val) {
      return new Morphable().type(this.constructor).from(this.toArray()).to(val);
    },
    fromArray(arr) {
      this.init(arr);
      return this;
    },
    toConsumable() {
      return this.toArray();
    },
    morph(from2, to2, pos, stepper, context) {
      const mapper = function(i, index) {
        return stepper.step(i, to2[index], pos, context[index], context);
      };
      return this.fromArray(from2.map(mapper));
    }
  });
}
var Path = class extends Shape {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("path", node), attrs2);
  }
  // Get array
  array() {
    return this._array || (this._array = new PathArray(this.attr("d")));
  }
  // Clear array cache
  clear() {
    delete this._array;
    return this;
  }
  // Set height of element
  height(height2) {
    return height2 == null ? this.bbox().height : this.size(this.bbox().width, height2);
  }
  // Move by left top corner
  move(x2, y2) {
    return this.attr("d", this.array().move(x2, y2));
  }
  // Plot new path
  plot(d) {
    return d == null ? this.array() : this.clear().attr("d", typeof d === "string" ? d : this._array = new PathArray(d));
  }
  // Set element size to given width and height
  size(width2, height2) {
    const p = proportionalSize(this, width2, height2);
    return this.attr("d", this.array().size(p.width, p.height));
  }
  // Set width of element
  width(width2) {
    return width2 == null ? this.bbox().width : this.size(width2, this.bbox().height);
  }
  // Move by left top corner over x-axis
  x(x2) {
    return x2 == null ? this.bbox().x : this.move(x2, this.bbox().y);
  }
  // Move by left top corner over y-axis
  y(y2) {
    return y2 == null ? this.bbox().y : this.move(this.bbox().x, y2);
  }
};
Path.prototype.MorphArray = PathArray;
registerMethods({
  Container: {
    // Create a wrapped path element
    path: wrapWithAttrCheck(function(d) {
      return this.put(new Path()).plot(d || new PathArray());
    })
  }
});
register(Path, "Path");
function array() {
  return this._array || (this._array = new PointArray(this.attr("points")));
}
function clear() {
  delete this._array;
  return this;
}
function move$2(x2, y2) {
  return this.attr("points", this.array().move(x2, y2));
}
function plot(p) {
  return p == null ? this.array() : this.clear().attr("points", typeof p === "string" ? p : this._array = new PointArray(p));
}
function size$1(width2, height2) {
  const p = proportionalSize(this, width2, height2);
  return this.attr("points", this.array().size(p.width, p.height));
}
var poly = {
  __proto__: null,
  array,
  clear,
  move: move$2,
  plot,
  size: size$1
};
var Polygon = class extends Shape {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("polygon", node), attrs2);
  }
};
registerMethods({
  Container: {
    // Create a wrapped polygon element
    polygon: wrapWithAttrCheck(function(p) {
      return this.put(new Polygon()).plot(p || new PointArray());
    })
  }
});
extend(Polygon, pointed);
extend(Polygon, poly);
register(Polygon, "Polygon");
var Polyline = class extends Shape {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("polyline", node), attrs2);
  }
};
registerMethods({
  Container: {
    // Create a wrapped polygon element
    polyline: wrapWithAttrCheck(function(p) {
      return this.put(new Polyline()).plot(p || new PointArray());
    })
  }
});
extend(Polyline, pointed);
extend(Polyline, poly);
register(Polyline, "Polyline");
var Rect = class extends Shape {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("rect", node), attrs2);
  }
};
extend(Rect, {
  rx,
  ry
});
registerMethods({
  Container: {
    // Create a rect element
    rect: wrapWithAttrCheck(function(width2, height2) {
      return this.put(new Rect()).size(width2, height2);
    })
  }
});
register(Rect, "Rect");
var Queue = class {
  constructor() {
    this._first = null;
    this._last = null;
  }
  // Shows us the first item in the list
  first() {
    return this._first && this._first.value;
  }
  // Shows us the last item in the list
  last() {
    return this._last && this._last.value;
  }
  push(value) {
    const item = typeof value.next !== "undefined" ? value : {
      value,
      next: null,
      prev: null
    };
    if (this._last) {
      item.prev = this._last;
      this._last.next = item;
      this._last = item;
    } else {
      this._last = item;
      this._first = item;
    }
    return item;
  }
  // Removes the item that was returned from the push
  remove(item) {
    if (item.prev)
      item.prev.next = item.next;
    if (item.next)
      item.next.prev = item.prev;
    if (item === this._last)
      this._last = item.prev;
    if (item === this._first)
      this._first = item.next;
    item.prev = null;
    item.next = null;
  }
  shift() {
    const remove = this._first;
    if (!remove)
      return null;
    this._first = remove.next;
    if (this._first)
      this._first.prev = null;
    this._last = this._first ? this._last : null;
    return remove.value;
  }
};
var Animator = {
  nextDraw: null,
  frames: new Queue(),
  timeouts: new Queue(),
  immediates: new Queue(),
  timer: () => globals.window.performance || globals.window.Date,
  transforms: [],
  frame(fn) {
    const node = Animator.frames.push({
      run: fn
    });
    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    }
    return node;
  },
  timeout(fn, delay) {
    delay = delay || 0;
    const time = Animator.timer().now() + delay;
    const node = Animator.timeouts.push({
      run: fn,
      time
    });
    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    }
    return node;
  },
  immediate(fn) {
    const node = Animator.immediates.push(fn);
    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    }
    return node;
  },
  cancelFrame(node) {
    node != null && Animator.frames.remove(node);
  },
  clearTimeout(node) {
    node != null && Animator.timeouts.remove(node);
  },
  cancelImmediate(node) {
    node != null && Animator.immediates.remove(node);
  },
  _draw(now) {
    let nextTimeout = null;
    const lastTimeout = Animator.timeouts.last();
    while (nextTimeout = Animator.timeouts.shift()) {
      if (now >= nextTimeout.time) {
        nextTimeout.run();
      } else {
        Animator.timeouts.push(nextTimeout);
      }
      if (nextTimeout === lastTimeout)
        break;
    }
    let nextFrame = null;
    const lastFrame = Animator.frames.last();
    while (nextFrame !== lastFrame && (nextFrame = Animator.frames.shift())) {
      nextFrame.run(now);
    }
    let nextImmediate = null;
    while (nextImmediate = Animator.immediates.shift()) {
      nextImmediate();
    }
    Animator.nextDraw = Animator.timeouts.first() || Animator.frames.first() ? globals.window.requestAnimationFrame(Animator._draw) : null;
  }
};
var makeSchedule = function(runnerInfo) {
  const start = runnerInfo.start;
  const duration = runnerInfo.runner.duration();
  const end = start + duration;
  return {
    start,
    duration,
    end,
    runner: runnerInfo.runner
  };
};
var defaultSource = function() {
  const w = globals.window;
  return (w.performance || w.Date).now();
};
var Timeline = class extends EventTarget {
  // Construct a new timeline on the given element
  constructor(timeSource = defaultSource) {
    super();
    this._timeSource = timeSource;
    this._startTime = 0;
    this._speed = 1;
    this._persist = 0;
    this._nextFrame = null;
    this._paused = true;
    this._runners = [];
    this._runnerIds = [];
    this._lastRunnerId = -1;
    this._time = 0;
    this._lastSourceTime = 0;
    this._lastStepTime = 0;
    this._step = this._stepFn.bind(this, false);
    this._stepImmediate = this._stepFn.bind(this, true);
  }
  active() {
    return !!this._nextFrame;
  }
  finish() {
    this.time(this.getEndTimeOfTimeline() + 1);
    return this.pause();
  }
  // Calculates the end of the timeline
  getEndTime() {
    const lastRunnerInfo = this.getLastRunnerInfo();
    const lastDuration = lastRunnerInfo ? lastRunnerInfo.runner.duration() : 0;
    const lastStartTime = lastRunnerInfo ? lastRunnerInfo.start : this._time;
    return lastStartTime + lastDuration;
  }
  getEndTimeOfTimeline() {
    const endTimes = this._runners.map((i) => i.start + i.runner.duration());
    return Math.max(0, ...endTimes);
  }
  getLastRunnerInfo() {
    return this.getRunnerInfoById(this._lastRunnerId);
  }
  getRunnerInfoById(id) {
    return this._runners[this._runnerIds.indexOf(id)] || null;
  }
  pause() {
    this._paused = true;
    return this._continue();
  }
  persist(dtOrForever) {
    if (dtOrForever == null)
      return this._persist;
    this._persist = dtOrForever;
    return this;
  }
  play() {
    this._paused = false;
    return this.updateTime()._continue();
  }
  reverse(yes) {
    const currentSpeed = this.speed();
    if (yes == null)
      return this.speed(-currentSpeed);
    const positive = Math.abs(currentSpeed);
    return this.speed(yes ? -positive : positive);
  }
  // schedules a runner on the timeline
  schedule(runner, delay, when) {
    if (runner == null) {
      return this._runners.map(makeSchedule);
    }
    let absoluteStartTime = 0;
    const endTime = this.getEndTime();
    delay = delay || 0;
    if (when == null || when === "last" || when === "after") {
      absoluteStartTime = endTime;
    } else if (when === "absolute" || when === "start") {
      absoluteStartTime = delay;
      delay = 0;
    } else if (when === "now") {
      absoluteStartTime = this._time;
    } else if (when === "relative") {
      const runnerInfo2 = this.getRunnerInfoById(runner.id);
      if (runnerInfo2) {
        absoluteStartTime = runnerInfo2.start + delay;
        delay = 0;
      }
    } else if (when === "with-last") {
      const lastRunnerInfo = this.getLastRunnerInfo();
      const lastStartTime = lastRunnerInfo ? lastRunnerInfo.start : this._time;
      absoluteStartTime = lastStartTime;
    } else {
      throw new Error('Invalid value for the "when" parameter');
    }
    runner.unschedule();
    runner.timeline(this);
    const persist = runner.persist();
    const runnerInfo = {
      persist: persist === null ? this._persist : persist,
      start: absoluteStartTime + delay,
      runner
    };
    this._lastRunnerId = runner.id;
    this._runners.push(runnerInfo);
    this._runners.sort((a, b) => a.start - b.start);
    this._runnerIds = this._runners.map((info) => info.runner.id);
    this.updateTime()._continue();
    return this;
  }
  seek(dt) {
    return this.time(this._time + dt);
  }
  source(fn) {
    if (fn == null)
      return this._timeSource;
    this._timeSource = fn;
    return this;
  }
  speed(speed) {
    if (speed == null)
      return this._speed;
    this._speed = speed;
    return this;
  }
  stop() {
    this.time(0);
    return this.pause();
  }
  time(time) {
    if (time == null)
      return this._time;
    this._time = time;
    return this._continue(true);
  }
  // Remove the runner from this timeline
  unschedule(runner) {
    const index = this._runnerIds.indexOf(runner.id);
    if (index < 0)
      return this;
    this._runners.splice(index, 1);
    this._runnerIds.splice(index, 1);
    runner.timeline(null);
    return this;
  }
  // Makes sure, that after pausing the time doesn't jump
  updateTime() {
    if (!this.active()) {
      this._lastSourceTime = this._timeSource();
    }
    return this;
  }
  // Checks if we are running and continues the animation
  _continue(immediateStep = false) {
    Animator.cancelFrame(this._nextFrame);
    this._nextFrame = null;
    if (immediateStep)
      return this._stepImmediate();
    if (this._paused)
      return this;
    this._nextFrame = Animator.frame(this._step);
    return this;
  }
  _stepFn(immediateStep = false) {
    const time = this._timeSource();
    let dtSource = time - this._lastSourceTime;
    if (immediateStep)
      dtSource = 0;
    const dtTime = this._speed * dtSource + (this._time - this._lastStepTime);
    this._lastSourceTime = time;
    if (!immediateStep) {
      this._time += dtTime;
      this._time = this._time < 0 ? 0 : this._time;
    }
    this._lastStepTime = this._time;
    this.fire("time", this._time);
    for (let k = this._runners.length; k--; ) {
      const runnerInfo = this._runners[k];
      const runner = runnerInfo.runner;
      const dtToStart = this._time - runnerInfo.start;
      if (dtToStart <= 0) {
        runner.reset();
      }
    }
    let runnersLeft = false;
    for (let i = 0, len = this._runners.length; i < len; i++) {
      const runnerInfo = this._runners[i];
      const runner = runnerInfo.runner;
      let dt = dtTime;
      const dtToStart = this._time - runnerInfo.start;
      if (dtToStart <= 0) {
        runnersLeft = true;
        continue;
      } else if (dtToStart < dt) {
        dt = dtToStart;
      }
      if (!runner.active())
        continue;
      const finished = runner.step(dt).done;
      if (!finished) {
        runnersLeft = true;
      } else if (runnerInfo.persist !== true) {
        const endTime = runner.duration() - runner.time() + this._time;
        if (endTime + runnerInfo.persist < this._time) {
          runner.unschedule();
          --i;
          --len;
        }
      }
    }
    if (runnersLeft && !(this._speed < 0 && this._time === 0) || this._runnerIds.length && this._speed < 0 && this._time > 0) {
      this._continue();
    } else {
      this.pause();
      this.fire("finished");
    }
    return this;
  }
};
registerMethods({
  Element: {
    timeline: function(timeline2) {
      if (timeline2 == null) {
        this._timeline = this._timeline || new Timeline();
        return this._timeline;
      } else {
        this._timeline = timeline2;
        return this;
      }
    }
  }
});
var Runner = class extends EventTarget {
  constructor(options) {
    super();
    this.id = Runner.id++;
    options = options == null ? timeline.duration : options;
    options = typeof options === "function" ? new Controller(options) : options;
    this._element = null;
    this._timeline = null;
    this.done = false;
    this._queue = [];
    this._duration = typeof options === "number" && options;
    this._isDeclarative = options instanceof Controller;
    this._stepper = this._isDeclarative ? options : new Ease();
    this._history = {};
    this.enabled = true;
    this._time = 0;
    this._lastTime = 0;
    this._reseted = true;
    this.transforms = new Matrix();
    this.transformId = 1;
    this._haveReversed = false;
    this._reverse = false;
    this._loopsDone = 0;
    this._swing = false;
    this._wait = 0;
    this._times = 1;
    this._frameId = null;
    this._persist = this._isDeclarative ? true : null;
  }
  static sanitise(duration, delay, when) {
    let times = 1;
    let swing = false;
    let wait = 0;
    duration = duration || timeline.duration;
    delay = delay || timeline.delay;
    when = when || "last";
    if (typeof duration === "object" && !(duration instanceof Stepper)) {
      delay = duration.delay || delay;
      when = duration.when || when;
      swing = duration.swing || swing;
      times = duration.times || times;
      wait = duration.wait || wait;
      duration = duration.duration || timeline.duration;
    }
    return {
      duration,
      delay,
      swing,
      times,
      wait,
      when
    };
  }
  active(enabled) {
    if (enabled == null)
      return this.enabled;
    this.enabled = enabled;
    return this;
  }
  /*
  Private Methods
  ===============
  Methods that shouldn't be used externally
  */
  addTransform(transform2, index) {
    this.transforms.lmultiplyO(transform2);
    return this;
  }
  after(fn) {
    return this.on("finished", fn);
  }
  animate(duration, delay, when) {
    const o = Runner.sanitise(duration, delay, when);
    const runner = new Runner(o.duration);
    if (this._timeline)
      runner.timeline(this._timeline);
    if (this._element)
      runner.element(this._element);
    return runner.loop(o).schedule(o.delay, o.when);
  }
  clearTransform() {
    this.transforms = new Matrix();
    return this;
  }
  // TODO: Keep track of all transformations so that deletion is faster
  clearTransformsFromQueue() {
    if (!this.done || !this._timeline || !this._timeline._runnerIds.includes(this.id)) {
      this._queue = this._queue.filter((item) => {
        return !item.isTransform;
      });
    }
  }
  delay(delay) {
    return this.animate(0, delay);
  }
  duration() {
    return this._times * (this._wait + this._duration) - this._wait;
  }
  during(fn) {
    return this.queue(null, fn);
  }
  ease(fn) {
    this._stepper = new Ease(fn);
    return this;
  }
  /*
  Runner Definitions
  ==================
  These methods help us define the runtime behaviour of the Runner or they
  help us make new runners from the current runner
  */
  element(element) {
    if (element == null)
      return this._element;
    this._element = element;
    element._prepareRunner();
    return this;
  }
  finish() {
    return this.step(Infinity);
  }
  loop(times, swing, wait) {
    if (typeof times === "object") {
      swing = times.swing;
      wait = times.wait;
      times = times.times;
    }
    this._times = times || Infinity;
    this._swing = swing || false;
    this._wait = wait || 0;
    if (this._times === true) {
      this._times = Infinity;
    }
    return this;
  }
  loops(p) {
    const loopDuration = this._duration + this._wait;
    if (p == null) {
      const loopsDone = Math.floor(this._time / loopDuration);
      const relativeTime = this._time - loopsDone * loopDuration;
      const position2 = relativeTime / this._duration;
      return Math.min(loopsDone + position2, this._times);
    }
    const whole = Math.floor(p);
    const partial = p % 1;
    const time = loopDuration * whole + this._duration * partial;
    return this.time(time);
  }
  persist(dtOrForever) {
    if (dtOrForever == null)
      return this._persist;
    this._persist = dtOrForever;
    return this;
  }
  position(p) {
    const x2 = this._time;
    const d = this._duration;
    const w = this._wait;
    const t = this._times;
    const s = this._swing;
    const r = this._reverse;
    let position2;
    if (p == null) {
      const f = function(x3) {
        const swinging = s * Math.floor(x3 % (2 * (w + d)) / (w + d));
        const backwards = swinging && !r || !swinging && r;
        const uncliped = Math.pow(-1, backwards) * (x3 % (w + d)) / d + backwards;
        const clipped = Math.max(Math.min(uncliped, 1), 0);
        return clipped;
      };
      const endTime = t * (w + d) - w;
      position2 = x2 <= 0 ? Math.round(f(1e-5)) : x2 < endTime ? f(x2) : Math.round(f(endTime - 1e-5));
      return position2;
    }
    const loopsDone = Math.floor(this.loops());
    const swingForward = s && loopsDone % 2 === 0;
    const forwards = swingForward && !r || r && swingForward;
    position2 = loopsDone + (forwards ? p : 1 - p);
    return this.loops(position2);
  }
  progress(p) {
    if (p == null) {
      return Math.min(1, this._time / this.duration());
    }
    return this.time(p * this.duration());
  }
  /*
  Basic Functionality
  ===================
  These methods allow us to attach basic functions to the runner directly
  */
  queue(initFn, runFn, retargetFn, isTransform) {
    this._queue.push({
      initialiser: initFn || noop,
      runner: runFn || noop,
      retarget: retargetFn,
      isTransform,
      initialised: false,
      finished: false
    });
    const timeline2 = this.timeline();
    timeline2 && this.timeline()._continue();
    return this;
  }
  reset() {
    if (this._reseted)
      return this;
    this.time(0);
    this._reseted = true;
    return this;
  }
  reverse(reverse) {
    this._reverse = reverse == null ? !this._reverse : reverse;
    return this;
  }
  schedule(timeline2, delay, when) {
    if (!(timeline2 instanceof Timeline)) {
      when = delay;
      delay = timeline2;
      timeline2 = this.timeline();
    }
    if (!timeline2) {
      throw Error("Runner cannot be scheduled without timeline");
    }
    timeline2.schedule(this, delay, when);
    return this;
  }
  step(dt) {
    if (!this.enabled)
      return this;
    dt = dt == null ? 16 : dt;
    this._time += dt;
    const position2 = this.position();
    const running = this._lastPosition !== position2 && this._time >= 0;
    this._lastPosition = position2;
    const duration = this.duration();
    const justStarted = this._lastTime <= 0 && this._time > 0;
    const justFinished = this._lastTime < duration && this._time >= duration;
    this._lastTime = this._time;
    if (justStarted) {
      this.fire("start", this);
    }
    const declarative = this._isDeclarative;
    this.done = !declarative && !justFinished && this._time >= duration;
    this._reseted = false;
    let converged = false;
    if (running || declarative) {
      this._initialise(running);
      this.transforms = new Matrix();
      converged = this._run(declarative ? dt : position2);
      this.fire("step", this);
    }
    this.done = this.done || converged && declarative;
    if (justFinished) {
      this.fire("finished", this);
    }
    return this;
  }
  /*
  Runner animation methods
  ========================
  Control how the animation plays
  */
  time(time) {
    if (time == null) {
      return this._time;
    }
    const dt = time - this._time;
    this.step(dt);
    return this;
  }
  timeline(timeline2) {
    if (typeof timeline2 === "undefined")
      return this._timeline;
    this._timeline = timeline2;
    return this;
  }
  unschedule() {
    const timeline2 = this.timeline();
    timeline2 && timeline2.unschedule(this);
    return this;
  }
  // Run each initialise function in the runner if required
  _initialise(running) {
    if (!running && !this._isDeclarative)
      return;
    for (let i = 0, len = this._queue.length; i < len; ++i) {
      const current = this._queue[i];
      const needsIt = this._isDeclarative || !current.initialised && running;
      running = !current.finished;
      if (needsIt && running) {
        current.initialiser.call(this);
        current.initialised = true;
      }
    }
  }
  // Save a morpher to the morpher list so that we can retarget it later
  _rememberMorpher(method, morpher) {
    this._history[method] = {
      morpher,
      caller: this._queue[this._queue.length - 1]
    };
    if (this._isDeclarative) {
      const timeline2 = this.timeline();
      timeline2 && timeline2.play();
    }
  }
  // Try to set the target for a morpher if the morpher exists, otherwise
  // Run each run function for the position or dt given
  _run(positionOrDt) {
    let allfinished = true;
    for (let i = 0, len = this._queue.length; i < len; ++i) {
      const current = this._queue[i];
      const converged = current.runner.call(this, positionOrDt);
      current.finished = current.finished || converged === true;
      allfinished = allfinished && current.finished;
    }
    return allfinished;
  }
  // do nothing and return false
  _tryRetarget(method, target, extra) {
    if (this._history[method]) {
      if (!this._history[method].caller.initialised) {
        const index = this._queue.indexOf(this._history[method].caller);
        this._queue.splice(index, 1);
        return false;
      }
      if (this._history[method].caller.retarget) {
        this._history[method].caller.retarget.call(this, target, extra);
      } else {
        this._history[method].morpher.to(target);
      }
      this._history[method].caller.finished = false;
      const timeline2 = this.timeline();
      timeline2 && timeline2.play();
      return true;
    }
    return false;
  }
};
Runner.id = 0;
var FakeRunner = class {
  constructor(transforms2 = new Matrix(), id = -1, done = true) {
    this.transforms = transforms2;
    this.id = id;
    this.done = done;
  }
  clearTransformsFromQueue() {
  }
};
extend([Runner, FakeRunner], {
  mergeWith(runner) {
    return new FakeRunner(runner.transforms.lmultiply(this.transforms), runner.id);
  }
});
var lmultiply = (last, curr) => last.lmultiplyO(curr);
var getRunnerTransform = (runner) => runner.transforms;
function mergeTransforms() {
  const runners = this._transformationRunners.runners;
  const netTransform = runners.map(getRunnerTransform).reduce(lmultiply, new Matrix());
  this.transform(netTransform);
  this._transformationRunners.merge();
  if (this._transformationRunners.length() === 1) {
    this._frameId = null;
  }
}
var RunnerArray = class {
  constructor() {
    this.runners = [];
    this.ids = [];
  }
  add(runner) {
    if (this.runners.includes(runner))
      return;
    const id = runner.id + 1;
    this.runners.push(runner);
    this.ids.push(id);
    return this;
  }
  clearBefore(id) {
    const deleteCnt = this.ids.indexOf(id + 1) || 1;
    this.ids.splice(0, deleteCnt, 0);
    this.runners.splice(0, deleteCnt, new FakeRunner()).forEach((r) => r.clearTransformsFromQueue());
    return this;
  }
  edit(id, newRunner) {
    const index = this.ids.indexOf(id + 1);
    this.ids.splice(index, 1, id + 1);
    this.runners.splice(index, 1, newRunner);
    return this;
  }
  getByID(id) {
    return this.runners[this.ids.indexOf(id + 1)];
  }
  length() {
    return this.ids.length;
  }
  merge() {
    let lastRunner = null;
    for (let i = 0; i < this.runners.length; ++i) {
      const runner = this.runners[i];
      const condition = lastRunner && runner.done && lastRunner.done && (!runner._timeline || !runner._timeline._runnerIds.includes(runner.id)) && (!lastRunner._timeline || !lastRunner._timeline._runnerIds.includes(lastRunner.id));
      if (condition) {
        this.remove(runner.id);
        const newRunner = runner.mergeWith(lastRunner);
        this.edit(lastRunner.id, newRunner);
        lastRunner = newRunner;
        --i;
      } else {
        lastRunner = runner;
      }
    }
    return this;
  }
  remove(id) {
    const index = this.ids.indexOf(id + 1);
    this.ids.splice(index, 1);
    this.runners.splice(index, 1);
    return this;
  }
};
registerMethods({
  Element: {
    animate(duration, delay, when) {
      const o = Runner.sanitise(duration, delay, when);
      const timeline2 = this.timeline();
      return new Runner(o.duration).loop(o).element(this).timeline(timeline2.play()).schedule(o.delay, o.when);
    },
    delay(by, when) {
      return this.animate(0, by, when);
    },
    // this function searches for all runners on the element and deletes the ones
    // which run before the current one. This is because absolute transformations
    // overwfrite anything anyway so there is no need to waste time computing
    // other runners
    _clearTransformRunnersBefore(currentRunner) {
      this._transformationRunners.clearBefore(currentRunner.id);
    },
    _currentTransform(current) {
      return this._transformationRunners.runners.filter((runner) => runner.id <= current.id).map(getRunnerTransform).reduce(lmultiply, new Matrix());
    },
    _addRunner(runner) {
      this._transformationRunners.add(runner);
      Animator.cancelImmediate(this._frameId);
      this._frameId = Animator.immediate(mergeTransforms.bind(this));
    },
    _prepareRunner() {
      if (this._frameId == null) {
        this._transformationRunners = new RunnerArray().add(new FakeRunner(new Matrix(this)));
      }
    }
  }
});
var difference = (a, b) => a.filter((x2) => !b.includes(x2));
extend(Runner, {
  attr(a, v) {
    return this.styleAttr("attr", a, v);
  },
  // Add animatable styles
  css(s, v) {
    return this.styleAttr("css", s, v);
  },
  styleAttr(type, nameOrAttrs, val) {
    if (typeof nameOrAttrs === "string") {
      return this.styleAttr(type, {
        [nameOrAttrs]: val
      });
    }
    let attrs2 = nameOrAttrs;
    if (this._tryRetarget(type, attrs2))
      return this;
    let morpher = new Morphable(this._stepper).to(attrs2);
    let keys = Object.keys(attrs2);
    this.queue(function() {
      morpher = morpher.from(this.element()[type](keys));
    }, function(pos) {
      this.element()[type](morpher.at(pos).valueOf());
      return morpher.done();
    }, function(newToAttrs) {
      const newKeys = Object.keys(newToAttrs);
      const differences = difference(newKeys, keys);
      if (differences.length) {
        const addedFromAttrs = this.element()[type](differences);
        const oldFromAttrs = new ObjectBag(morpher.from()).valueOf();
        Object.assign(oldFromAttrs, addedFromAttrs);
        morpher.from(oldFromAttrs);
      }
      const oldToAttrs = new ObjectBag(morpher.to()).valueOf();
      Object.assign(oldToAttrs, newToAttrs);
      morpher.to(oldToAttrs);
      keys = newKeys;
      attrs2 = newToAttrs;
    });
    this._rememberMorpher(type, morpher);
    return this;
  },
  zoom(level, point2) {
    if (this._tryRetarget("zoom", level, point2))
      return this;
    let morpher = new Morphable(this._stepper).to(new SVGNumber(level));
    this.queue(function() {
      morpher = morpher.from(this.element().zoom());
    }, function(pos) {
      this.element().zoom(morpher.at(pos), point2);
      return morpher.done();
    }, function(newLevel, newPoint) {
      point2 = newPoint;
      morpher.to(newLevel);
    });
    this._rememberMorpher("zoom", morpher);
    return this;
  },
  /**
   ** absolute transformations
   **/
  //
  // M v -----|-----(D M v = F v)------|----->  T v
  //
  // 1. define the final state (T) and decompose it (once)
  //    t = [tx, ty, the, lam, sy, sx]
  // 2. on every frame: pull the current state of all previous transforms
  //    (M - m can change)
  //   and then write this as m = [tx0, ty0, the0, lam0, sy0, sx0]
  // 3. Find the interpolated matrix F(pos) = m + pos * (t - m)
  //   - Note F(0) = M
  //   - Note F(1) = T
  // 4. Now you get the delta matrix as a result: D = F * inv(M)
  transform(transforms2, relative, affine) {
    relative = transforms2.relative || relative;
    if (this._isDeclarative && !relative && this._tryRetarget("transform", transforms2)) {
      return this;
    }
    const isMatrix = Matrix.isMatrixLike(transforms2);
    affine = transforms2.affine != null ? transforms2.affine : affine != null ? affine : !isMatrix;
    const morpher = new Morphable(this._stepper).type(affine ? TransformBag : Matrix);
    let origin;
    let element;
    let current;
    let currentAngle;
    let startTransform;
    function setup() {
      element = element || this.element();
      origin = origin || getOrigin(transforms2, element);
      startTransform = new Matrix(relative ? void 0 : element);
      element._addRunner(this);
      if (!relative) {
        element._clearTransformRunnersBefore(this);
      }
    }
    function run(pos) {
      if (!relative)
        this.clearTransform();
      const {
        x: x2,
        y: y2
      } = new Point(origin).transform(element._currentTransform(this));
      let target = new Matrix({
        ...transforms2,
        origin: [x2, y2]
      });
      let start = this._isDeclarative && current ? current : startTransform;
      if (affine) {
        target = target.decompose(x2, y2);
        start = start.decompose(x2, y2);
        const rTarget = target.rotate;
        const rCurrent = start.rotate;
        const possibilities = [rTarget - 360, rTarget, rTarget + 360];
        const distances = possibilities.map((a) => Math.abs(a - rCurrent));
        const shortest = Math.min(...distances);
        const index = distances.indexOf(shortest);
        target.rotate = possibilities[index];
      }
      if (relative) {
        if (!isMatrix) {
          target.rotate = transforms2.rotate || 0;
        }
        if (this._isDeclarative && currentAngle) {
          start.rotate = currentAngle;
        }
      }
      morpher.from(start);
      morpher.to(target);
      const affineParameters = morpher.at(pos);
      currentAngle = affineParameters.rotate;
      current = new Matrix(affineParameters);
      this.addTransform(current);
      element._addRunner(this);
      return morpher.done();
    }
    function retarget(newTransforms) {
      if ((newTransforms.origin || "center").toString() !== (transforms2.origin || "center").toString()) {
        origin = getOrigin(newTransforms, element);
      }
      transforms2 = {
        ...newTransforms,
        origin
      };
    }
    this.queue(setup, run, retarget, true);
    this._isDeclarative && this._rememberMorpher("transform", morpher);
    return this;
  },
  // Animatable x-axis
  x(x2, relative) {
    return this._queueNumber("x", x2);
  },
  // Animatable y-axis
  y(y2) {
    return this._queueNumber("y", y2);
  },
  dx(x2 = 0) {
    return this._queueNumberDelta("x", x2);
  },
  dy(y2 = 0) {
    return this._queueNumberDelta("y", y2);
  },
  dmove(x2, y2) {
    return this.dx(x2).dy(y2);
  },
  _queueNumberDelta(method, to2) {
    to2 = new SVGNumber(to2);
    if (this._tryRetarget(method, to2))
      return this;
    const morpher = new Morphable(this._stepper).to(to2);
    let from2 = null;
    this.queue(function() {
      from2 = this.element()[method]();
      morpher.from(from2);
      morpher.to(from2 + to2);
    }, function(pos) {
      this.element()[method](morpher.at(pos));
      return morpher.done();
    }, function(newTo) {
      morpher.to(from2 + new SVGNumber(newTo));
    });
    this._rememberMorpher(method, morpher);
    return this;
  },
  _queueObject(method, to2) {
    if (this._tryRetarget(method, to2))
      return this;
    const morpher = new Morphable(this._stepper).to(to2);
    this.queue(function() {
      morpher.from(this.element()[method]());
    }, function(pos) {
      this.element()[method](morpher.at(pos));
      return morpher.done();
    });
    this._rememberMorpher(method, morpher);
    return this;
  },
  _queueNumber(method, value) {
    return this._queueObject(method, new SVGNumber(value));
  },
  // Animatable center x-axis
  cx(x2) {
    return this._queueNumber("cx", x2);
  },
  // Animatable center y-axis
  cy(y2) {
    return this._queueNumber("cy", y2);
  },
  // Add animatable move
  move(x2, y2) {
    return this.x(x2).y(y2);
  },
  // Add animatable center
  center(x2, y2) {
    return this.cx(x2).cy(y2);
  },
  // Add animatable size
  size(width2, height2) {
    let box;
    if (!width2 || !height2) {
      box = this._element.bbox();
    }
    if (!width2) {
      width2 = box.width / box.height * height2;
    }
    if (!height2) {
      height2 = box.height / box.width * width2;
    }
    return this.width(width2).height(height2);
  },
  // Add animatable width
  width(width2) {
    return this._queueNumber("width", width2);
  },
  // Add animatable height
  height(height2) {
    return this._queueNumber("height", height2);
  },
  // Add animatable plot
  plot(a, b, c, d) {
    if (arguments.length === 4) {
      return this.plot([a, b, c, d]);
    }
    if (this._tryRetarget("plot", a))
      return this;
    const morpher = new Morphable(this._stepper).type(this._element.MorphArray).to(a);
    this.queue(function() {
      morpher.from(this._element.array());
    }, function(pos) {
      this._element.plot(morpher.at(pos));
      return morpher.done();
    });
    this._rememberMorpher("plot", morpher);
    return this;
  },
  // Add leading method
  leading(value) {
    return this._queueNumber("leading", value);
  },
  // Add animatable viewbox
  viewbox(x2, y2, width2, height2) {
    return this._queueObject("viewbox", new Box(x2, y2, width2, height2));
  },
  update(o) {
    if (typeof o !== "object") {
      return this.update({
        offset: arguments[0],
        color: arguments[1],
        opacity: arguments[2]
      });
    }
    if (o.opacity != null)
      this.attr("stop-opacity", o.opacity);
    if (o.color != null)
      this.attr("stop-color", o.color);
    if (o.offset != null)
      this.attr("offset", o.offset);
    return this;
  }
});
extend(Runner, {
  rx,
  ry,
  from,
  to
});
register(Runner, "Runner");
var Svg = class extends Container {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("svg", node), attrs2);
    this.namespace();
  }
  // Creates and returns defs element
  defs() {
    if (!this.isRoot())
      return this.root().defs();
    return adopt(this.node.querySelector("defs")) || this.put(new Defs());
  }
  isRoot() {
    return !this.node.parentNode || !(this.node.parentNode instanceof globals.window.SVGElement) && this.node.parentNode.nodeName !== "#document-fragment";
  }
  // Add namespaces
  namespace() {
    if (!this.isRoot())
      return this.root().namespace();
    return this.attr({
      xmlns: svg,
      version: "1.1"
    }).attr("xmlns:xlink", xlink, xmlns).attr("xmlns:svgjs", svgjs, xmlns);
  }
  removeNamespace() {
    return this.attr({
      xmlns: null,
      version: null
    }).attr("xmlns:xlink", null, xmlns).attr("xmlns:svgjs", null, xmlns);
  }
  // Check if this is a root svg
  // If not, call root() from this element
  root() {
    if (this.isRoot())
      return this;
    return super.root();
  }
};
registerMethods({
  Container: {
    // Create nested svg document
    nested: wrapWithAttrCheck(function() {
      return this.put(new Svg());
    })
  }
});
register(Svg, "Svg", true);
var Symbol = class extends Container {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("symbol", node), attrs2);
  }
};
registerMethods({
  Container: {
    symbol: wrapWithAttrCheck(function() {
      return this.put(new Symbol());
    })
  }
});
register(Symbol, "Symbol");
function plain(text) {
  if (this._build === false) {
    this.clear();
  }
  this.node.appendChild(globals.document.createTextNode(text));
  return this;
}
function length() {
  return this.node.getComputedTextLength();
}
function x$1(x2, box = this.bbox()) {
  if (x2 == null) {
    return box.x;
  }
  return this.attr("x", this.attr("x") + x2 - box.x);
}
function y$1(y2, box = this.bbox()) {
  if (y2 == null) {
    return box.y;
  }
  return this.attr("y", this.attr("y") + y2 - box.y);
}
function move$1(x2, y2, box = this.bbox()) {
  return this.x(x2, box).y(y2, box);
}
function cx(x2, box = this.bbox()) {
  if (x2 == null) {
    return box.cx;
  }
  return this.attr("x", this.attr("x") + x2 - box.cx);
}
function cy(y2, box = this.bbox()) {
  if (y2 == null) {
    return box.cy;
  }
  return this.attr("y", this.attr("y") + y2 - box.cy);
}
function center(x2, y2, box = this.bbox()) {
  return this.cx(x2, box).cy(y2, box);
}
function ax(x2) {
  return this.attr("x", x2);
}
function ay(y2) {
  return this.attr("y", y2);
}
function amove(x2, y2) {
  return this.ax(x2).ay(y2);
}
function build(build2) {
  this._build = !!build2;
  return this;
}
var textable = {
  __proto__: null,
  plain,
  length,
  x: x$1,
  y: y$1,
  move: move$1,
  cx,
  cy,
  center,
  ax,
  ay,
  amove,
  build
};
var Text = class extends Shape {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("text", node), attrs2);
    this.dom.leading = new SVGNumber(1.3);
    this._rebuild = true;
    this._build = false;
  }
  // Set / get leading
  leading(value) {
    if (value == null) {
      return this.dom.leading;
    }
    this.dom.leading = new SVGNumber(value);
    return this.rebuild();
  }
  // Rebuild appearance type
  rebuild(rebuild) {
    if (typeof rebuild === "boolean") {
      this._rebuild = rebuild;
    }
    if (this._rebuild) {
      const self = this;
      let blankLineOffset = 0;
      const leading = this.dom.leading;
      this.each(function(i) {
        const fontSize = globals.window.getComputedStyle(this.node).getPropertyValue("font-size");
        const dy2 = leading * new SVGNumber(fontSize);
        if (this.dom.newLined) {
          this.attr("x", self.attr("x"));
          if (this.text() === "\n") {
            blankLineOffset += dy2;
          } else {
            this.attr("dy", i ? dy2 + blankLineOffset : 0);
            blankLineOffset = 0;
          }
        }
      });
      this.fire("rebuild");
    }
    return this;
  }
  // overwrite method from parent to set data properly
  setData(o) {
    this.dom = o;
    this.dom.leading = new SVGNumber(o.leading || 1.3);
    return this;
  }
  // Set the text content
  text(text) {
    if (text === void 0) {
      const children = this.node.childNodes;
      let firstLine = 0;
      text = "";
      for (let i = 0, len = children.length; i < len; ++i) {
        if (children[i].nodeName === "textPath") {
          if (i === 0)
            firstLine = 1;
          continue;
        }
        if (i !== firstLine && children[i].nodeType !== 3 && adopt(children[i]).dom.newLined === true) {
          text += "\n";
        }
        text += children[i].textContent;
      }
      return text;
    }
    this.clear().build(true);
    if (typeof text === "function") {
      text.call(this, this);
    } else {
      text = (text + "").split("\n");
      for (let j = 0, jl = text.length; j < jl; j++) {
        this.newLine(text[j]);
      }
    }
    return this.build(false).rebuild();
  }
};
extend(Text, textable);
registerMethods({
  Container: {
    // Create text element
    text: wrapWithAttrCheck(function(text = "") {
      return this.put(new Text()).text(text);
    }),
    // Create plain text element
    plain: wrapWithAttrCheck(function(text = "") {
      return this.put(new Text()).plain(text);
    })
  }
});
register(Text, "Text");
var Tspan = class extends Shape {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("tspan", node), attrs2);
    this._build = false;
  }
  // Shortcut dx
  dx(dx2) {
    return this.attr("dx", dx2);
  }
  // Shortcut dy
  dy(dy2) {
    return this.attr("dy", dy2);
  }
  // Create new line
  newLine() {
    this.dom.newLined = true;
    const text = this.parent();
    if (!(text instanceof Text)) {
      return this;
    }
    const i = text.index(this);
    const fontSize = globals.window.getComputedStyle(this.node).getPropertyValue("font-size");
    const dy2 = text.dom.leading * new SVGNumber(fontSize);
    return this.dy(i ? dy2 : 0).attr("x", text.x());
  }
  // Set text content
  text(text) {
    if (text == null)
      return this.node.textContent + (this.dom.newLined ? "\n" : "");
    if (typeof text === "function") {
      this.clear().build(true);
      text.call(this, this);
      this.build(false);
    } else {
      this.plain(text);
    }
    return this;
  }
};
extend(Tspan, textable);
registerMethods({
  Tspan: {
    tspan: wrapWithAttrCheck(function(text = "") {
      const tspan = new Tspan();
      if (!this._build) {
        this.clear();
      }
      return this.put(tspan).text(text);
    })
  },
  Text: {
    newLine: function(text = "") {
      return this.tspan(text).newLine();
    }
  }
});
register(Tspan, "Tspan");
var Circle = class extends Shape {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("circle", node), attrs2);
  }
  radius(r) {
    return this.attr("r", r);
  }
  // Radius x value
  rx(rx2) {
    return this.attr("r", rx2);
  }
  // Alias radius x value
  ry(ry2) {
    return this.rx(ry2);
  }
  size(size2) {
    return this.radius(new SVGNumber(size2).divide(2));
  }
};
extend(Circle, {
  x: x$3,
  y: y$3,
  cx: cx$1,
  cy: cy$1,
  width: width$2,
  height: height$2
});
registerMethods({
  Container: {
    // Create circle element
    circle: wrapWithAttrCheck(function(size2 = 0) {
      return this.put(new Circle()).size(size2).move(0, 0);
    })
  }
});
register(Circle, "Circle");
var ClipPath = class extends Container {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("clipPath", node), attrs2);
  }
  // Unclip all clipped elements and remove itself
  remove() {
    this.targets().forEach(function(el) {
      el.unclip();
    });
    return super.remove();
  }
  targets() {
    return baseFind('svg [clip-path*="' + this.id() + '"]');
  }
};
registerMethods({
  Container: {
    // Create clipping element
    clip: wrapWithAttrCheck(function() {
      return this.defs().put(new ClipPath());
    })
  },
  Element: {
    // Distribute clipPath to svg element
    clipper() {
      return this.reference("clip-path");
    },
    clipWith(element) {
      const clipper = element instanceof ClipPath ? element : this.parent().clip().add(element);
      return this.attr("clip-path", 'url("#' + clipper.id() + '")');
    },
    // Unclip element
    unclip() {
      return this.attr("clip-path", null);
    }
  }
});
register(ClipPath, "ClipPath");
var ForeignObject = class extends Element {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("foreignObject", node), attrs2);
  }
};
registerMethods({
  Container: {
    foreignObject: wrapWithAttrCheck(function(width2, height2) {
      return this.put(new ForeignObject()).size(width2, height2);
    })
  }
});
register(ForeignObject, "ForeignObject");
function dmove(dx2, dy2) {
  this.children().forEach((child, i) => {
    let bbox2;
    try {
      bbox2 = child.bbox();
    } catch (e) {
      return;
    }
    const m = new Matrix(child);
    const matrix = m.translate(dx2, dy2).transform(m.inverse());
    const p = new Point(bbox2.x, bbox2.y).transform(matrix);
    child.move(p.x, p.y);
  });
  return this;
}
function dx(dx2) {
  return this.dmove(dx2, 0);
}
function dy(dy2) {
  return this.dmove(0, dy2);
}
function height(height2, box = this.bbox()) {
  if (height2 == null)
    return box.height;
  return this.size(box.width, height2, box);
}
function move(x2 = 0, y2 = 0, box = this.bbox()) {
  const dx2 = x2 - box.x;
  const dy2 = y2 - box.y;
  return this.dmove(dx2, dy2);
}
function size(width2, height2, box = this.bbox()) {
  const p = proportionalSize(this, width2, height2, box);
  const scaleX = p.width / box.width;
  const scaleY = p.height / box.height;
  this.children().forEach((child, i) => {
    const o = new Point(box).transform(new Matrix(child).inverse());
    child.scale(scaleX, scaleY, o.x, o.y);
  });
  return this;
}
function width(width2, box = this.bbox()) {
  if (width2 == null)
    return box.width;
  return this.size(width2, box.height, box);
}
function x(x2, box = this.bbox()) {
  if (x2 == null)
    return box.x;
  return this.move(x2, box.y, box);
}
function y(y2, box = this.bbox()) {
  if (y2 == null)
    return box.y;
  return this.move(box.x, y2, box);
}
var containerGeometry = {
  __proto__: null,
  dmove,
  dx,
  dy,
  height,
  move,
  size,
  width,
  x,
  y
};
var G = class extends Container {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("g", node), attrs2);
  }
};
extend(G, containerGeometry);
registerMethods({
  Container: {
    // Create a group element
    group: wrapWithAttrCheck(function() {
      return this.put(new G());
    })
  }
});
register(G, "G");
var A = class extends Container {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("a", node), attrs2);
  }
  // Link target attribute
  target(target) {
    return this.attr("target", target);
  }
  // Link url
  to(url) {
    return this.attr("href", url, xlink);
  }
};
extend(A, containerGeometry);
registerMethods({
  Container: {
    // Create a hyperlink element
    link: wrapWithAttrCheck(function(url) {
      return this.put(new A()).to(url);
    })
  },
  Element: {
    unlink() {
      const link = this.linker();
      if (!link)
        return this;
      const parent = link.parent();
      if (!parent) {
        return this.remove();
      }
      const index = parent.index(link);
      parent.add(this, index);
      link.remove();
      return this;
    },
    linkTo(url) {
      let link = this.linker();
      if (!link) {
        link = new A();
        this.wrap(link);
      }
      if (typeof url === "function") {
        url.call(link, link);
      } else {
        link.to(url);
      }
      return this;
    },
    linker() {
      const link = this.parent();
      if (link && link.node.nodeName.toLowerCase() === "a") {
        return link;
      }
      return null;
    }
  }
});
register(A, "A");
var Mask = class extends Container {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("mask", node), attrs2);
  }
  // Unmask all masked elements and remove itself
  remove() {
    this.targets().forEach(function(el) {
      el.unmask();
    });
    return super.remove();
  }
  targets() {
    return baseFind('svg [mask*="' + this.id() + '"]');
  }
};
registerMethods({
  Container: {
    mask: wrapWithAttrCheck(function() {
      return this.defs().put(new Mask());
    })
  },
  Element: {
    // Distribute mask to svg element
    masker() {
      return this.reference("mask");
    },
    maskWith(element) {
      const masker = element instanceof Mask ? element : this.parent().mask().add(element);
      return this.attr("mask", 'url("#' + masker.id() + '")');
    },
    // Unmask element
    unmask() {
      return this.attr("mask", null);
    }
  }
});
register(Mask, "Mask");
var Stop = class extends Element {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("stop", node), attrs2);
  }
  // add color stops
  update(o) {
    if (typeof o === "number" || o instanceof SVGNumber) {
      o = {
        offset: arguments[0],
        color: arguments[1],
        opacity: arguments[2]
      };
    }
    if (o.opacity != null)
      this.attr("stop-opacity", o.opacity);
    if (o.color != null)
      this.attr("stop-color", o.color);
    if (o.offset != null)
      this.attr("offset", new SVGNumber(o.offset));
    return this;
  }
};
registerMethods({
  Gradient: {
    // Add a color stop
    stop: function(offset, color, opacity) {
      return this.put(new Stop()).update(offset, color, opacity);
    }
  }
});
register(Stop, "Stop");
function cssRule(selector, rule) {
  if (!selector)
    return "";
  if (!rule)
    return selector;
  let ret = selector + "{";
  for (const i in rule) {
    ret += unCamelCase(i) + ":" + rule[i] + ";";
  }
  ret += "}";
  return ret;
}
var Style = class extends Element {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("style", node), attrs2);
  }
  addText(w = "") {
    this.node.textContent += w;
    return this;
  }
  font(name, src, params = {}) {
    return this.rule("@font-face", {
      fontFamily: name,
      src,
      ...params
    });
  }
  rule(selector, obj) {
    return this.addText(cssRule(selector, obj));
  }
};
registerMethods("Dom", {
  style(selector, obj) {
    return this.put(new Style()).rule(selector, obj);
  },
  fontface(name, src, params) {
    return this.put(new Style()).font(name, src, params);
  }
});
register(Style, "Style");
var TextPath = class extends Text {
  // Initialize node
  constructor(node, attrs2 = node) {
    super(nodeOrNew("textPath", node), attrs2);
  }
  // return the array of the path track element
  array() {
    const track = this.track();
    return track ? track.array() : null;
  }
  // Plot path if any
  plot(d) {
    const track = this.track();
    let pathArray = null;
    if (track) {
      pathArray = track.plot(d);
    }
    return d == null ? pathArray : this;
  }
  // Get the path element
  track() {
    return this.reference("href");
  }
};
registerMethods({
  Container: {
    textPath: wrapWithAttrCheck(function(text, path) {
      if (!(text instanceof Text)) {
        text = this.text(text);
      }
      return text.path(path);
    })
  },
  Text: {
    // Create path for text to run on
    path: wrapWithAttrCheck(function(track, importNodes = true) {
      const textPath = new TextPath();
      if (!(track instanceof Path)) {
        track = this.defs().path(track);
      }
      textPath.attr("href", "#" + track, xlink);
      let node;
      if (importNodes) {
        while (node = this.node.firstChild) {
          textPath.node.appendChild(node);
        }
      }
      return this.put(textPath);
    }),
    // Get the textPath children
    textPath() {
      return this.findOne("textPath");
    }
  },
  Path: {
    // creates a textPath from this path
    text: wrapWithAttrCheck(function(text) {
      if (!(text instanceof Text)) {
        text = new Text().addTo(this.parent()).text(text);
      }
      return text.path(this);
    }),
    targets() {
      return baseFind("svg textPath").filter((node) => {
        return (node.attr("href") || "").includes(this.id());
      });
    }
  }
});
TextPath.prototype.MorphArray = PathArray;
register(TextPath, "TextPath");
var Use = class extends Shape {
  constructor(node, attrs2 = node) {
    super(nodeOrNew("use", node), attrs2);
  }
  // Use element as a reference
  use(element, file) {
    return this.attr("href", (file || "") + "#" + element, xlink);
  }
};
registerMethods({
  Container: {
    // Create a use element
    use: wrapWithAttrCheck(function(element, file) {
      return this.put(new Use()).use(element, file);
    })
  }
});
register(Use, "Use");
var SVG = makeInstance;
extend([Svg, Symbol, Image, Pattern, Marker], getMethodsFor("viewbox"));
extend([Line, Polyline, Polygon, Path], getMethodsFor("marker"));
extend(Text, getMethodsFor("Text"));
extend(Path, getMethodsFor("Path"));
extend(Defs, getMethodsFor("Defs"));
extend([Text, Tspan], getMethodsFor("Tspan"));
extend([Rect, Ellipse, Gradient, Runner], getMethodsFor("radius"));
extend(EventTarget, getMethodsFor("EventTarget"));
extend(Dom, getMethodsFor("Dom"));
extend(Element, getMethodsFor("Element"));
extend(Shape, getMethodsFor("Shape"));
extend([Container, Fragment], getMethodsFor("Container"));
extend(Gradient, getMethodsFor("Gradient"));
extend(Runner, getMethodsFor("Runner"));
List.extend(getMethodNames());
registerMorphableType([SVGNumber, Color, Box, Matrix, SVGArray, PointArray, PathArray, Point]);
makeMorphable();
export {
  A,
  Animator,
  SVGArray as Array,
  Box,
  Circle,
  ClipPath,
  Color,
  Container,
  Controller,
  Defs,
  Dom,
  Ease,
  Element,
  Ellipse,
  EventTarget,
  ForeignObject,
  Fragment,
  G,
  Gradient,
  Image,
  Line,
  List,
  Marker,
  Mask,
  Matrix,
  Morphable,
  NonMorphable,
  SVGNumber as Number,
  ObjectBag,
  PID,
  Path,
  PathArray,
  Pattern,
  Point,
  PointArray,
  Polygon,
  Polyline,
  Queue,
  Rect,
  Runner,
  SVG,
  Shape,
  Spring,
  Stop,
  Style,
  Svg,
  Symbol,
  Text,
  TextPath,
  Timeline,
  TransformBag,
  Tspan,
  Use,
  adopt,
  assignNewId,
  clearEvents,
  create,
  defaults,
  dispatch,
  easing,
  eid,
  extend,
  baseFind as find,
  getClass,
  getEventTarget,
  getEvents,
  getWindow,
  makeInstance,
  makeMorphable,
  mockAdopt,
  namespaces,
  nodeOrNew,
  off,
  on,
  parser,
  regex,
  register,
  registerMorphableType,
  registerWindow,
  restoreWindow,
  root,
  saveWindow,
  utils,
  windowEvents,
  withWindow,
  wrapWithAttrCheck
};
/*! Bundled license information:

@svgdotjs/svg.js/dist/svg.esm.js:
  (*!
  * @svgdotjs/svg.js - A lightweight library for manipulating and animating SVG.
  * @version 3.1.2
  * https://svgjs.dev/
  *
  * @copyright Wout Fierens <wout@mick-wout.com>
  * @license MIT
  *
  * BUILT: Wed Jan 26 2022 23:19:07 GMT+0100 (Mitteleuropäische Normalzeit)
  *)
*/
//# sourceMappingURL=@svgdotjs_svg__js.js.map
