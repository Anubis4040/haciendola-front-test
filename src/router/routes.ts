import { RouteRecordRaw } from 'vue-router';
import MainLayout from 'src/App/layouts/MainLayout.vue';
import productsList from 'src/products/pages/productsList.vue';
import ErrorNotFound from 'src/App/pages/ErrorNotFound.vue';
import CreateProduct from 'src/products/pages/createProduct.vue';
import UpdateProduct from 'src/products/pages/updateProduct.vue';
import LoginLayout from 'src/auth/layouts/LoginLayout.vue';
import LoginPage from 'src/auth/pages/LoginPage.vue';
import ForgotPassword from 'src/auth/pages/ForgotPassword.vue';
import NewPassword from 'src/auth/pages/NewPassword.vue';
import RegisterPage from 'src/auth/pages/RegisterPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: () => {
      return { path: '/products' };
    },
  },

  {
    path: '/login',
    component: LoginLayout,
    children: [{ path: '', component: LoginPage }],
    meta: { auth: false },
  },

  {
    path: '/register',
    component: LoginLayout,
    children: [{ path: '', component: RegisterPage }],
    meta: { auth: false },
  },

  {
    path: '/forgot-password',
    component: LoginLayout,
    children: [{ path: '', component: ForgotPassword }],
  },

  {
    path: '/new-password',
    component: LoginLayout,
    children: [{ path: '', component: NewPassword }],
  },

  {
    path: '/products',
    component: MainLayout,
    children: [
      { name: 'productList', path: '', component: productsList },
      { name: 'createUser', path: 'create', component: CreateProduct },
      { name: 'updateUser', path: 'update/:id', component: UpdateProduct },
    ],
    meta: { auth: true },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
  },
];

export default routes;
