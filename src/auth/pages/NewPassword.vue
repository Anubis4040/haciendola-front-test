<template>
  <q-page class="flex flex-center main-color-gradient">
    <q-card style="width: 390px" class="q-pa-md q-mt-lg br-10 text-light-black">
      <q-card-section class="column flex-center feq-py-none q-px-sm">
        <p class="q-mb-none text-body1" style="font-size: x-large">
          Ingrese su nueva contraseña
        </p>
      </q-card-section>
      <q-card-section class="q-px-sm">
        <q-form @submit="onSubmit" greedy>
          <q-input
            label="Contraseña"
            type="password"
            v-model="form.password"
            :rules="
              (val) => (val && val.length > 0) || 'Este campo es requerido.'
            "
            class="q-mb-sm input-error-color text-medium"
            outlined
            color="purple-9"
          >
            <template v-slot:prepend>
              <q-icon name="person" size="19px" />
            </template>
          </q-input>

          <q-input
            label="Confirmar contraseña"
            type="password"
            v-model="form.confirmPassword"
            :rules="
              (val) =>
                (val && val.length > 0 && val === form.password) ||
                'Este campo es requerido.'
            "
            class="q-mb-sm input-error-color text-medium"
            outlined
            color="purple-9"
          >
            <template v-slot:prepend>
              <q-icon name="person" size="19px" />
            </template>
          </q-input>

          <q-btn
            no-caps
            :loading="loading"
            type="submit"
            class="bg-hl-secondary full-width text-white fs-17 br-4 text-bold"
          >
            Cambiar contraseña
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Datos y métodos del componente
const form = reactive({
  password: '',
  confirmPassword: '',
});

onMounted(() => {
  console.log(route.query);
  console.log(route.params);
});
</script>

<style scoped>
/* Estilos específicos del componente */
</style>
