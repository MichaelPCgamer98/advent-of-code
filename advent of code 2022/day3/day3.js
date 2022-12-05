const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  return contents.split(/\r?\n/);
}

let data = syncReadFile("day3/data.txt");

// console.log(data);

let ans = 0;

function similarItem(items1, items2) {
  // console.log(items1 + " " + items2);
  let items1Set = new Set(items1);
  for (let item of items2) {
    if (items1Set.has(item)) return item;
  }
}

for (let item of data) {
  // console.log(item);
  let diff = similarItem(item.substring(0, item.length / 2), item.substring(item.length / 2, item.length));
  // console.log(diff);
  if (diff.toLowerCase() === diff) {
    // console.log(diff.charCodeAt(0));
    // console.log(0 + (diff.charCodeAt(0) - 96));
    ans += 0 + (diff.charCodeAt(0) - 96);
  } else {
    // console.log(diff.charCodeAt(0));
    // console.log(26 + (diff.charCodeAt(0) - 64));
    ans += 26 + (diff.charCodeAt(0) - 64);
  }
}

// console.log(ans);

function similarItemPT2(items1, items2, items3) {
  for (let i = 0; i < items1.length; i++) {
    for (let j = 0; j < items2.length; j++) {
      for (let k = 0; k < items3.length; k++) {
        if (items1[i] === items2[j] && items2[j] === items3[k]) return items1[i];
      }
    }
  }
}

let ans2 = 0;
for (let i = 0; i < data.length; i += 3) {
  let same = similarItemPT2(data[i], data[i + 1], data[i + 2]);

  if (same.toLowerCase() === same) {
    console.log(same.charCodeAt(0));
    console.log(0 + (same.charCodeAt(0) - 96));
    console.log();
    ans2 += 0 + (same.charCodeAt(0) - 96);
  } else {
    console.log(same.charCodeAt(0));
    console.log(26 + (same.charCodeAt(0) - 64));
    console.log();
    ans2 += 26 + (same.charCodeAt(0) - 64);
  }
}

console.log(ans2);