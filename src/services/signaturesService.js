import api from '@/services/api';

export default {
  get(data) {
    return api().get('signatures', { params: data });
  },
};
