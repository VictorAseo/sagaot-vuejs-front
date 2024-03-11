<template>
  <div class="text-button__register-link">
    <router-link :to="to">
      <button
        class="text-button__register-button"
        type="button"
      >
        <slot name="text"></slot>
        <b><slot name="bold"></slot></b>
      </button>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { type TextButtonProps } from "@/@types/components/TextButton";

const { to } = defineProps<TextButtonProps>();
</script>

<style lang="scss" scoped>
.text-button__register-link {
  display: flex;
  justify-content: center;

  a {
    text-decoration: none !important;
  }

  .text-button__register-button {
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;

    color: #fff;
    font-weight: 500;
    font-size: 10px;
    line-height: normal;

    b {
      background: linear-gradient(to right, #ffe500 100%, #ffe500 100%);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;

      font-size: 10px;
      font-weight: 700;
    }

    @keyframes textShine {
      0% {
        background-position: 0% 50%;
      }
      100% {
        background-position: 100% 50%;
      }
    }

    &:hover {
      b {
        background: linear-gradient(to right, #fff 10%, #ffe500 40%, #0190cd 70%, #764ada 80%);
        background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        background-size: 500% auto;
        animation: textShine 0.3s ease infinite both;
      }
    }
  }
}
</style>
