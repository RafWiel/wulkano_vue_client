const none = 0;
const front = 1;
const rear = 2;
const both = 3;

module.exports = {
  none,
  front,
  rear,
  both,
  items: [
    { id: front, text: 'Przód' },
    { id: rear, text: 'Tył' },
    { id: both, text: 'Przód/Tył' },
  ],
  getText(id) {
    const item = this.items.find((u) => u.id === id);
    return item ? item.text : '';
  },
};
