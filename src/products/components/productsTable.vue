<template>
  <div class="flex items-center justify-between">
    <h3 class="my-35">Listado de Productos</h3>
    <q-btn color="primary" label="Crear producto" to="/products/create" icon="add" />
  </div>
  <div>
    <q-table :pagination="pagination" title="Productos" :rows="products" :columns="columns" row-key="name">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn @click="() => { deleteDialog = true; setSelected(props.row.id) }" size="12px" unelevated round
              color="negative" icon="delete" />
            <q-btn @click="() => { editDialog = true; setSelected(props.row.id) }" size="12px" unelevated round
              color="warning" icon="edit" />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="deleteDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="delete" color="negative" text-color="white" />
        <span class="q-ml-sm">¿ Estar seguro de que quieres borrar este producto ?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn @click="deleteProduct" deleteProducts flat label="Borrar" color="negative" v-close-popup />
        <q-btn @click="deleteDialog = false" flat label="Cancelar" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="editDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="delete" color="warning" text-color="white" />
        <span class="q-ml-sm">¿ Quieres editar este producto ?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn @click="$router.push({ name: 'updateUser', params: { id: selectedProduct } })" flat label="Editar"
          color="primary" v-close-popup />
        <q-btn @click="deleteDialog = false" flat label="Cancelar" color="grey" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { QTableColumn, useQuasar } from 'quasar';
import { mainInstance } from 'src/api/mainInstance';
import { computed, onMounted, reactive, ref } from 'vue';
import { Product } from '../interfaces/product';

const $q = useQuasar();

defineOptions({
  name: 'productsTable',
});

const deleteDialog = ref<boolean>(false);
const editDialog = ref<boolean>(false);
const selectedProduct = ref<string | null>(null);
const pagination = reactive<{ page: number, rowsPerPage: number }>({
  page: 1,
  rowsPerPage: 10
});

const columns: QTableColumn[] = [
  {
    name: 'handle',
    label: 'Handle',
    field: 'handle',
  },
  {
    name: 'title',
    label: 'Titulo',
    field: 'title',
  },
  {
    name: 'descriptions',
    label: 'Descripcion',
    field: 'description',
  },
  {
    name: 'sku',
    label: 'SKU',
    field: 'sku',
  },
  {
    name: 'grams',
    label: 'Gramos',
    field: 'grams',
  },
  {
    name: 'stock',
    label: 'Stock',
    field: 'stock',
  },
  {
    name: 'price',
    label: 'Precio',
    field: 'price',
  },
  {
    name: 'comparePrice',
    label: 'Precio de comparacion',
    field: 'comparePrice',
  },
  {
    name: 'barcode',
    label: 'Codigo de barras',
    field: 'barcode',
  },
  {
    name: 'actions',
    label: 'Acciones',
    field: 'actions',
  },
];

const products = ref<Product[]>([]);

// COMPUTEDS

const offset = computed(() => (pagination.page - 1) * pagination.rowsPerPage);

// FUNCSTIONS

const setSelected = (id: string) => {
  selectedProduct.value = id;
};

// Remover elemento de la lista de productos por id
const removeProduct = (id: string) => {
  const index = products.value.findIndex(product => product.id === id);
  products.value.splice(index, 1);
};

const listProducts = () => {
  mainInstance
    .get(`products?pagination[offset]=${offset.value}&pagination[limit]=${pagination.rowsPerPage}`)
    .then((res) => {
      console.log(res.data);
      products.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
      $q.notify({
        color: 'negative',
        textColor: 'white',
        progress: true,
        classes: 'text-medium',
        position: 'top-right',
        message: '¡Hubo un problema al listar los products!',
        icon: 'error',
        timeout: 3000,
      });
    });
};

const deleteProduct = () => {
  mainInstance
    .delete(`products/${selectedProduct.value}`)
    .then((res) => {
      console.log(res.data);
      removeProduct(selectedProduct.value as string);
      $q.notify({
        color: 'positive',
        textColor: 'white',
        progress: true,
        classes: 'text-medium',
        position: 'top-right',
        message: '¡Producto borrado con exito!',
        icon: 'verified',
        timeout: 3000,
      });
    })
    .catch((err) => {
      console.log(err);
      $q.notify({
        color: 'negative',
        textColor: 'white',
        progress: true,
        classes: 'text-medium',
        position: 'top-right',
        message: '¡Hubo un problema al borrar el producto!',
        icon: 'error',
        timeout: 3000,
      });
    });
};

onMounted(() => {
  listProducts();
});
</script>
