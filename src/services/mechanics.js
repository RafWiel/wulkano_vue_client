import api from '@/services/api';

export default {
  getNames(data) {
    return api().get('mechanics/names', { params: data });
  },
};
