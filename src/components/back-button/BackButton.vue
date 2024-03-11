<template>
  <div class="back-button-component__container">
    <ChevronsDownIcon class="back-button-component__icon" />
    <span><slot /></span>
  </div>
</template>

<script lang="ts" setup>
import { ChevronsDownIcon } from "lucide-vue-next";
</script>

<style lang="scss">
.back-button-component__container {
  .back-button-component__icon {
    rotate: (90deg);
    path {
      color: #ffe500;
    }
  }
}
</style>
<style lang="scss" scoped>
.back-button-component__container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  user-select: none;
  cursor: pointer;

  span {
    background: linear-gradient(to right, #fff 100%, #fff 100%);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;

    font-size: 16px;
    font-weight: 600;
    line-height: normal;
  }

  &:hover {
    span {
      background: linear-gradient(to right, #fff 10%, #ffe500 40%, #0190cd 70%, #764ada 80%);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      background-size: 500% auto;
      animation: textShine 0.3s ease infinite both;
    }
  }

  @keyframes textShine {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
}
</style>
