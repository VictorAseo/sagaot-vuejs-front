<template>
  <div class="characters-modal__backdrop">
    <div class="characters-modal__modal">
      <div class="characters-modal__header">
        <span>Avatares</span>
        <button
          class="characters-modal__close-button"
          @click="emit('close')"
        >
          <XSquare />
        </button>
      </div>
      <div class="characters-modal__content">
        <div
          v-for="(profile, index) in profileList"
          :key="`profile-${index}`"
          :class="[
            'characters-modal__item',
            { selected: profile.selected, blocked: profile.blocked }
          ]"
          @click="!profile.blocked && handleSelectProfile(profile.id)"
        >
          <div
            v-if="profile.blocked"
            class="characters-modal__mask"
          />
          <img
            :src="profile.src"
            alt="Foto de Perfil"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  CharacterModalEmitProps,
  CharacterModalProps
} from "@/@types/components/CharacterModal";

import { XSquare } from "lucide-vue-next";

const emit = defineEmits<CharacterModalEmitProps>();
const { profileList } = defineProps<CharacterModalProps>();

const handleSelectProfile = (id: number | string) => {
  emit("selecProfileEvent", Number(id));
  emit("close");
};
</script>

<style lang="scss">
:has(.characters-modal__close-button:hover) {
  .characters-modal__modal {
    border-color: #ff6363 !important;
    transition: border-color 0.7s ease;
  }
}

.characters-modal__close-button {
  svg {
    path,
    rect {
      color: #ff6363;
    }
  }

  &:hover {
    svg {
      path,
      rect {
        transition: color 0.7s ease;
        color: #fff;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.characters-modal__backdrop {
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
  z-index: 5;

  .characters-modal__modal {
    width: 100vw;
    max-width: 436px;
    padding: 24px 36px 36px;
    border-radius: 6px;
    border: 2px solid #ffe500;
    background: #212121;
    box-shadow: 8px 8px 25px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;

    .characters-modal__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;

      span {
        color: #fff;
        font-size: 24px;
        font-weight: 600;
        line-height: normal;
      }

      button {
        background: transparent;
        border: none;
        outline: none;
        padding: 0;
        height: fit-content;
        cursor: pointer;
        display: flex;
      }
    }

    .characters-modal__content {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      margin: 0 auto;
      gap: 16px;

      .characters-modal__item {
        max-height: 59.2px;
        max-width: 59.2px;
        height: 59.2px;
        width: 59.2px;
        cursor: pointer;
        position: relative;

        &.selected {
          border: 3px solid #ffe500 !important;
        }

        .characters-modal__mask {
          width: 100%;
          height: 100%;
          background: #212121;
          opacity: 0.75;
          position: absolute;
          left: 0;
          top: 0;
        }

        img {
          max-width: 100%;
          height: 100%;
          object-fit: cover;
        }

        &:hover {
          border: 3px solid #fff;

          &.blocked {
            border: 0;
          }
        }
      }
    }
  }
}

@media (max-width: 490px) and (min-width: 408px) {
  .characters-modal__backdrop {
    .characters-modal__modal {
      .characters-modal__content {
        grid-template-columns: 1fr 1fr 1fr 1fr;
      }
    }
  }
}

@media (max-width: 408px) and (min-width: 334px) {
  .characters-modal__backdrop {
    .characters-modal__modal {
      .characters-modal__content {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  }
}

@media (max-width: 334px) {
  .characters-modal__backdrop {
    .characters-modal__modal {
      .characters-modal__content {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
}
</style>
