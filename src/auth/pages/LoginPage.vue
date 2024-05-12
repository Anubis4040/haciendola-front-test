<template>
  <q-page class="flex flex-center main-color-gradient">
    <q-card style="width: 390px" class="q-pa-md q-mt-lg br-10 text-light-black">
      <q-card-section class="flex flex-center feq-py-none q-px-sm">
        <q-img style="width: 150px; height: 19px"
          src="https://haciendola.com/cdn/shop/files/logo_4052ea8c-c242-4a61-a83b-910d8214ffd8.png?v=1705680919&width=150"></q-img>
      </q-card-section>
      <q-card-section class="q-px-sm">
        <q-form @submit.prevent="login" greedy>
          <q-input label="Email" v-model="form.emailOrUserName"
            :rules="[(val) => (val && val.length > 0) || 'Este campo es requerido.']"
            class="q-mb-sm input-error-color text-medium" outlined color="purple-9">
            <template v-slot:prepend>
              <q-icon name="person" size="19px" />
            </template>
          </q-input>

          <q-input label="Contraseña" outlined v-model="form.password"
            :rules="[(val) => (val && val.length > 0) || 'Este campo es requerido.']"
            :type="isPwd ? 'password' : 'text'" class="q-mb-lg q-pb-xs text-medium" color="purple-9">
            <template v-slot:prepend>
              <q-icon name="lock" size="19px" />
            </template>
            <template v-slot:append>
              <q-icon v-show="form.password.length > 0" :name="isPwd ? 'visibility' : 'visibility_off'"
                class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>

          <q-btn no-caps :loading="loading" type="submit"
            class="bg-hl-secondary full-width q-mb-lg text-white fs-17 br-4 text-bold">
            Acceder
          </q-btn>

          <router-link to="/forgot-password">
            <p class="q-mb-xs text-center">¿Olvidaste tu contraseña?</p>
          </router-link>

          <router-link to="/register">
            <p class="q-mb-none text-center">¿No tienes cuenta? Registrate</p>
          </router-link>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { mainInstance } from 'src/api/mainInstance';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const authStore = useAuthStore();
const router = useRouter();

const loading = ref(false);
const form = reactive({
  emailOrUserName: '',
  password: '',
});

const isPwd = ref(true);

const login = () => {
  loading.value = true;
  mainInstance
    .post('auth/login', form)
    .then((res) => {
      authStore.user = res.data.data;
      authStore.authenticated = true;
      localStorage.setItem('authenticated', 'true');
      router.push({ path: '/products' });
      console.log('test')
    })
    .catch((err) => {
      console.log(err);
      $q.notify({
        color: 'negative',
        textColor: 'white',
        progress: true,
        classes: 'text-medium',
        position: 'top-right',
        message: '¡Hubo un problema al iniciar sesión!',
        icon: 'error',
        timeout: 3000,
      });
    }).finally(() => {
      loading.value = false;
    })
};
</script>
