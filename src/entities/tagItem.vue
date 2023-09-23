<template>
  <div class="tag">
    <div class="tag-text">
      <slot></slot>
    </div>
    <slot name="closeButton">
      <MyButton
        :theme="[ThemeButton.ICON]"
        class="tag-close"
        v-if="props.viewCloseButton"
        @click="emits('deleteTag')"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L11 11M1 11L11 1"
            stroke="#16171B"
            stroke-linecap="round"
          />
        </svg>
      </MyButton>
    </slot>
  </div>
</template>

<script setup lang="ts">
import MyButton, { ThemeButton } from "./myButton.vue";

const props = withDefaults(
  defineProps<{
    viewCloseButton?: boolean;
  }>(),
  {
    viewCloseButton: true,
  }
);
const emits = defineEmits<{
  (e: "deleteTag"): void;
}>();
</script>

<style scoped lang="scss">
.tag {
  width: max-content;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 12px;
  background-color: var(--color-lightgrey);
  border-radius: 4px;
  &-text {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
  }
  &-close {
    margin-left: 8px;
    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
