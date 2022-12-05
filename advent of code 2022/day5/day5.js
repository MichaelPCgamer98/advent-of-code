const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  return contents.split(/\r?\n/);
}

let data = syncReadFile("day5/data.txt");

// console.log(data);

let sampleStack1 = ['Z', 'N'];
let sampleStack2 = ['M', 'C', 'D'];
let sampleStack3 = ['P'];

let sampleStacks = [sampleStack1, sampleStack2, sampleStack3];

let moves = [];
for (let i = 10; i < data.length; i++) {
  moves.push(data[i]);
}

// console.log(moves);

function deconstructMove(move) {
  let moveItems = move.split(" ");

  return [parseInt(moveItems[1]), parseInt(moveItems[3]), parseInt(moveItems[5])];
}

let stack1 = ['F', 'C', 'P', 'G', 'Q', 'R'];
let stack2 = ['W', 'T', 'C', 'P'];
let stack3 = ['B', 'H', 'P', 'M', 'C'];
let stack4 = ['L', 'T', 'Q', 'S', 'M', 'P', 'R'];
let stack5 = ['P', 'H', 'J', 'Z', 'V', 'G', 'N'];
let stack6 = ['D', 'P', 'J'];
let stack7 = ['L', 'G', 'P', 'Z', 'F', 'J', 'T', 'R'];
let stack8 = ['N', 'L', 'H', 'C', 'F', 'P', 'T', 'J'];
let stack9 = ['G', 'V', 'Z', 'Q', 'H', 'T', 'C', 'W'];

let stacks = [stack1, stack2, stack3, stack4, stack5, stack6, stack7, stack8, stack9];


function PT1() {
  for (let move of moves) {
    let current = deconstructMove(move);
    // console.log("current");
    // console.log(current);
    for (let i = 0; i < current[0]; i++) {
      let temp = stacks[current[1] - 1].pop();
      stacks[current[2] - 1].push(temp);
    }
  }
}

// PT1();

function PT2() {
  for (let move of moves) {
    let current = deconstructMove(move);

    let piece = [];
    for (let i = 0; i < current[0]; i++) {
      piece.push(stacks[current[1] - 1].pop());
    }

    for (let i = piece.length - 1; i >= 0; i--) {
      stacks[current[2] - 1].push(piece[i]);
    }
  }
}

PT2();
let ans = [];
for (let crate of stacks) {
  ans.push(crate[crate.length - 1]);
}
console.log(ans.join(""));