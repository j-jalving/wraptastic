<template>
  <div class="wraptastic-container" :class="classNames">
    <slot></slot>
  </div>
  <a href="#" class="toggle" @click="animate = !animate" v-if="animateButton">
    {{ animate ? "Stop demo" : "Start demo" }}</a
  >
</template>

<script type="ts">
export default {
  props: {
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
      return {
        "animate": this.animate
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.wraptastic-container {
  min-width: 20%;
  min-height: 152px;
  margin: 16px 0;
  padding: 20px;
  overflow: hidden;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  resize: horizontal;
}

.animate {
  animation: stretch 6s alternate infinite 1s ease-in-out;
}

@keyframes stretch {
  0% {
    width: 100%;
  }
  100% {
    width: 20%;
  }
}
</style>
