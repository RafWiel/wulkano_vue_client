const none = 0;
const tractor = 1;
const truck = 2;
const bus = 3;
const semitrailer = 4;
const trailer = 5;
const other = 6;

module.exports = {
  none,
  other,
  tractor,
  truck,
  bus,
  semitrailer,
  trailer,
  items: [
    { id: bus, text: 'Autobus' },
    { id: tractor, text: 'Ciągnik' },
    { id: truck, text: 'Ciężarowy' },
    { id: semitrailer, text: 'Naczepa' },
    { id: trailer, text: 'Przyczepa' },
    { id: other, text: 'Inny' },
  ],
  getText(id) {
    const item = this.items.find((u) => u.id === id);
    return item ? item.text : '';
  },
};
