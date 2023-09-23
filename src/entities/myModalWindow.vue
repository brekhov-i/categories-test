<template>
  <div class="myModalWindow" ref="myModalWindow">
    <div class="myModalWindow-wrapper">
      <div class="myModalWindow-header">
        <slot name="header"></slot>
        <MyButton
          :theme="[ThemeButton.ICON]"
          class="myModalWindow-close"
          @click="emits('closeWindow')"
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
      </div>
      <div class="myModalWindow-body">
        <slot></slot>
      </div>
      <div class="myModalWindow-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MyButton, { ThemeButton } from "./myButton.vue";

const emits = defineEmits<{
  (e: "closeWindow"): void;
}>();

const myModalWindow = ref<HTMLElement>();

onMounted(() => {
  myModalWindow.value?.addEventListener("click", (e: MouseEvent) => {
    const wrapper: HTMLElement = myModalWindow.value?.querySelector(
      ".myModalWindow-wrapper"
    ) as HTMLElement;
    if (!e.composedPath().includes(wrapper)) {
      emits("closeWindow");
    }
  });
});
</script>

<style scoped lang="scss">
.myModalWindow {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(#16171b, 0.4);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: 0.5s all ease-in-out;
  &.open {
    opacity: 1;
    visibility: visible;
    transition: 0.5s all ease-in-out;
  }
  &-wrapper {
    width: 540px;
    height: auto;
    background-color: #ffffff;
    border-radius: 10px;
  }
  &-header {
    position: relative;
    padding: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ecedf2;
  }
  &-close {
    position: absolute;
    top: 40px;
    right: 40px;

    svg {
      width: 15px;
      height: 15px;
    }
  }
  &-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  &-footer {
    padding: 40px;
    padding-bottom: 24px;
    border-top: 1px solid #ecedf2;
  }
}
</style>
