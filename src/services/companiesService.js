import api from '@/services/api';

export default {
  getPhoneNumbers(data) {
    return api().get('companies/phone-numbers', { params: data });
  },
  getTaxIdNumbers(data) {
    return api().get('companies/tax-id-numbers', { params: data });
  },
};
