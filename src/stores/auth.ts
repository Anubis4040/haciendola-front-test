import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const authenticated = ref(null);
  const user = ref({});
  return { authenticated, user };
});
