import api from '@/services/api';

export default {
  getPhoneNumbers(data) {
    return api().get('clients/phone-numbers', { params: data });
  },
  getFirstByPhoneNumber(data) {
    return api().get('clients/first', { params: data });
  },
};
