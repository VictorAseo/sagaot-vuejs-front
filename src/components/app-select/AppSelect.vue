<template>
  <div class="app-select__wrapper">
    <div class="app-select__container">
      <label>{{ label }}</label>
      <div
        class="app-select__input-wrapper"
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
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from "vue";
import { ChevronDown } from "lucide-vue-next";
import type { AppSelectProps, SelectEmitsProps } from "@/@types/components/AppSelect";

const { optionList, position, inputValue, label } = defineProps<AppSelectProps>();

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
    gap: 4px;

    label {
      color: #fff;
      font-size: 10px;
      font-weight: 400;
      line-height: normal;
    }

    .app-select__input-wrapper {
      padding: 0 12px;
      display: flex;
      align-items: center;
      cursor: pointer;
      width: 100%;
      height: 34px;
      background-color: #fff;
      border-radius: 5px;
      border: 1px solid #fee500;
      gap: 8px;

      .app-select__input-container {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
        color: #222222;
        font-size: 12px;
        font-weight: 500;
        line-height: normal;
      }
    }
  }

  .app-select__list {
    width: 100%;
    min-width: 150px;
    background: #222222;
    border-radius: 5px;
    border: 1px solid #fee500;
    box-shadow: 8px 8px 25px 0px rgba(0, 0, 0, 0.25);

    padding: 5px 0;
    position: absolute;
    z-index: 2;

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
        background: #fee500;
        color: #000;
      }
    }
  }
}
</style>
