<template>
  <div class="app-modal__backdrop">
    <div class="app-modal__modal">
      <div class="app-modal__content">
        <h3 v-if="!!modalInfos.title">{{ modalInfos.title }}</h3>

        <h4 v-if="!!modalInfos.subtitle">{{ modalInfos.subtitle }}</h4>

        <p v-if="!!modalInfos.text">
          {{ modalInfos.text }}
        </p>

        <div class="app-modal__buttons">
          <AppButton
            v-if="!!modalInfos.textGreenButton"
            is-full
            @click="modalInfos.eventGreenButton"
          >
            {{ modalInfos.textGreenButton }}
          </AppButton>
          <AppButton
            v-if="!!modalInfos.textRedButton"
            is-full
            @click="modalInfos.eventRedButton"
          >
            {{ modalInfos.textRedButton }}
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, watch, ref, type Ref } from "vue";
import { useAppStore } from "@/stores/AppStore";
import AppButton from "../app-button/AppButton.vue";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { handleModal } = appStore;
const { modalInfos } = storeToRefs(appStore);

const closeByTime: Ref<null | number> = ref(null);

const handleCloseByTime = (time: number) =>
  (closeByTime.value = setTimeout(() => {
    handleModal({ active: false });
  }, time));

watch(
  () => modalInfos.value.timeClose,
  (value) => {
    !!value?.toString() && handleCloseByTime(value);
  }
);

onUnmounted(() => {
  !!closeByTime.value?.toString() && clearInterval(closeByTime.value);
});
</script>

<style lang="scss" scoped>
.app-modal__backdrop {
  width: 100vw;
  min-height: 100dvh;
  padding: 24px;
  background: rgba(23, 23, 23, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;

  .app-modal__modal {
    width: 100%;
    max-width: 480px;
    border: 2px solid #fee500;
    background: #212121;
    padding: 24px;
    border-radius: 8px;

    .app-modal__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;

      h3 {
        font-size: 24px;
        line-height: normal;
        color: #fee500;
      }

      p {
        font-size: 12px;
        line-height: normal;
      }

      .app-modal__buttons {
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
