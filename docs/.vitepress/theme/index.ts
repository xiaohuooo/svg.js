import Theme from "vitepress/theme";
import "./styles/style.css";
import './styles/rainbow.css'
import { useComponents } from './useComponents'
export default {
  ...Theme,
  enhanceApp(ctx) {
    Theme.enhanceApp(ctx) 
    useComponents(ctx.app)
  }
};
