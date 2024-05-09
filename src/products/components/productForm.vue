<template>
  <h3 class="my-35">{{ update ? 'Actualizar' : 'Guardar' }} producto</h3>
  <div>
    <q-form @submit="saveProduct" @reset="resetForm">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6">
          <q-input
            v-model="product.handle"
            label="Handle"
            outlined
            lazy-rules
            :rules="[(val: string) => !!val || 'El handle es requerido']"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            v-model="product.title"
            label="Titulo"
            outlined
            lazy-rules
            :rules="[(val: string) => !!val || 'El titulo es requerido']"
          />
        </div>
        <div class="col-12">
          <q-input
            v-model="product.description"
            label="Description"
            outlined
            lazy-rules
            type="textarea"
            :rules="[(val: string) => !!val || 'La descripcion es requerido']"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            v-model="product.sku"
            label="SKU"
            outlined
            lazy-rules
            :rules="[(val: string) => !!val || 'El sku es requerido']"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            v-model="product.grams"
            label="Gramos"
            outlined
            lazy-rules
            type="number"
            :rules="[(val: number) => !!val || 'Los gramos son requeridos']"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            v-model="product.stock"
            label="Stock"
            outlined
            lazy-rules
            type="number"
            :rules="[(val: number) => !!val || 'El stock es requerido']"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            v-model="product.price"
            label="Precio"
            outlined
            lazy-rules
            type="number"
            :rules="[(val: number) => !!val || 'El precio es requerido']"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            v-model="product.comparePrice"
            label="Precio de comparacion"
            outlined
            lazy-rules
            type="number"
            :rules="[(val: number) => !!val || 'El Precio de comparacion es requerido']"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            v-model="product.barcode"
            label="Codigo de barras"
            outlined
            lazy-rules
            :rules="[(val: string) => !!val || 'El codigo de barras es requerido']"
          />
        </div>
      </div>
      <q-btn
        type="submit"
        color="primary"
        :label="update ? 'Actualizar' : 'Guardar'"
        class="q-mr-sm"
      />
      <q-btn label="Reset" type="reset" color="primary" />
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { Todo, Meta } from './models';

const emit = defineEmits(['save', 'update']);

defineOptions({
  name: 'productForm',
});

const props = defineProps({
  update: {
    type: Boolean,
    default: false,
  },
});

const product = ref({
  handle: '',
  title: '',
  description: '',
  sku: '',
  grams: 0,
  stock: 0,
  price: 0,
  comparePrice: 0,
  barcode: '',
});

function saveProduct() {
  console.log(product.value);
  if (props.update) {
    emit('update', product.value);
  } else {
    emit('save', product.value);
  }
}

function resetForm() {
  product.value = {
    handle: '',
    title: '',
    description: '',
    sku: '',
    grams: 0,
    stock: 0,
    price: 0,
    comparePrice: 0,
    barcode: '',
  };
}
</script>
