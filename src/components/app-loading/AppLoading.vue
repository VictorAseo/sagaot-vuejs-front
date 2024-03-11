<template>
  <div class="app-loading__backdrop">
    <img src="/assets/svgs/infinity.svg" />
  </div>
</template>

<style lang="scss" scoped>
.app-loading__backdrop {
  width: 100vw;
  min-height: 100dvh;
  padding: 24px;
  background: rgba(23, 23, 23, 0.65);
  backdrop-filter: blur(7.400000095367432px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
}
</style>
