<template>
  <div class="form-box__container">
    <FormBackground />
    <div class="form-box__content">
      <slot />
    </div>
  </div>
  <div class="form-box__wrapper"></div>
</template>

<script lang="ts" setup>
import FormBackground from "./FormBackground.vue";
</script>

<style lang="scss" scoped>
.form-box__container {
  min-height: 468px;
  width: 100vw;
  max-width: 820px;
  background: #212121;
  border-radius: 6px;
  border: 1px solid #ffe500;
  display: flex;

  .form-box__content {
    padding: 24px;
    display: flex;
    flex-grow: 1;
  }
}

@media (max-width: 820px) {
  .form-box__container {
    flex-direction: column !important;
  }
}
</style>
