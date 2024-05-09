import { RouteRecordRaw } from 'vue-router';
import MainLayout from 'src/App/layouts/MainLayout.vue';
import productsList from 'src/products/pages/productsList.vue';
import ErrorNotFound from 'src/App/pages/ErrorNotFound.vue';
import CreateProduct from 'src/products/pages/createProduct.vue';
import UpdateProduct from 'src/products/pages/updateProduct.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: () => {
      return { path: '/products' };
    },
  },

  {
    path: '/products',
    component: MainLayout,
    children: [
      { path: '', component: productsList },
      { path: 'create', component: CreateProduct },
      { path: 'update', component: UpdateProduct },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
  },
];

export default routes;
