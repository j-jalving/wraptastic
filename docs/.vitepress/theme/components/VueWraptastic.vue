<template>
  <slot></slot>
</template>

<script>
import Wraptastic from "../../../../lib/Wraptastic.ts";

export default {
  data() {
    return {};
  },
  props: {
    container: {
      type: String,
      default: undefined,
    },
    data: {
      type: Array,
      default: undefined,
    },
    lines: {
      type: Number,
      default: undefined,
    },
    inline: {
      type: Boolean,
      default: undefined,
    },
    item: {
      type: String,
      default: undefined,
    },
    itemClass: {
      type: String,
      default: undefined,
    },
    counter: {
      type: String,
      default: undefined,
    },
    counterClass: {
      type: String,
      default: undefined,
    },
    counterTemplate: {
      type: [String, Function],
      default: undefined,
    },
    counterEnabled: {
      type: Boolean,
      default: undefined,
    },
  },
  mounted() {
    // Prepare configuration
    const config = {
      container: this.container,
      data: this.data,
      lines: this.lines,
      inline: this.inline,
      item: this.item,
      itemClass: this.itemClass,
      counter: this.counter,
      counterClass: this.counterClass,
      counterTemplate: this.counterTemplate,
      counterEnabled: this.counterEnabled,
    };
    // Clean the config object
    this.cleanConfig(config);
    // Create new Wraptastic.js instance
    new Wraptastic(config);
  },
  methods: {
    /**
     * Returns the config object without any undefined properties
     * @param {object} config
     */
    cleanConfig(config) {
      Object.keys(config).forEach((key) =>
        config[key] === undefined ? delete config[key] : {}
      );
    },
  },
};
</script>
