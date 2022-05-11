const none = 0;
const leftFront = 1;
const rightFront = 2;
const leftRear = 3;
const rightRear = 4;
const spare = 5;

module.exports = {
  none,
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
