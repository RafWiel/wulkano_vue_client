import Vue from 'vue';
import VueRouter from 'vue-router';
import TruckServiceAddForm from '../views/truck/TruckServiceAddForm.vue';
import TruckServiceViewEditForm from '../views/truck/TruckServiceViewEditForm.vue';
import CarServiceAddForm from '../views/car/CarServiceAddForm.vue';
import CarServiceViewEditForm from '../views/car/CarServiceViewEditForm.vue';
import DepositAddForm from '../views/deposit/DepositAddForm.vue';
import DepositViewForm from '../views/deposit/DepositViewForm.vue';
import RequestsListView from '../views/RequestsListView.vue';
import LoginView from '../views/authorization/LoginView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    redirect: {
      name: 'RequestsListView',
    },
  },
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      isLoginView: true,
    },
  },
  {
    path: '/requests',
    name: 'RequestsListView',
    component: RequestsListView,
  },
  {
    path: '/service/car/',
    name: 'CarServiceAddForm',
    component: CarServiceAddForm,
    meta: {
      isBackButton: true,
    },
  },
  {
    path: '/service/car/:id',
    name: 'CarServiceViewEditForm',
    component: CarServiceViewEditForm,
    props: true,
    meta: {
      isBackButton: true,
    },
  },
  {
    path: '/service/truck/',
    name: 'TruckServiceAddForm',
    component: TruckServiceAddForm,
    meta: {
      isBackButton: true,
    },
  },
  {
    path: '/requests/truck-service/:id',
    name: 'TruckServiceViewEditForm',
    component: TruckServiceViewEditForm,
    props: true,
    meta: {
      isBackButton: true,
    },
  },
  {
    path: '/deposit',
    name: 'DepositAddForm',
    component: DepositAddForm,
    meta: {
      isBackButton: true,
    },
  },
  {
    path: '/requests/deposit/:id',
    name: 'DepositViewForm',
    component: DepositViewForm,
    props: true,
    meta: {
      isBackButton: true,
    },
  },

  // {
  //   path: '/',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
