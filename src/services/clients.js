import api from '@/services/api';

export default {
  getNames(data) {
    return api().get('clients/names', { params: data });
  },
  getCompanyNames(data) {
    return api().get('clients/company-names', { params: data });
  },
  getPhoneNumbers(data) {
    return api().get('clients/phone-numbers', { params: data });
  },
  getFirst(data) {
    return api().get('clients/first', { params: data });
  },
};
