<template>
  <header class="app-navbar__container">
    <AppDropdown :option-list="optionList">
      <div class="app-navbar__profile">
        <div class="app-navbar__profile-infos">
          <div class="app-navbar__profile-texts">
            <span class="app-navbar__profile-name">{{ userData.username }}</span>
            <span class="app-navbar__profile-level">Level {{ userData.userLevel }}</span>
          </div>
          <div class="app-navbar__profile-lifes">
            <Heart
              v-for="index in 3"
              :key="`life-${index}`"
              :class="{ lost: !!userData.lifes?.toString() && index > userData.lifes }"
            />
          </div>
        </div>
        <div class="app-navbar__profile-photo">
          <img
            :src="userData.avatarSrc"
            alt="Foto de perfil"
          />
        </div>
      </div>
    </AppDropdown>
  </header>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import router from "@/router";

import { Heart } from "lucide-vue-next";
import AppDropdown from "@/components/app-dropdown/AppDropdown.vue";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { userData } = storeToRefs(userStore);

const logout = () => {
  localStorage.clear();
  router.push({ name: "login" });
};

const optionList = ref([
  { label: "Meus módulos", event: () => router.push({ name: "dashboard" }) },
  { label: "Configurações", event: () => router.push({ name: "settings" }) },
  { label: "Sair", event: () => logout() }
]);

const addAdminOptionsInDropdown = () => {
  optionList.value = [
    { label: "Meus módulos", event: () => router.push({ name: "dashboard" }) },
    { label: "Configurações", event: () => router.push({ name: "settings" }) },
    { label: "Gerenciar módulos", event: () => router.push({ name: "registerModules" }) },
    { label: "Gerenciar atividades", event: () => router.push({ name: "registerActivities" }) },
    { label: "Gerenciar avatares", event: () => router.push({ name: "registerAvatars" }) },
    { label: "Sair", event: () => logout() }
  ];
};

onMounted(() => {
  userData.value.isAdmin && addAdminOptionsInDropdown();
});
</script>

<style lang="scss">
.app-navbar__profile-lifes {
  display: flex;
  justify-content: end;
  gap: 6px;

  svg {
    width: 18px;
    height: 18px;

    fill: #f15f5f;

    path {
      color: #fff;
    }

    &.lost {
      fill: #fff;
    }
  }
}
</style>

<style lang="scss" scoped>
.app-navbar__container {
  width: 100%;
  background: #161616;
  padding: 16px 24px 15px;
  border-bottom: 1px solid #ffe500;
  display: flex;
  justify-content: end;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 6;

  .app-navbar__profile {
    display: flex;
    gap: 16px;
    cursor: pointer;

    .app-navbar__profile-infos {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .app-navbar__profile-texts {
        display: flex;
        flex-direction: column;
        align-items: end;

        .app-navbar__profile-name {
          color: #ffe500;
          font-size: 12px;
          font-weight: 600;
          line-height: normal;
        }

        .app-navbar__profile-level {
          color: #ffe500;
          font-size: 10px;
          font-weight: 600;
          line-height: normal;
        }
      }

      .app-navbar__profile-lifes {
        display: flex;
        justify-content: end;
        gap: 6px;

        svg {
          width: 18px;
          height: 18px;

          path {
            color: #f15f5f;
            fill: #f15f5f;
          }
        }

        &.lost {
          svg {
            path {
              color: #fff;
            }
          }
        }
      }
    }

    .app-navbar__profile-photo {
      max-width: 60px;
      max-height: 60px;
      border: 1px solid #ffe500;

      img {
        height: 100%;
        max-width: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
