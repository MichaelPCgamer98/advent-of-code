const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  return contents.split(/\r?\n/);
}

let data = syncReadFile("day10/data.txt");

// console.log(data);

let x = 1;
let cycle = 1;

let wantedCycles = new Set([20, 60, 100, 140, 180, 220]);
console.log(wantedCycles);

let ans = 0;

let PT2 = "";

for (let d of data) {
  let dArr = d.split(" ");
  if (dArr[0] === "addx") {

    for (let i = 1; i <= 2; i++) {
      if (i === 1) console.log("Start cycle  " + cycle + ": begin executing " + dArr);

      if ((PT2.length % 40) === x - 1 || (PT2.length % 40) === x || (PT2.length % 40) === x + 1) {
        PT2 += "#";
      } else PT2 += ".";
      if (wantedCycles.has(cycle)) {
        // console.log("cycle " + cycle + " x " + x);
        // console.log(cycle * x);
        ans += (cycle * x);
      }

      if (i === 2) {
        console.log("Start cycle  " + cycle + ": begin executing " + dArr);
        x += parseInt(dArr[1]);
      }

      console.log(PT2);
      cycle++;
    }
    console.log("fiinish executing " + dArr + " (Register X is now " + x + ")");
  } else if (dArr[0] === "noop") {
    console.log("Start cycle  " + cycle + ": begin executing " + dArr);

    if (wantedCycles.has(cycle)) {
      // console.log("cycle " + cycle + " x " + x);
      // console.log(cycle * x);
      ans += (cycle * x);
    }
    if ((PT2.length % 40) === x - 1 || (PT2.length % 40) === x || (PT2.length % 40) === x + 1) {
      PT2 += "#";
    } else PT2 += ".";
    console.log(PT2);
    cycle++;
  }
  // console.log("NOW cycle " + cycle + " x " + x);

  console.log();
}

console.log(ans);

// 13740 is correct!

let PT2Pieces = [];

const chunkSize = 40;
for (let i = 0; i < PT2.length; i += chunkSize) {
  const chunk = PT2.slice(i, i + chunkSize);
  console.log(chunk)
  PT2Pieces.push(chunk);
}

console.log(PT2Pieces);

// PT2 ZUPRFECL is correct!
