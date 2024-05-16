<template>
  <q-page class="flex flex-center main-color-gradient">
    <q-card v-if="!sended" style="width: 390px" class="q-pa-md q-mt-lg br-10 text-light-black">
      <q-card-section class="column flex-center feq-py-none q-px-sm q-pb-sm">
        <h5 class="q-my-none text-center">
          Recuperar contraseña
        </h5>
        <p class="q-mb-none q-mt-md text-center">
          Por ingrese el correo electrónico asociado a su cuenta para recuperar su contraseña.
        </p>
      </q-card-section>
      <q-card-section class="q-px-sm">
        <q-form @submit="resetPassword" greedy>
          <q-input label="Email" type="email" v-model="form.email" :rules="[(val) => (val && val.length > 0) || 'Este campo es requerido.']
            " class="q-mb-sm input-error-color text-medium" outlined color="purple-9">
            <template v-slot:prepend>
              <q-icon name="person" size="19px" />
            </template>
          </q-input>

          <q-btn no-caps :loading="loading" type="submit"
            class="bg-hl-secondary full-width text-white fs-17 br-4 text-bold">
            Continuar
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
    <!-- Create card with info post send email to recover password -->
    <q-card v-if="sended" style="width: 390px" class="q-pa-md q-mt-lg br-10 text-light-black">
      <q-card-section class="column flex-center feq-py-none q-px-sm q-pb-sm">
        <h5 class="q-my-none text-center">
          Correo enviando
        </h5>
        <p class="q-mb-none q-mt-md text-center">
          Si su correo se encuentra registrado, le enviaremos las instrucciones para recuperar su
          contraseña.
        </p>
      </q-card-section>
      <q-card-section class="q-px-sm">
        <!-- <q-form @submit="resetPassword" greedy>
          <q-input label="Email" type="email" v-model="form.email" :rules="[(val) => (val && val.length > 0) || 'Este campo es requerido.']
            " class="q-mb-sm input-error-color text-medium" outlined color="purple-9">
            <template v-slot:prepend>
              <q-icon name="person" size="19px" />
            </template>
          </q-input>

          <q-btn no-caps :loading="loading" type="submit"
            class="bg-hl-secondary full-width text-white fs-17 br-4 text-bold">
            Continuar
          </q-btn>
        </q-form> -->
        <q-btn no-caps @Click="sendAgain" class="bg-hl-secondary full-width text-white fs-17 br-4 text-bold">
          Volver a enviar
        </q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { mainInstance } from 'src/api/mainInstance';
import { reactive, ref } from 'vue';

const $q = useQuasar();

// Datos y métodos del componente
const form = reactive({
  email: '',
});
const loading = ref(false);
const sended = ref(false);

const resetPassword = () => {
  loading.value = true;
  mainInstance
    .post('users/recover-password', form)
    .then((res) => {
      console.log(res.data)
      sended.value = true;
    })
    .catch((err) => {
      console.log(err);
      $q.notify({
        color: 'negative',
        textColor: 'white',
        progress: true,
        classes: 'text-medium',
        position: 'top-right',
        message: '¡Hubo un problema al reiniciar la contraseña sesión!',
        icon: 'error',
        timeout: 3000,
      });
    }).finally(() => {
      loading.value = false;
    })
};

const resetForm = () => {
  form.email = '';
};

const sendAgain = () => {
  resetForm();
  sended.value = false;
};
</script>

<style scoped>
/* Estilos específicos del componente */
</style>
