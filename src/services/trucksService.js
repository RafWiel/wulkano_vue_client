import api from '@/services/api';

export default {
  create(request) {
    return api().post('service/truck', request);
  },
  // getOne(id) {
  //   return api().get(`requests/${id}`);
  // },
};
