<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Haciendola Dahsboard </q-toolbar-title>

        <q-avatar>
          <img src="../../assets/default-avatar.jpg" />
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Modulos </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from '../components/EssentialLink.vue';

defineOptions({
  name: 'MainLayout',
});

const linksList: EssentialLinkProps[] = [
  {
    title: 'Productos',
    icon: 'shopping_bag',
    link: '/products',
  },
  {
    title: 'Usuarios',
    icon: 'person',
  },
  {
    title: 'Chat',
    icon: 'chat',
  },
  {
    title: 'Forum',
    icon: 'record_voice_over',
  },
  {
    title: 'Twitter',
    icon: 'rss_feed',
  },
  {
    title: 'Facebook',
    icon: 'public',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
