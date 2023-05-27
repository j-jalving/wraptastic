import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/j-jalving/docs/",
  title: "Wraptastic.js",
  description:
    "Wraptastic.js is a simple JavaScript package that effortlessly helps you manage inline list wrapping and overflows",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/setup" },
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: " Setup", link: "/setup" },
          { text: " Options", link: "/options" },
          { text: " Events", link: "/events" },
          { text: " Methods", link: "/methods" },

          { text: " Examples", link: "/examples" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
