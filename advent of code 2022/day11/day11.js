const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  return contents.split(/\r?\n/);
}

let data = syncReadFile("day11/data.txt");

// console.log(data);

let monkeys = [];

for (let i = 0; i < data.length; i += 7) {
  let monkey = [];
  for (let j = i; j < i + 7; j++) {
    monkey.push(data[j]);
  }
  monkeys.push(monkey);
}

// console.log(monkeys);

// let sampleMonkeyInfo = [
//   {
//     items: [79, 98],
//     operation: "*",
//     operand: 19,
//     test: 23,
//     true: 2,
//     false: 3,
//     numInsp: 0
//   },
//   {
//     items: [54, 65, 75, 74],
//     operation: "+",
//     operand: 6,
//     test: 19,
//     true: 2,
//     false: 0,
//     numInsp: 0
//   },
//   {
//     items: [79, 60, 97],
//     operation: "*",
//     operand: -1,
//     test: 13,
//     true: 1,
//     false: 3,
//     numInsp: 0
//   },
//   {
//     items: [74],
//     operation: "+",
//     operand: 3,
//     test: 17,
//     true: 0,
//     false: 1,
//     numInsp: 0
//   }
// ];

let sampleMonkeyInfo = [
  {
    items: [73, 77],
    operation: "*",
    operand: 5,
    test: 11,
    true: 6,
    false: 5,
    numInsp: 0
  },
  {
    items: [57, 88, 80],
    operation: "+",
    operand: 5,
    test: 19,
    true: 6,
    false: 0,
    numInsp: 0
  },
  {
    items: [61, 81, 84, 69, 77, 88],
    operation: "*",
    operand: 19,
    test: 5,
    true: 3,
    false: 1,
    numInsp: 0
  },
  {
    items: [78, 89, 71, 60, 81, 84, 87, 75],
    operation: "+",
    operand: 7,
    test: 3,
    true: 1,
    false: 0,
    numInsp: 0
  },
  {
    items: [60, 76, 90, 63, 86, 87, 89],
    operation: "+",
    operand: 2,
    test: 13,
    true: 2,
    false: 7,
    numInsp: 0
  },
  {
    items: [88],
    operation: "+",
    operand: 1,
    test: 17,
    true: 4,
    false: 7,
    numInsp: 0
  },
  {
    items: [84, 98, 78, 85],
    operation: "*",
    operand: -1,
    test: 7,
    true: 5,
    false: 4,
    numInsp: 0
  },
  {
    items: [98, 89, 78, 73, 71],
    operation: "+",
    operand: 4,
    test: 2,
    true: 3,
    false: 2,
    numInsp: 0
  }
];

// for (let monkey of monkeys) {
//   let startingItemsString = monkey[1];
//   let
//   let startingItemsStringArr = startingItemsString.split()
// }
let inspectRounds = new Set([1, 20, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]);
for (let round = 1; round <= 10000; round++) { //PT1 is up to 20
  for (let i = 0; i < sampleMonkeyInfo.length; i++) {
    let monkeyInfo = sampleMonkeyInfo[i];
    while (monkeyInfo.items.length > 0) {
      monkeyInfo.numInsp++;
      let item = monkeyInfo.items.shift();

      if (monkeyInfo.operation === "*") {
        if (monkeyInfo.operand < 0) item *= item;
        else item *= monkeyInfo.operand;
      } else {
        if (monkeyInfo.operand < 0) item *= item;
        else item += monkeyInfo.operand;
      }
      // item = Math.floor(item / 3);

      sampleMonkeyInfo[(item % monkeyInfo.test === 0) ? monkeyInfo.true : monkeyInfo.false].items.push(item % 9699690);
    }
  }
  if (inspectRounds.has(round)) {
    console.log("round = " + round);
    console.log(sampleMonkeyInfo);
  }
}

let activity = [];

for (let i = 0; i < sampleMonkeyInfo.length; i++) {
  activity.push(sampleMonkeyInfo[i].numInsp);
}
activity.sort((a, b) => b - a);
let ans = activity[0] * activity[1];
console.log(ans);

// PT1 91760 is not correct!, 56120 is correct!

// PT2 14463068816 is not correct!, 2713310158 is too low!, 16080264240 is too low!, 23574040199 is wrong!,
//                                                          14399639982
//                                                                                   24389045529