module.exports = {
  items: [
    { id: false, text: 'Nie' },
    { id: true, text: 'Tak' },
  ],
  getText(id) {
    const item = this.items.find((u) => u.id === Boolean(id));
    return item ? item.text : '';
  },
};
