const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  return contents.split(/\r?\n/);
}

let data = syncReadFile("day1/data.txt");

let allElfs = [];

let currentElf = 0;

for (let item of data) {
  if (item === '') {
    allElfs.push(currentElf);
    currentElf = 0;
  } else {
    currentElf += parseInt(item);
  }
}

// console.log(allElfs);

let max = 0;

for (let n of allElfs) {
  max = Math.max(max, n);
}

allElfs.sort((a, b) => a - b);

// console.log(allElfs);

console.log(allElfs[allElfs.length - 1] + allElfs[allElfs.length - 2] + allElfs[allElfs.length - 3]);