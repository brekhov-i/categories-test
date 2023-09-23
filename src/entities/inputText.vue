<template>
  <div class="inputText">
    <input type="text" id="inputText" v-model="inputHandler" placeholder=" " />
    <label for="inputText">{{ placeholder }}</label>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";

const props = defineProps<{
  modalValue: string;
  placeholder: string;
}>();
const { modalValue } = toRefs(props);
const emits = defineEmits<{
  (e: "update:modalValue", value: string): void;
}>();
const inputHandler = computed({
  get() {
    return modalValue.value;
  },
  // setter
  set(newValue) {
    emits("update:modalValue", newValue);
  },
});
</script>

<style scoped lang="scss">
.inputText {
  position: relative;
  width: 360px;
  height: 48px;
  margin-top: 5px;

  label {
    position: absolute;
    top: 53%;
    transform: translateY(-50%);
    left: 10px;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    transition: 0.5s top ease-in-out;
    background-color: #ffffff;
    padding: 0 5px;
  }
  input {
    width: 100%;
    height: 100%;
    border: 1px solid grey;
    outline: none;
    padding-left: 10px;
    border-radius: 10px;

    &:focus {
      border-color: var(--color-main);
      & ~ label {
        top: 0;
        transition: 0.5s top ease-in-out;
        color: var(--color-main);
      }
    }
    &:not(:placeholder-shown) {
      border-color: var(--color-main);
      & ~ label {
        top: 0;
        transition: 0.5s top ease-in-out;
        color: var(--color-main);
      }
    }
  }
}
</style>
