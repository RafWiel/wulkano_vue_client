import api from '@/services/api';

export default {
  get(data) {
    return api().get('service-requests', { params: data });
  },
};
