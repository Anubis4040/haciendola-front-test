<template>
  <q-page :padding="true">
    <NavigationLinks :routes="[
      { label: 'Home', to: '/' },
      { label: 'Productos', to: '/products' },
      { label: 'Actualizar Producto' },
    ]" />
    <ProducForm @update="updateProduct" :userId="String($route.params.id)" :update="true" />
  </q-page>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import ProducForm from '../components/productForm.vue';
import { Product } from '../interfaces/product';
import { mainInstance } from 'src/api/mainInstance';
import { useRoute, useRouter } from 'vue-router';
import NavigationLinks from '../../App/components/NavigationLinks.vue';
import { useQuasar } from 'quasar';
import { useProductsStore } from 'src/stores/products';

const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const productStore = useProductsStore();

defineProps({
  routes: {
    type: Object as PropType<Product>,
    default: null,
  },
});

defineOptions({
  name: 'UpdateProduct',
});

const updateProduct = (product: Product) => {
  productStore.loading = true;
  mainInstance
    .put(`products/${route.params.id}`, product)
    .then((res) => {
      console.log('updatedUser', res.data);
      $q.notify({
        color: 'positive',
        textColor: 'white',
        progress: true,
        classes: 'text-medium',
        position: 'top-right',
        message: '¡Producto actualizado con exito!',
        icon: 'verified',
        timeout: 3000,
      });
      router.push({ path: '/products' });
    })
    .catch((err) => {
      console.log(err);
      $q.notify({
        color: 'negative',
        textColor: 'white',
        progress: true,
        classes: 'text-medium',
        position: 'top-right',
        message: '¡Hubo un problema al guardar el producto!',
        icon: 'error',
        timeout: 3000,
      });
    }).finally(() => {
      productStore.loading = false;
    })
};

// onMounted(() => {
//   console.log(route.params.id);
// });
</script>
