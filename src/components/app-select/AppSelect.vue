<template>
  <div class="app-select__wrapper">
    <div class="app-select__container">
      <label>{{ label }}</label>
      <div
        class="app-select__input-wrapper"
        :class="[{ 'is-invalid': !inputStatus }]"
        @click="handleOpennedOptions"
      >
        <div class="app-select__input-container">
          {{ optionList.find((item) => item.id === inputValue)?.label || "" }}
        </div>
        <ChevronDown color="#222222" />
      </div>
    </div>
    <ul
      v-if="opennedOptions"
      :class="[
        'app-select__list',
        {
          'left-bottom': positionLocal === 'left-bottom',
          'right-bottom': positionLocal === 'right-bottom',
          'left-top': positionLocal === 'left-top',
          'right-top': positionLocal === 'right-top'
        }
      ]"
    >
      <li
        v-for="(option, index) in optionList"
        :key="`app-select-option-${index}`"
        class="app-select__item"
        @click="updateInputValue(option.id)"
      >
        {{ option.label }}
      </li>
    </ul>
    <span style="color: #ff6363;
    background: #ffffff;
    font-size: 9px;
    display: grid;
    margin-top: 40px;
    margin-left: 4px;
    font-weight: 400;" class="inputFeedback_Status" v-if="!inputStatus && !!inputFeedback">{{ inputFeedback }} <p style="color: #ffffff">aaafawfwawfawawfawfa</p></span>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from "vue";
import { ChevronDown } from "lucide-vue-next";
import type { AppSelectProps, SelectEmitsProps } from "@/@types/components/AppSelect";

const { optionList, position, inputValue, label, inputPlaceholder, inputStatus, inputFeedback } = defineProps<AppSelectProps>();

const emit = defineEmits<SelectEmitsProps>();

const updateInputValue = (id: number) => {
  emit("update:inputValue", id);
};

const opennedOptions = ref(false);
const positionLocal = ref(position || "left-bottom");

const handleListPosition = () => {
  const listElement = document.querySelector(".app-select__list");
  const rect = listElement?.getBoundingClientRect();
  const screenHeight = window.innerHeight;
  let [positionX, positionY] = positionLocal.value.split("-");

  if (!rect) return;

  positionY = positionY === "top" && rect.top < 0 ? "bottom" : positionY;
  positionY = positionY === "bottom" && rect.bottom > screenHeight ? "top" : positionY;

  const newPosition = `${positionX}-${positionY}`;
  positionLocal.value = newPosition;
};

const handleOpennedOptions = () => {
  opennedOptions.value = !opennedOptions.value;

  nextTick(() => {
    opennedOptions.value && handleListPosition();
  });
};
const closeOptions = () => {
  opennedOptions.value = false;
};

watch(opennedOptions, (value) => {
  if (value) {
    setTimeout(() => {
      window.addEventListener("click", closeOptions);
    }, 1);
    return;
  }

  window.removeEventListener("click", closeOptions);
});
</script>

<style lang="scss" scoped>
.app-select__wrapper {
  display: flex;
  position: relative;
  width: 100%;

  .app-select__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 9px;

    &.is-invalid {
      border-color: #ff6363;
    }

    label {
      color: #000000;
      font-size: 12px;
      font-weight: 400;
      line-height: normal;
    }

    .app-select__input-wrapper {
      padding: 0 12px;
      display: flex;
      align-items: center;
      cursor: pointer;
      width: 516px;
      height: 37px;
      background-color: rgba(217, 217, 217, 0.1);
      border-radius: 5px;
      border: 2px solid rgb(205, 205, 205);
      gap: 9px;

      .app-select__input-container {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
        color: #000000;
        background: rgb(255, 255, 255);
        font-size: 12px;
        font-weight: 500;
        line-height: normal;
      }
      &.is-invalid {
      border-color: #ff6363;
    }
    }
  }


  .app-select__list {
    width: 100%;
    background-color: rgb(250, 250, 250);
    border-radius: 6px;
    border: 2px solid rgb(205, 205, 205);
    box-shadow: 8px 8px 25px 0px rgba(0, 0, 0, 0.25);
    padding: 5px 0;
    position: absolute;
    z-index: 1;

    &.is-invalid {
      border-color: #ff6363;
    }

    &.left-bottom,
    &.right-bottom {
      margin-top: 10px;
      top: 100%;
    }

    &.left-top,
    &.right-top {
      margin-bottom: 10px;
      bottom: 100%;
    }

    &.left-bottom,
    &.left-top {
      left: 0;
    }

    &.right-bottom,
    &.right-top {
      right: 0;
    }

    .app-select__item {
      padding: 5px 8px;
      cursor: pointer;
      line-height: normal;
      font-weight: 500;
      font-size: 12px;

      &:hover {
        background: #000000;
        color: #ffffff;
      }
    }
  }
}
</style>
