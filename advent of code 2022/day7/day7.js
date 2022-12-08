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

for (let i = 0; i < data.length; i++) {
  let dArr = data[i].split(" ");
  if (dArr[0] === "$") {
    if (dArr[1] === "cd") {
      if (dArr[2] === "/") {
        i += 2;
      } else if (dArr[2] === "..") {
        stack.pop();
      } else {
        stack.push(dArr[2]);
      }
    }
    path = "/" + stack.join("/");
  } else if (dArr[0] === "dir") {
  } else {
    totalSize += parseInt(dArr[0]);
    // for (let k = 0; k < stack.length; k++) {
    if (values[path] !== undefined) {
      values[path] += parseInt(dArr[0]);
    } else {
      values[path] = parseInt(dArr[0]);
    }
    // }
  }
}
let ans = 0;

console.log(totalSize);
console.log(values);

for (const [key, val] of Object.entries(values)) {
  if (val <= 100000) ans += val;
}
if (totalSize <= 100000) ans += totalSize;

console.log(ans);

//1135465 is too low!