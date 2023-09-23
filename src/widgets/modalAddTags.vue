<template>
  <MyModalWindow
    class="modalWindow"
    :class="[isOpenWindow ? 'open' : '']"
    @close-window="emits('update:isOpenWindow')"
  >
    <template #header>
      <h5 class="modalWindow__title">Добавление тегов</h5>
      <div class="modalWindow__text">
        Вы можете добавить ещё
        <strong>{{
          maxTags - selectedTags.length < 0 ? 0 : maxTags - selectedTags.length
        }}</strong>
      </div>
    </template>
    <template #default>
      <div class="modalWindow__content">
        <InputText v-model:modalValue="text" placeholder="Название тега" />
        <div class="modalWindow__listTags">
          <TagItem
            v-for="item in tagsArr"
            :key="item.id"
            :view-close-button="false"
            @click="selectTags(item)"
            >{{ item.name }}</TagItem
          >
          <p
            class="modalWindow__textNotFound"
            v-if="text !== '' && tagsArr.length === 0"
          >
            По запросу ничего не найдено
          </p>
        </div>
      </div>
      <div class="modalWindow__listSelectedTags" v-if="selectedTags.length > 0">
        <TagItem
          v-for="item in selectedTags"
          :key="`selected` + item.name"
          @deleteTag="deleteTag(item)"
          >{{ item.name }}</TagItem
        >
      </div>
    </template>
    <template #footer>
      <MyButton
        :theme="[ThemeButton.PRIMARY]"
        colorBorder="red"
        class="btnSave"
        @click="addTagsInStore()"
      >
        Сохранить
      </MyButton>
      <MyButton :theme="[ThemeButton.SECONDARY]" @click="cancelHandler()">
        Отмена
      </MyButton>
    </template>
  </MyModalWindow>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import InputText from "@/entities/inputText.vue";
import MyButton, { ThemeButton } from "@/entities/myButton.vue";
import TagItem from "@/entities/tagItem.vue";
import MyModalWindow from "@/entities/myModalWindow.vue";
import { useProductStore } from "@/app/store/useProductStore";
import { TTag } from "@/app/types/TProduct";

defineProps<{
  isOpenWindow: boolean;
}>();
const emits = defineEmits<{
  (e: "update:isOpenWindow"): void;
}>();

const maxTags = ref<number>(20);
const text = ref<string>("");
const tagsArr = ref<TTag[]>([]);
const selectedTags = ref<TTag[]>([]);

const productStore = useProductStore();

const addTagsInStore = () => {
  productStore.addTag(selectedTags.value);
  emits("update:isOpenWindow");
};

const cancelHandler = () => {
  selectedTags.value = [];
  text.value = "";
  emits("update:isOpenWindow");
};

const selectTags = (tag: TTag) => {
  if (selectedTags.value.length === maxTags.value) return;
  selectedTags.value.push(tag);
  const index = tagsArr.value.findIndex((el) => el === tag);
  if (index !== -1) {
    tagsArr.value.splice(index, 1);
  }
};

const deleteTag = (tag: TTag) => {
  tagsArr.value.push(tag);
  tagsArr.value = tagsArr.value.sort((a, b) => {
    if (a.id > b.id) {
      return 1;
    } else {
      return -1;
    }
  });
  const index = selectedTags.value.findIndex((el) => el === tag);
  if (index !== -1) {
    selectedTags.value.splice(index, 1);
  }
};

watch(text, (newV) => {
  if (newV !== "") {
    tagsArr.value = productStore.getTags(newV);
  } else {
    tagsArr.value = [];
  }
});
</script>

<style scoped lang="scss">
.modalWindow {
  &__title {
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    margin-bottom: 12px;
  }
  &__text {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    strong {
      font-weight: 600;
    }
  }
  &__content {
    padding: 35px 40px 24px;
  }
  &__listTags {
    width: 100%;
    max-height: 200px;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    row-gap: 8px;
    column-gap: 8px;
    overflow-y: auto;
  }
  &__listSelectedTags {
    width: 100%;
    max-height: 200px;
    padding: 32px 40px 24px;
    border-top: 1px solid #ecedf2;
    display: flex;
    flex-wrap: wrap;
    row-gap: 8px;
    column-gap: 8px;
    overflow-y: auto;
  }
  &__textNotFound {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    color: var(--color-grey);
  }
  .btnSave {
    margin-right: 20px;
  }
}
</style>
