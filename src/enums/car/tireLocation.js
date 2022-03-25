const leftFront = 0;
const rightFront = 1;
const leftRear = 2;
const rightRear = 3;
const spare = 4;

module.exports = {
  leftFront,
  rightFront,
  leftRear,
  rightRear,
  spare,
  items: [
    { id: leftFront, text: 'LP' },
    { id: rightFront, text: 'PP' },
    { id: leftRear, text: 'LT' },
    { id: rightRear, text: 'PT' },
    { id: spare, text: 'Z' },
  ],
  getText(id) {
    const item = this.items.find((u) => u.id === id);
    return item ? item.text : '';
  },
};
