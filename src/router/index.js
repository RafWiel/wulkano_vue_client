import Vue from 'vue';
import VueRouter from 'vue-router';
import TruckServiceForm from '../views/truck/TruckServiceForm.vue';
import CarServiceForm from '../views/car/CarServiceForm.vue';
import DepositForm from '../views/deposit/DepositForm.vue';
import ServiceRequestsListView from '../views/ServiceRequestsListView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'ServiceRequestsListView',
    component: ServiceRequestsListView,
  },
  // {
  //   path: '/',
  //   name: 'DepositForm',
  //   component: DepositForm,
  // },
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
    path: '/service-requests',
    name: 'ServiceRequestsListView',
    component: ServiceRequestsListView,
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
  routes,
});

export default router;
