<template>
  <q-page :padding="true">
    <NavigationLinks :routes="[
      { label: 'Home', to: '/' },
      { label: 'Productos', to: '/products' },
      { label: 'Crear Producto' },
    ]" />
    <ProducForm @save="saveProduct" />
  </q-page>
</template>

<script setup lang="ts">
import ProducForm from '../components/productForm.vue';
import NavigationLinks from '../../App/components/NavigationLinks.vue';
import { Product } from '../interfaces/product';
import { mainInstance } from 'src/api/mainInstance';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useProductsStore } from 'src/stores/products';

const $q = useQuasar();
const router = useRouter();
const ProductStore = useProductsStore();

defineOptions({
  name: 'CreateProduct',
});

// TODO: Add the saveProduct function here
const saveProduct = (product: Product) => {
  console.log('pre save product', product);
  ProductStore.loading = true;
  mainInstance
    .post('products', product)
    .then(() => {
      $q.notify({
        color: 'positive',
        textColor: 'white',
        progress: true,
        classes: 'text-medium',
        position: 'top-right',
        message: '¡Producto creado con exito!',
        icon: 'verified',
        timeout: 3000,
      });
      router.push({ path: '/products' });
    })
    .catch(() => {
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
      ProductStore.loading = false;
    })
};
</script>
