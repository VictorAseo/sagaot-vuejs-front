<template>
  <button
    type="button"
    :class="['button-app__container', { full: isFull }]"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { type AppButtonProps } from "@/@types/components/AppButton";

const { isFull } = defineProps<AppButtonProps>();
</script>

<style lang="scss" scoped>
.button-app__container {
  padding: 5px 24px;
  width: fit-content;
  border-radius: 5px;
  background: #ffe500;
  border: 2px solid #ffe500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  outline: none;
  cursor: pointer;
  user-select: none;
  transition:
    background 0.6s ease,
    color 0.6s ease,
    border-color 0.6s ease;

  color: #000;
  font-size: 12px;
  font-weight: 500;
  line-height: normal;
  text-align: left;

  &.full {
    width: 100%;
  }

  svg {
    height: 12px;
  }

  &:hover {
    background: #000;
    border-color: #fff;
    color: #fff;
  }

  &:active {
    border-color: #ffe500;
    color: #ffe500;
    transition:
      background 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease;
  }
}
</style>
