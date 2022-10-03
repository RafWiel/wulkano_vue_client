import api from '@/services/api';

export default {
  create(request) {
    return api().post('service/trucks', request);
  },
  update(request) {
    return api().put('service/trucks', request);
  },
  getOne(id) {
    return api().get(`service/trucks/${id}`);
  },
};
