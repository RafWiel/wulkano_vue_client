import api from '@/services/api';

export default {
  create(request) {
    return api().post('deposits', request);
  },
  getOne(id) {
    return api().get(`requests/${id}`);
  },
};
