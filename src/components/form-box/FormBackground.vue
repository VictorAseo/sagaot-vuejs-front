<template>
  <div class="form-box__background">
    <span>JS</span>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.form-box__background {
  height: 468px;
  min-width: 228px;
  background: #ffe500;
  padding: 24px;
  display: flex;
  align-items: end;
  justify-content: end;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;

  span {
    color: #222222;
    font-size: 80px;
    font-weight: 600;
  }
}

@media (max-width: 820px) {
  .form-box__background {
    min-width: 0;
    width: 100%;
    height: 100px;
    padding: 0 24px;
    align-items: center;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 6px;

    span {
      font-size: 60px;
    }
  }
}
</style>
