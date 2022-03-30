const none = 0;
const car = 1;
const truck = 2;
const offroad = 3;
const cale = 4;

module.exports = {
  none,
  car,
  truck,
  offroad,
  cale,
  items: [
    { id: car, text: 'Osobowy' },
    { id: truck, text: 'Dostawczy' },
    { id: offroad, text: 'Terenowy' },
    { id: cale, text: 'CALE' },
  ],
  getText(id) {
    const item = this.items.find((u) => u.id === id);
    return item ? item.text : '';
  },
};
