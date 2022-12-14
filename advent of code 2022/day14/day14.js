const { readFileSync, promises: fsPromises } = require('fs');
const fs = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  return contents.split(/\r?\n/);
}

let data = syncReadFile("day14/data.txt");

// console.log(data);

function parseString(str) {
  return str.split(' -> ').map(pair => pair.split(',').map(Number));
}

let rockRoutes = [];

for (let d of data) {
  rockRoutes.push(parseString(d));
}

console.log("routes");
// console.log(rockRoutes);

let furthestLeft = 500;
let furthestRight = 500;

let furthestUp = 800;
let furthestDown = 0;
for (let rockRoute of rockRoutes) {
  for (let point of rockRoute) {
    furthestLeft = Math.min(furthestLeft, point[0]);
    furthestRight = Math.max(furthestRight, point[0]);
    furthestUp = Math.min(furthestUp, point[1]);
    furthestDown = Math.max(furthestDown, point[1]);
  }
}

console.log(furthestLeft, furthestRight, furthestUp, furthestDown);

let cave = [];
for (let i = 0; i <= furthestDown + 5; i++) {
  cave.push(new Array(furthestRight - furthestLeft + 7).fill('.'));
}
cave[0][500 - furthestLeft + 3] = '+';

// console.log(cave);

for (let rockRoute of rockRoutes) {
  for (let i = 0; i < rockRoute.length - 1; i++) {
    let startX = rockRoute[i][0];
    let startY = rockRoute[i][1];
    let endX = rockRoute[i + 1][0];
    let endY = rockRoute[i + 1][1];

    if (startX === endX) {
      if (startY < endY) {
        for (let y = startY; y <= endY; y++) {
          // console.log(y + " " + startX + " " + cave[y][startX]);
          cave[y][startX - furthestLeft + 3] = '#';
        }
      } else if (startY > endY) {
        for (let y = startY; y >= endY; y--) {
          // console.log(y + " " + startX + " " + cave[y][startX]);
          cave[y][startX - furthestLeft + 3] = '#';
        }
      }
    } else {
      if (startX < endX) {
        for (let x = startX; x <= endX; x++) {
          // console.log(startY + " " + x + " " + cave[startY][x]);
          cave[startY][x - furthestLeft + 3] = '#';
        }
      } else if (startX > endX) {
        for (let x = startX; x >= endX; x--) {
          // console.log(startY + " " + x + " " + cave[startY][x]);
          cave[startY][x - furthestLeft + 3] = '#';
        }
      }
    }
  }
}



// making 1 large line below all rocks, so if a piece of sand hit it, we know we can stop
for (let i = furthestLeft - 2; i <= furthestRight + 2; i++) {
  cave[furthestDown + 2][i - furthestLeft + 3] = '-';
}

fs.truncateSync('day14/complete cave.txt', 0, err => {
  if (err) console.error(err);
});

let ans = 0;

while (true) {
  let sandY = 0;
  let sandX = 500 - furthestLeft + 3;
  let sandVoid = false;
  let explanation = "";
  let numZeros = 0;
  if (cave[sandY + 1][sandX] === '~') { //if the very first thing a new piece of sand hits is '~', we're done :)
    console.log("happened");
    break;
  }
  while (true) {
    //there are 2 stages to falling:
    //  freefall downwards until we hit either '-' (end), '~' (end), 'o' (sand, which we will navigate), and '#' (stop)
    //  navigate other sand
    // we will switch off between both until we hit '-' or '~' for EVERY piece of sand

    while (cave[sandY + 1][sandX] === '.') { //while there's nothing under us

      explanation += "we hit ., continuing ";
      sandY++;

      // cave[sandY][sandX] = 'g';
      // for (let c of cave) {
      //   fs.appendFileSync('day14/complete cave.txt', c.join("") + "\r\n", err => {
      //     if (err) console.error(err);
      //   })
      // }
      // cave[sandY][sandX] = '.';
      // fs.appendFileSync('day14/complete cave.txt', lilStep + " " + explanation + "\r\n\r\n", err => {
      //   if (err) console.error(err);
      // });
    }


    if ((new Set(['#', 'o']).has(cave[sandY + 1][sandX]))) {
      explanation += "we hit o, ";
      numZeros++;
      if (cave[sandY + 1][sandX - 1] === '~') {
        sandVoid = true;
        break;
      }
      if (cave[sandY + 1][sandX + 1] === '~') {
        sandVoid = true;
        break;
      }
      if (cave[sandY + 1][sandX - 1] === '.' && cave[sandY + 1][sandX - 1] !== '~') {
        explanation += "going left of o, ";
        sandY++;
        sandX--;
      } else if (cave[sandY + 1][sandX + 1] === '.' && cave[sandY + 1][sandX + 1] !== '~') {
        explanation += "going right of o, ";
        sandY++;
        sandX++;
      } else {
        break;
      }
      // cave[sandY][sandX] = 'g';
      // for (let c of cave) {
      //   fs.appendFileSync('day14/complete cave.txt', c.join("") + "\r\n", err => {
      //     if (err) console.error(err);
      //   })
      // }
      // cave[sandY][sandX] = '.';
      // fs.appendFileSync('day14/complete cave.txt', lilStep + " " + explanation + "\r\n\r\n", err => {
      //   if (err) console.error(err);
      // })
    }
    // cave[sandY][sandX] = 'g';
    // for (let c of cave) {
    //   fs.appendFileSync('day14/complete cave.txt', c.join("") + "\r\n", err => {
    //     if (err) console.error(err);
    //   })
    // }
    // cave[sandY][sandX] = '.';
    // fs.appendFileSync('day14/complete cave.txt', lilStep + " " + explanation + "num zeros hit = " + numZeros + "\r\n\r\n", err => {
    //   if (err) console.error(err);
    // })

    if (cave[sandY + 1][sandX] === '#') {
      if (cave[sandY + 1][sandX - 1] === '.' && cave[sandY + 1][sandX - 1] !== '~') {
        explanation += "going left of o, ";
        sandY++;
        sandX--;
      } else if (cave[sandY + 1][sandX + 1] === '.' && cave[sandY + 1][sandX + 1] !== '~') {
        explanation += "going right of o, ";
        sandY++;
        sandX++;
      } else if (cave[sandY + 1][sandX - 1] === '~' && cave[sandY][sandX - 1] === '.') {
        sandVoid = true;
        break;
      } else if (cave[sandY + 1][sandX + 1] === '~' && cave[sandY][sandX + 1] === '.') {
        sandVoid = true;
        break;
      } else break;
      // console.log(sandY, sandX);
      explanation += "we hit #, done";
    }

    if (new Set(['-', '~']).has(cave[sandY + 1][sandX])) {
      sandVoid = true;
      break;
    }
  }
  cave[sandY][sandX] = sandVoid ? '~' : 'o';
  if (!sandVoid) ans++;

  // for (let c of cave) {
  //   fs.appendFileSync('day14/complete cave.txt', c.join("") + "\r\n", err => {
  //     if (err) console.error(err);
  //   })
  // }
  // fs.appendFileSync('day14/complete cave.txt', lilStep + " " + explanation + "\r\n\r\n", err => {
  //   if (err) console.error(err);
  // })
  // if (curr === 100) break;
  // console.log(sandY);
}

console.log(ans);

// new Set(['-', '~']).has(cave[sandY+1][sandX])

// fs.truncateSync('day14/complete cave.txt', 0, err => {
//   if (err) console.error(err);
//   else {
for (let c of cave) {
  fs.appendFileSync('day14/complete cave.txt', c.join("") + "\r\n", err => {
    if (err) console.error(err);
  })
}
//   }
// })

// 1276 is too high!, 
