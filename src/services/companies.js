import api from '@/services/api';

export default {
  getNames(data) {
    return api().get('companies/names', { params: data });
  },
  getTaxIdNumbers(data) {
    return api().get('companies/tax-id-numbers', { params: data });
  },
  getPhoneNumbers(data) {
    return api().get('companies/phone-numbers', { params: data });
  },
  getFirst(data) {
    return api().get('companies/first', { params: data });
  },
};
