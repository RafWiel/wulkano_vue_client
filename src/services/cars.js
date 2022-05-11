import api from '@/services/api';

export default {
  create(request) {
    return api().post('service/cars', request);
  },
  getOne(id) {
    return api().get(`service/cars/${id}`);
  },
};
