import { ref, computed, type Ref } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count: Ref<number | null> = ref(0);
  const doubleCount = computed(() => count);
  const increment = () => {};

  return { count, doubleCount, increment };
});
