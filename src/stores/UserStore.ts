import { ref } from "vue";
import { defineStore } from "pinia";
import type { UserDataProps } from "@/@types/stores/UserStore";

export const useUserStore = defineStore("useStore", () => {
  const userData = ref({} as UserDataProps);

  const $resetUserStore = () => {
    userData.value = {} as UserDataProps;
  };

  return { userData, $resetUserStore };
});
