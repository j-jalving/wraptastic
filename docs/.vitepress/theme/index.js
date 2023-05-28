import DefaultTheme from "vitepress/theme";
import WraptasticContainer from "./components/WraptasticContainer.vue";

import "../../../lib/style.scss";
import "./custom.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component("WraptasticContainer", WraptasticContainer);
  },
};
