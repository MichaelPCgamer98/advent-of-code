const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  return contents.split(/\r?\n/);
}

let data = syncReadFile("day13/data.txt");

console.log(data);

let dataGroups = [];

for (let i = 0; i < data.length; i += 3) {
  let group = [];
  for (let j = i; j < i + 3; j++) {
    group.push(data[j]);
  }
  dataGroups.push(group);
}

console.log(dataGroups);

let pairs = [];

function oppositeBracket(data) {

}

function stringToIntArray(numsStrings) {
  console.log(numsStrings);
  return numsStrings.map(Number);
}

function eval(str) {
  // if (data.length === 2) return [];
  // if (data.length === 3) return [parseInt(data[1])];
  // if (data.indexOf(']', 1) === data.length - 1) {
  //   return stringToIntArray(data.substring(1, data.length - 1).split(","));
  // }


  // return data;
  return JSON.parse(str.replace(/\[/g, '[').replace(/\]/g, ']'));
}

for (let g of dataGroups) {
  let pair = [];
  pair.push(eval(g[0]));
  pair.push(eval(g[1]));
  pairs.push(pair);
}

console.log(pairs);

let ans = 0;

function compare(a, b) {
  if (a.length < b.length) return true;
  if (a.length > b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (typeof a[i] === 'number' && typeof b[i] === 'number') {
      if (a[i] < b[i]) return true;
      if (a[i] > b[i]) return false;
    } else if (Array.isArray(a[i]) && Array.isArray(b[i])) {
      return compare(a[i], b[i]);
    } else if (Array.isArray(a[i]) && typeof b[i] === 'number') {
      if (a[i].length < 1) return true;
      if (a[i].length === 1) {
        if (a[i][0] < b[i]) return true;
        if (a[i][0] > b[i]) return false;
      }
      return false;
    } else if (typeof a[i] === 'number' && Array.isArray(b[i])) {
      if (b[i].length < 1) return false;
      if (b[i].length === 1) {
        if (b[i][0] < a[i]) return false;
        if (b[i][0] > a[i]) return true;
      }
      return true;
    }
  }
  return true;
}

for (let i = 0; i < pairs.length; i++) {
  let top = pairs[i][0];
  let bottom = pairs[i][1];

  if (compare(top, bottom)) {
    console.log(i);
    ans += i;
  }
}

console.log(ans);