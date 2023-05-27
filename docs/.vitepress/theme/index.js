import DefaultTheme from "vitepress/theme";
import WraptasticContainer from "./components/WraptasticContainer.vue";

import "./custom.css";
import "../../../lib/style.scss";

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component("WraptasticContainer", WraptasticContainer);
  },
};
