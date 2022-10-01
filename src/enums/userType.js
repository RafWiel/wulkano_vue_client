const mechanic = 0;
const accountManager = 1;

module.exports = {
  mechanic,
  accountManager,
  items: [
    { id: mechanic, text: 'Mechanik' },
    { id: accountManager, text: 'Opiekun klienta' },
  ],
  getText(id) {
    const item = this.items.find((u) => u.id === id);
    return item ? item.text : '';
  },
};
