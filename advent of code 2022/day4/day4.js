const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  return contents.split(/\r?\n/);
}

let data = syncReadFile("day4/data.txt");

// console.log(data);

let ans = 0;

function oneContainsOther(a, b) {
  let aPartition = a.indexOf('-');
  let aStart = parseInt(a.substring(0, aPartition));
  let aEnd = parseInt(a.substring(aPartition + 1));

  let bPartition = b.indexOf('-');
  let bStart = parseInt(b.substring(0, bPartition));
  let bEnd = parseInt(b.substring(bPartition + 1));

  // console.log("one contains other a " + aStart + " " + aEnd);
  // console.log("one contains other b " + bStart + " " + bEnd);

  return (aStart <= bStart && aEnd >= bEnd) || (aStart >= bStart && aEnd <= bEnd);
}

for (let piece of data) {
  // console.log(piece);
  let piecePartition = piece.indexOf(',');
  // console.log(piecePartition);

  if (oneContainsOther(piece.substring(0, piecePartition), piece.substring(piecePartition + 1))) ans++;
}

// console.log(ans);


function oneContainsOtherPT2(a, b) {
  let aPartition = a.indexOf('-');
  let aStart = parseInt(a.substring(0, aPartition));
  let aEnd = parseInt(a.substring(aPartition + 1));

  let bPartition = b.indexOf('-');
  let bStart = parseInt(b.substring(0, bPartition));
  let bEnd = parseInt(b.substring(bPartition + 1));

  console.log("one contains other a " + aStart + " " + aEnd);
  console.log("one contains other b " + bStart + " " + bEnd);

  console.log((aEnd >= bStart) && (aStart <= bEnd));

  return (aEnd >= bStart) && (aStart <= bEnd);
}

ans = 0;

for (let piece of data) {
  console.log(piece);
  let piecePartition = piece.indexOf(',');
  console.log(piecePartition);

  if (oneContainsOtherPT2(piece.substring(0, piecePartition), piece.substring(piecePartition + 1))) ans++;
  console.log();
}

console.log(ans);