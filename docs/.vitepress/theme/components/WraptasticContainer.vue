<template>
  <div class="wraptastic-container">
    <vue-wraptastic
      :container="config.container"
      :data="config.data"
      :lines="config.lines"
      :inline="config.inline"
      :item="config.item"
      :itemClass="config.itemClass"
      :counter="config.counter"
      :counterClass="config.counterClass"
      :counterTemplate="config.counterTemplate"
      :counterEnabled="config.counterEnabled"
    >
      <slot></slot>
    </vue-wraptastic>
  </div>
</template>

<script>
import VueWraptastic from "./VueWraptastic.vue";

export default {
  components: {
    VueWraptastic,
  },
  data() {
    return {};
  },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
