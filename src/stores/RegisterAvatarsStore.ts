import { ref } from "vue";
import { defineStore } from "pinia";

export const useRegisterAvatarsStore = defineStore("registerAvatarsStore", () => {
  const showAvatars = ref(true);
  const showForm = ref(false);

  const $resetRegisterAvatars = () => {
    showAvatars.value = true;
    showForm.value = false;
  };

  const handleShow = (card?: string) => {
    if (!card) return $resetRegisterAvatars();

    showAvatars.value = card === "avatars";
    showForm.value = card === "form";
  };

  return { showAvatars, showForm, handleShow, $resetRegisterAvatars };
});
