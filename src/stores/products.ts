import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProductsStore = defineStore('products', () => {
  const loading = ref<boolean>(false);
  function toggleLoading() {
    loading.value = !loading.value;
  }

  return { loading, toggleLoading };
});
