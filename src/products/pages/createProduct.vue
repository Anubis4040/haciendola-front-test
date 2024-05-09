<template>
  <q-page :padding="true">
    <NavigationLinks
      :routes="[
        { label: 'Home', to: '/' },
        { label: 'Productos', to: '/products' },
        { label: 'Crear Producto' },
      ]"
    />
    <ProducForm @save="saveProduct" />
  </q-page>
</template>

<script setup lang="ts">
import ProducForm from '../components/productForm.vue';
import NavigationLinks from '../../App/components/NavigationLinks.vue';
import { Product } from '../interfaces/product';

defineOptions({
  name: 'CreateProduct',
});

const saveProduct = (product: Product) => {
  console.log('Product saved', product.sku);
};
</script>
