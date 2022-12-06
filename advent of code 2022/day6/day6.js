const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  return contents.split(/\r?\n/);
}

let data = syncReadFile("day6/data.txt");

let line = data[0].split('');

console.log(line);

let window = [];

for (let i = 0; i < 14; i++) { //PT 1 = "i < 4"
  window.push(line[i]);
}

function allDifferent(data) {
  return new Set(data).size === data.length;
}
if (allDifferent(window)) console.log(4);
for (let i = 4; i < line.length; i++) {
  window.shift();
  window.push(line[i]);
  console.log(window);

  if (allDifferent(window)) {
    console.log(i + 1);
    break;
  }
}