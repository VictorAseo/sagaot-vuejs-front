import { ref } from "vue";
import { defineStore } from "pinia";
import type { ModuleProps } from "@/@types/views/Dashboard";

export const useRegisterModulesStore = defineStore("registerModulesStore", () => {
  const showModules = ref(true);
  const showForm = ref(false);
  const selectedModule = ref({} as ModuleProps);

  const $resetRegisterModules = () => {
    showModules.value = true;
    showForm.value = false;
    selectedModule.value = {} as ModuleProps;
  };

  const handleShow = (card?: string) => {
    if (!card) return $resetRegisterModules();

    showModules.value = card === "modules";
    showForm.value = card === "form";
  };

  return { showModules, showForm, selectedModule, handleShow, $resetRegisterModules };
});
