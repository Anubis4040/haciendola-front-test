<template>
  <h3 class="my-35">{{ update ? 'Actualizar' : 'Guardar' }} producto</h3>
  <div>
    <q-form @submit="saveProduct" @reset="resetForm">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6">
          <q-input v-model="product.handle" label="Handle" outlined lazy-rules
            :rules="[(val: string) => !!val || 'El handle es requerido']" />
        </div>
        <div class="col-12 col-sm-6">
          <q-input v-model="product.title" label="Titulo" outlined lazy-rules
            :rules="[(val: string) => !!val || 'El titulo es requerido']" />
        </div>
        <div class="col-12">
          <q-input v-model="product.description" label="Description" outlined lazy-rules type="textarea"
            :rules="[(val: string) => !!val || 'La descripcion es requerido']" />
        </div>
        <div class="col-12 col-sm-6">
          <q-input v-model="product.sku" label="SKU" outlined lazy-rules
            :rules="[(val: string) => !!val || 'El sku es requerido']" />
        </div>
        <div class="col-12 col-sm-6">
          <q-input v-model.number="product.grams" label="Gramos" outlined lazy-rules type="number"
            :rules="[(val: number) => !!val || 'Los gramos son requeridos']" />
        </div>
        <div class="col-12 col-sm-6">
          <q-input v-model.number="product.stock" label="Stock" outlined lazy-rules type="number"
            :rules="[(val: number) => !!val || 'El stock es requerido']" />
        </div>
        <div class="col-12 col-sm-6">
          <q-input v-model.number="product.price" label="Precio" outlined lazy-rules type="number"
            :rules="[(val: number) => !!val || 'El precio es requerido']" />
        </div>
        <div class="col-12 col-sm-6">
          <q-input v-model.number="product.comparePrice" label="Precio de comparacion" outlined lazy-rules type="number"
            :rules="[(val: number) => !!val || 'El Precio de comparacion es requerido']" />
        </div>
        <div class="col-12 col-sm-6">
          <q-input v-model="product.barcode" label="Codigo de barras" outlined lazy-rules
            :rules="[(val: string) => !!val || 'El codigo de barras es requerido']" />
        </div>
      </div>
      <q-btn :loading="ProductStore.loading" type="submit" color="primary" :label="update ? 'Actualizar' : 'Guardar'"
        class="q-mr-sm" />
      <q-btn label="Reset" type="reset" color="primary" />
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Product, ProductForm } from '../interfaces/product';
import { useProductsStore } from 'src/stores/products';
import { mainInstance } from 'src/api/mainInstance';
import { useQuasar } from 'quasar';

// INITIALIZATION
const $q = useQuasar();
const ProductStore = useProductsStore();
const emit = defineEmits(['save', 'update']);

defineOptions({
  name: 'productForm',
});

const props = defineProps({
  userId: {
    type: String,
    default: null,
  },
  update: {
    type: Boolean,
    default: false,
  },
});

// REACTIVE DATA

const product = ref<ProductForm>({
  handle: '',
  title: '',
  description: '',
  sku: '',
  grams: null,
  stock: null,
  price: null,
  comparePrice: null,
  barcode: '',
});

// WATCHERS


// FUNCSTIONS

function saveProduct() {
  if (props.update) {
    emit('update', product.value);
  } else {
    emit('save', product.value);
  }
}

const setform = (data: Product) => {
  product.value = {
    handle: data.handle,
    title: data.title,
    description: data.description,
    sku: data.sku,
    grams: data.grams,
    stock: data.stock,
    price: data.price,
    comparePrice: data.comparePrice,
    barcode: data.barcode,
  };
};

const getProduct = (productId: string) => {
  mainInstance
    .get(`products/${productId}`)
    .then((res) => {
      setform(res.data.data)
    })
    .catch((err) => {
      console.log(err);
      $q.notify({
        color: 'negative',
        textColor: 'white',
        progress: true,
        classes: 'text-medium',
        position: 'top-right',
        message: '¡Hubo un problema al buscar el producto!',
        icon: 'error',
        timeout: 3000,
      });
    });
};

function resetForm() {
  product.value = {
    handle: '',
    title: '',
    description: '',
    sku: '',
    grams: null,
    stock: null,
    price: null,
    comparePrice: null,
    barcode: '',
  };
}

onMounted(() => {
  if (props.update) {
    getProduct(props.userId);
  }
});
</script>
