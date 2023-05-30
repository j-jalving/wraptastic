<template>
  <a href="#" class="toggle" @click="animate = !animate" v-if="animateButton">
    {{ animate ? "Stop demo" : "Start demo" }}</a
  >
  <div class="wraptastic-container" :class="classNames">
    <slot></slot>
  </div>
</template>

<script type="ts">
export default {
  props: {
    inline: {
      type: Boolean,
      default: true
    },
    animate: {
      type: Boolean,
      default: false
    },
    animateButton: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classNames() {
      return [
        this.inline ? "horizontal" : "vertical",
        this.animate ? "animate" : ""
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
.wraptastic-container {
  min-width: 20%;
  margin: 16px 0;
  padding: 20px;
  overflow: hidden;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  resize: both;
}

.horizontal {
  &.animate {
    animation: stretch-width 6s alternate infinite 1s ease-in-out;
  }
}

.vertical {
  display: flex;
  height: 382px;

  &.animate {
    animation: stretch-height 6s alternate infinite 1s ease-in-out;
  }
}

@keyframes stretch-width {
  0% {
    width: 100%;
  }
  100% {
    width: 20%;
  }
}

@keyframes stretch-height {
  0% {
    height: 382px;
  }
  100% {
    height: 72px;
  }
}
</style>
