<template>
  <q-avatar color="white">
    <span class="text-h6 text-black">{{ initials }}</span>
    <q-menu>
      <q-list style="min-width: 100px">
        <q-item clickable v-close-popup>
          <q-item-section @Click="logout">Cerra sesion</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-avatar>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { mainInstance } from 'src/api/mainInstance';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const $q = useQuasar();
const router = useRouter();
defineOptions({
  name: 'UserAvatar',
});

const initials = ref<string>('');

const getMe = () => {
  mainInstance
    .get('auth/me')
    .then((res) => {
      initials.value = `${res.data.data.firstName.charAt(0)}${res.data.data.lastName.charAt(0)}`;
    })
    .catch((err) => {
      console.log(err);
      $q.notify({
        color: 'negative',
        textColor: 'white',
        progress: true,
        classes: 'text-medium',
        position: 'top-right',
        message: '¡Hubo un problema!',
        icon: 'error',
        timeout: 3000,
      });
    });
};

const logout = () => {
  mainInstance
    .post('auth/logout')
    .then(() => {
      localStorage.removeItem('authenticated');
      router.push({ path: '/login' });
    })
    .catch((err) => {
      console.log(err);
      $q.notify({
        color: 'negative',
        textColor: 'white',
        progress: true,
        classes: 'text-medium',
        position: 'top-right',
        message: '¡Hubo un problema al cerrar sesión!',
        icon: 'error',
        timeout: 3000,
      });
    });
};

onMounted(() => {
  getMe();
});
</script>
