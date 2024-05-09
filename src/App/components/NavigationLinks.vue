<template>
  <q-breadcrumbs>
    <q-breadcrumbs-el
      v-for="route in routes"
      :key="route.label"
      :label="route.label"
      :to="route.to"
    />
  </q-breadcrumbs>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Route } from '../interfaces/route';

const props = defineProps({
  routes: {
    type: Array as PropType<Route[]>,
    default: () => [{ label: 'Home', to: '/' }],
  },
});
</script>
