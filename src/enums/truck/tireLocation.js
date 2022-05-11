const none = 0;
const leftAxle1 = 1;
const rightAxle1 = 2;
const leftOutsideAxle2 = 3;
const leftInsideAxle2 = 4;
const rightOutsideAxle2 = 5;
const rightInsideAxle2 = 6;
const leftOutsideAxle3 = 7;
const leftInsideAxle3 = 8;
const rightOutsideAxle3 = 9;
const rightInsideAxle3 = 10;
const leftOutsideAxle4 = 11;
const leftInsideAxle4 = 12;
const rightOutsideAxle4 = 13;
const rightInsideAxle4 = 14;
const leftOutsideAxle5 = 15;
const leftInsideAxle5 = 16;
const rightOutsideAxle5 = 17;
const rightInsideAxle5 = 18;
const spare1 = 19;
const spare2 = 20;

module.exports = {
  none,
  leftAxle1,
  rightAxle1,
  leftOutsideAxle2,
  leftInsideAxle2,
  rightOutsideAxle2,
  rightInsideAxle2,
  leftOutsideAxle3,
  leftInsideAxle3,
  rightOutsideAxle3,
  rightInsideAxle3,
  leftOutsideAxle4,
  leftInsideAxle4,
  rightOutsideAxle4,
  rightInsideAxle4,
  leftOutsideAxle5,
  leftInsideAxle5,
  rightOutsideAxle5,
  rightInsideAxle5,
  spare1,
  spare2,
  items: [
    { id: leftAxle1, text: '1L' },
    { id: rightAxle1, text: '1P' },
    { id: leftOutsideAxle2, text: '2LZ' },
    { id: leftInsideAxle2, text: '2LW' },
    { id: rightOutsideAxle2, text: '2PZ' },
    { id: rightInsideAxle2, text: '2PW' },
    { id: leftOutsideAxle3, text: '3LZ' },
    { id: leftInsideAxle3, text: '3LW' },
    { id: rightOutsideAxle3, text: '3PZ' },
    { id: rightInsideAxle3, text: '3PW' },
    { id: leftOutsideAxle4, text: '4LZ' },
    { id: leftInsideAxle4, text: '4LW' },
    { id: rightOutsideAxle4, text: '4PZ' },
    { id: rightInsideAxle4, text: '4PW' },
    { id: leftOutsideAxle5, text: '5LZ' },
    { id: leftInsideAxle5, text: '5LW' },
    { id: rightOutsideAxle5, text: '5PZ' },
    { id: rightInsideAxle5, text: '5PW' },
    { id: spare1, text: 'Z1' },
    { id: spare2, text: 'Z2' },
  ],
  getText(id) {
    const item = this.items.find((u) => u.id === id);
    return item ? item.text : '';
  },
};
