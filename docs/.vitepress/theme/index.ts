import Theme from "vitepress/theme";
import "./styles/style.css";
import { useComponents } from './useComponents'
import { SVG } from '@svgdotjs/svg.js'
export default {
  ...Theme,
  enhanceApp(ctx) {
    Theme.enhanceApp(ctx) 
    ctx.app.config.globalProperties.$SVG = SVG
    useComponents(ctx.app)
    console.log(ctx.app);
  }
};
