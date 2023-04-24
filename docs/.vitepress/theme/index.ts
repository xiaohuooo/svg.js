import Theme from "vitepress/theme";
import "./styles/style.css";
import { useComponents } from './useComponents'
import { SVG } from '@svgdotjs/svg.js'
export default {
  ...Theme,
  enhanceApp(ctx) {
    Theme.enhanceApp(ctx) 
    useComponents(ctx.app)
  }
};
