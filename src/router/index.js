import Vue from 'vue';
import VueRouter from 'vue-router';
import TruckServiceForm from '../views/truck/TruckServiceForm.vue';
import CarServiceForm from '../views/car/CarServiceForm.vue';
import DepositForm from '../views/deposit/DepositForm.vue';
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
    path: '/service/car/',
    name: 'CarServiceForm',
    component: CarServiceForm,
  },
  {
    path: '/service/truck/',
    name: 'TruckServiceForm',
    component: TruckServiceForm,
  },
  {
    path: '/deposit',
    name: 'DepositForm',
    component: DepositForm,
  },
  {
    path: '/requests',
    name: 'RequestsListView',
    component: RequestsListView,
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
