<template>
  <div class="flex items-center justify-between">
    <h3 class="my-35">Listado de Productos</h3>
    <q-btn
      color="primary"
      label="Crear producto"
      to="/products/create"
      icon="add"
    />
  </div>
  <div>
    <q-table title="Productos" :rows="rows" :columns="columns" row-key="name" />
  </div>
</template>

<script setup lang="ts">
import { QTableColumn } from 'quasar';

defineOptions({
  name: 'productsTable',
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
    label: 'Iron (%)',
    field: 'comparePrice',
  },
  {
    name: 'barcode',
    label: 'Codigo de barras',
    field: 'barcode',
  },
];

const rows = [
  {
    handle: 'Frozen Yogurt',
    title: 'Frozen Yogurt',
    description: 'Delicious frozen yogurt',
    sku: 'FY001',
    grams: 150,
    stock: 10,
    price: 5.99,
    comparePrice: 0,
    barcode: '123456789',
  },
  {
    handle: 'Ice cream sandwich',
    title: 'Ice cream sandwich',
    description: 'Yummy ice cream sandwich',
    sku: 'ICS001',
    grams: 200,
    stock: 5,
    price: 3.99,
    comparePrice: 0,
    barcode: '987654321',
  },
  {
    handle: 'Eclair',
    title: 'Eclair',
    description: 'Delicious eclair',
    sku: 'EC001',
    grams: 180,
    stock: 8,
    price: 4.49,
    comparePrice: 0,
    barcode: '456789123',
  },
  {
    handle: 'Chocolate bar',
    title: 'Chocolate bar',
    description: 'Delicious chocolate bar',
    sku: 'CB001',
    grams: 100,
    stock: 15,
    price: 2.99,
    comparePrice: 0,
    barcode: '9876543210',
  },
  {
    handle: 'Gummy bears',
    title: 'Gummy bears',
    description: 'Yummy gummy bears',
    sku: 'GB001',
    grams: 250,
    stock: 20,
    price: 1.99,
    comparePrice: 0,
    barcode: '1234567890',
  },
  {
    handle: 'Caramel popcorn',
    title: 'Caramel popcorn',
    description: 'Delicious caramel popcorn',
    sku: 'CP001',
    grams: 120,
    stock: 12,
    price: 3.49,
    comparePrice: 0,
    barcode: '0987654321',
  },
  {
    handle: 'Sour candy',
    title: 'Sour candy',
    description: 'Tangy sour candy',
    sku: 'SC001',
    grams: 80,
    stock: 18,
    price: 1.49,
    comparePrice: 0,
    barcode: '0123456789',
  },
  // Add more rows with random data here
];
</script>
