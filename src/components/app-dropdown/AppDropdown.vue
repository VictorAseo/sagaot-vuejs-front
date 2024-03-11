<template>
  <div class="app-dropdown__wrapper">
    <div @click="handleOpennedOptions">
      <slot />
    </div>
    <ul
      v-if="opennedOptions"
      :class="[
        'app-dropdown__list',
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
        :key="`app-dropdown-option-${index}`"
        class="app-dropdown__item"
        @click="option.event"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from "vue";
import type { AppDropdownProps } from "@/@types/components/AppDropdown";

const { optionList, position } = defineProps<AppDropdownProps>();

const opennedOptions = ref(false);
const positionLocal = ref(position || "left-bottom");

const handleListPosition = () => {
  const listElement = document.querySelector(".app-dropdown__list");
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
.app-dropdown__wrapper {
  display: flex;
  position: relative;

  .app-dropdown__list {
    min-width: 150px;
    max-width: 200px;
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

    .app-dropdown__item {
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
