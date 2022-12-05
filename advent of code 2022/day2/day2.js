const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  return contents.split(/\r?\n/);
}

let data = syncReadFile("day2/data.txt");

let score = 0;

function amountWonThisRound(them, me) {
  // console.log(them + " " + me);
  if (them === 'A') {
    if (me === 'X') {
      return 3 + 1;
    } else if (me === 'Y') {
      return 6 + 2;
    } else if (me === 'Z') {
      return 0 + 3;
    }
  } else if (them === 'B') {
    if (me === 'X') {
      return 0 + 1;
    } else if (me === 'Y') {
      return 3 + 2;
    } else if (me === 'Z') {
      return 6 + 3;
    }
  } else if (them === 'C') {
    if (me === 'X') {
      return 6 + 1;
    } else if (me === 'Y') {
      return 0 + 2;
    } else if (me === 'Z') {
      return 3 + 3;
    }
  }
  return 0;
}

for (let round of data) {
  score += amountWonThisRound(round[0], round[2]);
}
console.log(score);


let newScore = 0;
function amountWonPartTwo(them, me) {
  if (them === 'A') { //rock
    if (me === 'X') { //lose
      return 0 + 3;
    } else if (me === 'Y') { //draw
      return 3 + 1;
    } else if (me === 'Z') { //win
      return 6 + 2;
    }
  } else if (them === 'B') { //paper
    if (me === 'X') {
      return 0 + 1;
    } else if (me === 'Y') {
      return 3 + 2;
    } else if (me === 'Z') {
      return 6 + 3;
    }
  } else if (them === 'C') { //scissors
    if (me === 'X') {
      return 0 + 2;
    } else if (me === 'Y') {
      return 3 + 3;
    } else if (me === 'Z') {
      return 6 + 1;
    }
  }
  return 0;
}
for (let round of data) {
  newScore += amountWonPartTwo(round[0], round[2]);
}
console.log(newScore);