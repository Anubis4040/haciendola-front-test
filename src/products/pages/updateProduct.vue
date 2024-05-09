<template>
  <q-page :padding="true">
    <ProducForm @save="updateProduct" :update="true" />
  </q-page>
</template>

<script setup lang="ts">
import ProducForm from '../components/productForm.vue';
import { Product } from '../interfaces/product';

defineOptions({
  name: 'UpdateProduct',
});

const updateProduct = (product: Product) => {
  console.log('Product updated', product.sku);
};
</script>
