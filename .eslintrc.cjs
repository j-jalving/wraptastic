module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": process.env.NODE_ENV === "development" ? "off" : "error",
    "no-debugger": process.env.NODE_ENV === "development" ? "off" : "error",
    "max-len": process.env.NODE_ENV === "development" ? "warn" : "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-empty-function": "off",
  },
};
