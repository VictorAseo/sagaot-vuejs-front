<template>
  <div class="invalid-alert__container">
    <span>
      <slot />
    </span>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.invalid-alert__container {
  width: auto;
  border-radius: 6px;
  background: #ff6363;
  padding: 4px 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: #fff;
    font-size: 10px;
    font-weight: 500;
    line-height: normal;
  }
}
</style>