const none = 0;
const tire = 1;
const rim = 2;

module.exports = {
  none,
  rim,
  items: [
    { id: tire, text: 'Opony' },
    { id: rim, text: 'Felgi' },
  ],
  getText(id) {
    const item = this.items.find((u) => u.id === id);
    return item ? item.text : '';
  },
};
