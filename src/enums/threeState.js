const none = 0;
const ok = 1;
const avg = 2;
const bad = 3;

module.exports = {
  none,
  ok,
  avg,
  bad,
  items: [
    { id: ok, text: 'Dobry' },
    { id: avg, text: 'Średni' },
    { id: bad, text: 'Zły' },
  ],
  getText(id) {
    const item = this.items.find((u) => u.id === id);
    return item ? item.text : '';
  },
};
