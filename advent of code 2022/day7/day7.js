const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  return contents.split(/\r?\n/);
}

let data = syncReadFile("day7/data.txt");

// console.log(data);

let values = {};
let totalSize = 0;

let path = "/";
let stack = [];
let allPaths = [];

for (let i = 0; i < data.length; i++) {
  let dArr = data[i].split(" ");
  if (dArr[0] === "$") {
    if (dArr[1] === "cd") {
      if (dArr[2] === "/") {
        i += 2;
      } else if (dArr[2] === "..") {
        stack.pop();
        allPaths.pop();
      } else {
        stack.push(dArr[2]);
        allPaths.push("/" + stack.join("/"))
      }
    }
    path = "/" + stack.join("/");
  } else if (dArr[0] === "dir") {
  } else {
    totalSize += parseInt(dArr[0]);
    for (let k = 0; k < allPaths.length; k++) {
      if (values[allPaths[k]] !== undefined) {
        values[allPaths[k]] += parseInt(dArr[0]);
      } else {
        values[allPaths[k]] = parseInt(dArr[0]);
      }
    }
  }
}
let ans = 0;

console.log("total size = " + totalSize);
// console.log(values);

for (const [key, val] of Object.entries(values)) {
  if (val <= 100000) ans += val;
}
if (totalSize <= 100000) ans += totalSize;

// console.log(ans);

//1135465 is too low!, 1783610 is correct!

let orderedSizes = [];

for (const [key, val] of Object.entries(values)) {
  orderedSizes.push(val);
}

orderedSizes.sort((a, b) => a - b);

for (let i = 0; i < orderedSizes.length; i++) {
  console.log(orderedSizes[i]);
}


for (let i = 0; i < orderedSizes.length; i++) {
  if (orderedSizes[i] + (70000000 - totalSize) >= 30000000) {
    console.log(orderedSizes[i]);
    break;
  }
}

//26391313 is too high!
//14470980 is too high!
//11212301 is too high!
