<template>
  <q-page :padding="true">
    <NavigationLinks
      :routes="[{ label: 'Home', to: '/' }, { label: 'Productos' }]"
    />
    <ProducsTable />
  </q-page>
</template>

<script setup lang="ts">
import ProducsTable from '../components/productsTable.vue';
import NavigationLinks from '../../App/components/NavigationLinks.vue';

defineOptions({
  name: 'ProductsListPage',
});
</script>
