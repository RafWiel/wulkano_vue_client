import axios from 'axios';
import store from '@/store/store';

export default () => {
  const api = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: { Authorization: `Bearer ${store.state.token}` },
    // baseURL: 'https://wulkano-service-demo.herokuapp.com',
  });

  // api.interceptors.request.use((request) => {
  //   console.log('interceptors.request');
  //   return request;
  // });

  // api.interceptors.response.use((response) => response, (error) => {
  //   // console.log('interceptors.response error: ', error);
  //   router.replace({ name: 'Login' });
  //   return error;
  // });

  return api;
};
