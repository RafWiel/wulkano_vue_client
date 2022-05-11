import Vue from 'vue';
import VueRouter from 'vue-router';
import TruckServiceEditForm from '../views/truck/TruckServiceEditForm.vue';
import TruckServiceViewForm from '../views/truck/TruckServiceViewForm.vue';
import CarServiceEditForm from '../views/car/CarServiceEditForm.vue';
import DepositEditForm from '../views/deposit/DepositEditForm.vue';
import DepositViewForm from '../views/deposit/DepositViewForm.vue';
import RequestsListView from '../views/RequestsListView.vue';

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
    path: '/requests',
    name: 'RequestsListView',
    component: RequestsListView,
  },

  {
    path: '/service/car/',
    name: 'CarServiceEditForm',
    component: CarServiceEditForm,
    meta: {
      isBackButton: true,
    },
  },
  {
    path: '/service/truck/',
    name: 'TruckServiceEditForm',
    component: TruckServiceEditForm,
    meta: {
      isBackButton: true,
    },
  },
  {
    path: '/requests/truck-service/:id',
    name: 'TruckServiceViewForm',
    component: TruckServiceViewForm,
    props: true,
    meta: {
      isBackButton: true,
    },
  },
  {
    path: '/deposit',
    name: 'DepositEditForm',
    component: DepositEditForm,
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
