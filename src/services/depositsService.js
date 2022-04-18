import api from '@/services/api';

export default {
  create(request) {
    return api().post('deposit', request);
  },
  getOne(id) {
    return api().get(`requests/${id}`);
  },
};
