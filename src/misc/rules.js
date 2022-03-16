module.exports = {
  required: (value) => !!value || 'Pole wymagane',
  integer: (value) => !Number.isNaN(parseInt(value, 10)) || 'Wymagana wartość liczbowa',
  float: (value) => !Number.isNaN(parseFloat(value, 10)) || 'Wymagana wartość liczbowa',
};
