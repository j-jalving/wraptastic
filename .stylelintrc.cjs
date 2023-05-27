module.exports = {
  extends: [
    "stylelint-config-recommended-scss", // The recommended shareable SCSS config for stylelint
  ],
  plugins: [
    "stylelint-prettier", // Runs Prettier as a Stylelint rule and reports differences as individual Stylelint issues.
    "stylelint-scss", // A collection of SCSS specific linting rules for stylelint
    "stylelint-declaration-block-no-ignored-properties", // Disallow property values that are ignored due to another property value in the same rule
  ],
};
