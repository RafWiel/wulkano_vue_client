const leftFront = 0;
const rightFront = 1;
const leftRear = 2;
const rightRear = 3;

module.exports = {
  leftFront,
  rightFront,
  leftRear,
  rightRear,
  items: [
    { id: leftFront, text: 'LP' },
    { id: rightFront, text: 'PP' },
    { id: leftRear, text: 'LT' },
    { id: rightRear, text: 'PT' },
  ],
  getText(id) {
    const item = this.items.find((u) => u.id === id);
    return item ? item.text : '';
  },
};
