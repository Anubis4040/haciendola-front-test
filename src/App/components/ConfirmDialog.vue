<template>
  <q-card style="max-width: 360px">
    <q-card-section class="q-pt-lg text-medium text-center fs-16 text-black">
      <Vue3Lottie :animationData="animationJSON" :height="animationSize" :loop="false" :width="animationSize" />
      {{ title }}
    </q-card-section>

    <q-card-actions align="center">
      <q-btn class="text-semi-bold" label="No" unelevated color="lv-danger" @click="onNo" />
      <q-btn class="text-semi-bold" unelevated label="Sí" :loading="loading" color="lv-primary" @click="onYes" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { useQuasar } from 'quasar';
import { computed } from 'vue';
import 'vue3-lottie/dist/style.css';
import { Vue3Lottie } from 'vue3-lottie';

export default {
  emits: ['onYes', 'onNo'],
  components: {
    Vue3Lottie,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    animationSize: {
      type: Number,
      default: 100,
    },
    animationJSON: {
      type: Object,
      default: () => null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup({ emit }) {
    // CONSTANTS
    const $q = useQuasar();

    // COMPUTEDS
    const isMobile = computed(() => {
      return $q.screen.lt.md ? true : false;
    });

    // FUNCTIONS

    function onYes() {
      emit('onYes');
    }

    function onNo() {
      emit('onNo');
    }

    // RETURN TO COMPONENT
    return {
      isMobile,
      onYes,
      onNo,
    };
  },
};
</script>
