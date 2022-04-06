import api from '@/services/api';

export default {
  getPhoneNumbers(data) {
    return api().get('client/phone-numbers', { params: data });
  },
};
