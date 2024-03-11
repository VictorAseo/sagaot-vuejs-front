<template>
  <div class="progress-bar__container">
    <p class="progress-bar__progress">
      Progresso <span>{{ percentage }}%</span>
    </p>
    <div class="progress-bar__bar-container">
      <div
        class="progress-bar__bar"
        :style="`width: ${percentage}%`"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ProgressBarProps } from "@/@types/components/ProgressBar";

const { percentage } = defineProps<ProgressBarProps>();
</script>

<style lang="scss" scoped>
.progress-bar__container {
  display: flex;
  flex-direction: column;
  gap: 6px;

  .progress-bar__progress {
    color: #fff;

    &,
    span {
      font-size: 12px;
      font-weight: 600;
      line-height: normal;
    }

    span {
      color: #ffe500;
    }
  }

  .progress-bar__bar-container {
    width: 100%;
    height: 4px;
    background: #fff;
    display: flex;
    border-radius: 20px;

    .progress-bar__bar {
      height: 100%;
      background: #ffe500;
      border-radius: 20px;
    }
  }
}
</style>
