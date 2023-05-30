import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/wraptastic/",
  title: "Wraptastic.js",
  description:
    "Wraptastic.js is a simple JavaScript package that effortlessly helps you manage list wrapping and overflows",
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
        ],
      },
      {
        text: "More",
        items: [
          { text: " Demos", link: "/demos" },
          { text: " Troubleshooting", link: "/troubleshooting" },
        ],
      },
    ],
    footer: {
      message: "Released under the MIT License.",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/j-jalving/wraptastic" },
    ],
  },
});
