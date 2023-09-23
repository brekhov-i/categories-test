<template>
  <button
    class="btn"
    :class="[theme]"
    :style="`border-color: ${
      colorBorder && theme.includes('outline') ? colorBorder : 'none'
    }`"
  >
    <slot />
  </button>
</template>

<script lang="ts">
export enum ThemeButton {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  OUTLINE = "outline",
  ICON = "icon",
}
export default {
  props: {
    theme: {
      type: Array,
      default: () => [ThemeButton.PRIMARY],
    },
    colorBorder: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
button {
  width: auto;
  height: auto;
  padding: 8px 16px;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }

  &.transparent {
    background-color: transparent;
    color: #000000;
  }

  &.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }

  &.primary {
    background-color: var(--color-main);
    color: var(--color-white);
  }

  &.secondary {
    background-color: var(--color-lightgrey);
  }

  &.outline {
    border: 1px solid var(--color-main);
  }
}
</style>
