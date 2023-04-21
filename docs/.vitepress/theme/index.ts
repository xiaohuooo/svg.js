import Theme from "vitepress/theme";
import "./styles/style.css";

export default {
  ...Theme,
  enhanceApp(ctx) {
    Theme.enhanceApp(ctx)
  }
};
