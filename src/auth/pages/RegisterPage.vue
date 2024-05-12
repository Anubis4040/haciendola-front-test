<template>
  <q-page class="flex flex-center main-color-gradient">
    <q-card style="width: 600px" class="q-pa-md q-mt-lg br-10 text-light-black">
      <q-card-section class="column flex-center feq-py-none q-px-sm">
        <q-img style="width: 150px; height: 19px"
          src="https://haciendola.com/cdn/shop/files/logo_4052ea8c-c242-4a61-a83b-910d8214ffd8.png?v=1705680919&width=150"></q-img>
        <h5 class="q-mt-md q-mb-none">Registro de usuario</h5>
      </q-card-section>
      <q-card-section class="q-px-sm q-pt-sm">
        <q-form @submit.prevent="register" greedy>
          <div class="row q-col-gutter-x-md q-col-gutter-y-sm q-mb-md">
            <div class="col-6">
              <q-input label="Nombre" v-model="form.firstName"
                :rules="[(val) => (val && val.length > 0) || 'Este campo es requerido.']" class="q-pb-lg text-medium"
                outlined color="purple-9">
              </q-input>
            </div>
            <div class="col-6">
              <q-input label="Apellido" outlined v-model="form.lastName"
                :rules="[(val) => (val && val.length > 0) || 'Este campo es requerido.']" class="q-pb-lg text-medium"
                color="purple-9">
              </q-input>
            </div>
            <div class="col-6">
              <q-input label="Email" v-model="form.email"
                :rules="[(val) => (val && val.length > 0) || 'Este campo es requerido.']" class="q-pb-lg text-medium"
                outlined color="purple-9">
              </q-input>
            </div>
            <div class="col-6">
              <q-input label="Usuario" outlined v-model="form.userName"
                :rules="[(val) => (val && val.length > 0) || 'Este campo es requerido.']" class="q-pb-lg text-medium"
                color="purple-9">
              </q-input>
            </div>
            <div class="col-12">
              <q-input label="Contraseña" outlined v-model="form.password"
                :rules="[(val) => (val && val.length > 0) || 'Este campo es requerido.']"
                :type="isPwd ? 'password' : 'text'" class="q-pb-lg text-medium" color="purple-9">
                <template v-slot:prepend>
                  <q-icon name="lock" size="19px" />
                </template>
                <template v-slot:append>
                  <q-icon v-show="form.password.length > 0" :name="isPwd ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer" @click="isPwd = !isPwd" />
                </template>
              </q-input>
            </div>
            <div class="col-12">
              <q-input label="Confirmar Contraseña" outlined v-model="form.confirmPassword"
                :rules="[(val) => (val && val.length > 0 && val === form.password) || 'Ambas contraseñas deben coincidir.']"
                :type="isPwd ? 'password' : 'text'" class="q-pb-lg text-medium" color="purple-9">
                <template v-slot:prepend>
                  <q-icon name="lock" size="19px" />
                </template>
                <template v-slot:append>
                  <q-icon v-show="form.password.length > 0" :name="isPwd ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer" @click="isPwd = !isPwd" />
                </template>
              </q-input>
            </div>
          </div>
          <q-btn no-caps :loading="loading" type="submit"
            class="bg-hl-secondary full-width q-mb-lg text-white fs-17 br-4 text-bold">
            Registrarse
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { mainInstance } from 'src/api/mainInstance';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const router = useRouter();

const loading = ref(false);
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  userName: '',
  password: '',
  confirmPassword: '',
});

const isPwd = ref(true);

const register = () => {
  loading.value = true;
  const { confirmPassword, ...rest } = form;
  mainInstance
    .post('users', rest)
    .then((res) => {
      console.log(res.data)
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
        message: '¡Hubo un problema en el registro sesión!',
        icon: 'error',
        timeout: 3000,
      });
    }).finally(() => {
      loading.value = false;
    })
};
</script>
