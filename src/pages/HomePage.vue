<template>
  <ModalAddTags
    :isOpenWindow="isOpenWindow"
    @update:isOpenWindow="isOpenWindow = false"
  />
  <MyButton @click="isOpenWindow = true">Открыть форму</MyButton>
</template>

<script setup lang="ts">
import { useProductStore } from "@/app/store/useProductStore";
import MyButton from "@/entities/myButton.vue";
import ModalAddTags from "@/widgets/modalAddTags.vue";
import { onMounted, ref } from "vue";

const isOpenWindow = ref<boolean>(false);
const productStore = useProductStore();

onMounted(() => {
  productStore.uploadProducts();
});
</script>
