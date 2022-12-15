const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  return contents.split(/\r?\n/);
}

let data = syncReadFile("day15/data.txt");

console.log(data);

let sensorBeaconData = [
  // [2, 18], [2, 15]
]

let furthestLeft = 9999999999;
let furthestRight = -9999999999;
let furthestUp = 999999999;
let furthestDown = -9999999999;

for (let d of data) {
  let firstEquals = d.indexOf("=");
  let firstComa = d.indexOf(",", firstEquals);
  let secondEquals = d.indexOf("=", firstComa);
  let firstColon = d.indexOf(":", secondEquals);
  let thirdEquals = d.indexOf("=", firstColon);
  let secondComa = d.indexOf(",", thirdEquals);
  let fourthEquals = d.indexOf("=", secondComa);

  let sX = parseInt(d.substring(firstEquals + 1, firstComa));
  let sY = parseInt(d.substring(secondEquals + 1, firstColon));
  let bX = parseInt(d.substring(thirdEquals + 1, secondComa));
  let bY = parseInt(d.substring(fourthEquals + 1));

  furthestLeft = Math.min(furthestLeft, sX);
  furthestLeft = Math.min(furthestLeft, bX);

  furthestRight = Math.max(furthestRight, sX);
  furthestRight = Math.max(furthestRight, bX);

  furthestUp = Math.min(furthestUp, sY);
  furthestUp = Math.min(furthestUp, bY);

  furthestDown = Math.max(furthestDown, sY);
  furthestDown = Math.max(furthestDown, bY);



  sensorBeaconData.push([[sX, sY], [bX, bY]]);
}

furthestLeft -= 4;
furthestRight += 4;
furthestUp -= 4;
furthestDown += 4;

console.log(sensorBeaconData);
console.log(furthestLeft, furthestRight, furthestUp, furthestDown)

let tunnels = new Array((furthestDown - furthestUp) + 1).fill(null).map(() => Array((furthestRight - furthestLeft) + 1).fill('.'))

for (let sNb of sensorBeaconData) {
  console.log(sNb)
  console.log(sNb[0][1])
  console.log(tunnels[sNb[0][1] + furthestUp])
  console.log(furthestLeft, furthestRight, furthestUp, furthestDown)
  console.log(sNb[0][1] + furthestUp, sNb[0][0] + furthestLeft)
  console.log()
  tunnels[sNb[0][1] + furthestUp][sNb[0][0] + furthestLeft] = 'S';
  tunnels[sNb[1][1] + furthestUp][sNb[1][0] + furthestLeft] = 'B';
}

// let q = [];
// let current = [];
// let size = 0;
// for (let sNb of sensorBeaconData) {
//   q = [[sNb[0][1], sNb[0][0]]];

//   let foundBeacon = false;
//   let n = 0;
//   let beaconsFound = 0;
//   while (true) {
//     size = q.length;
//     foundBeacon = false;
//     for (let i = 0; i < size; i++) {
//       current = q.shift();
//       // console.log(current);

//       if (current[0] + 1 < tunnels.length) {
//         if (tunnels[current[0] + 1][x] === 'S') {

//         } else if (tunnels[current[0] + 1][x] === 'B') {
//           tunnels[current[0] + 1][x] = 'b';
//           foundBeacon = true;
//         } else {
//           tunnels[current[0] + 1][x] = '#';
//           q.push([current[0] + 1, x]);
//         }
//       }
//       if (current[0] - 1 >= 0) {
//         if (tunnels[current[0] - 1][x] === 'S') {

//         } else if (tunnels[current[0] - 1][x] === 'B') {
//           tunnels[current[0] - 1][x] = 'b';
//           foundBeacon = true;
//         } else {
//           tunnels[current[0] - 1][x] = '#';
//           q.push([current[0] - 1, x]);
//         }
//       }
//       if (x + 1 < tunnels[0].length) {
//         if (tunnels[current[0]][x + 1] === 'S') {

//         } else if (tunnels[current[0]][x + 1] === 'B') {
//           tunnels[current[0]][x + 1] = 'b';
//           foundBeacon = true;
//         } else {
//           tunnels[current[0]][x + 1] = '#';
//           q.push([current[0], x + 1]);
//         }
//       }
//       if (x - 1 < tunnels[0].length) {
//         if (tunnels[current[0]][x - 1] === 'S') {

//         } else if (tunnels[current[0]][x - 1] === 'B') {
//           tunnels[current[0]][x - 1] = 'b';
//           foundBeacon = true;
//         } else {
//           tunnels[current[0]][x - 1] = '#';
//           q.push([current[0], x - 1]);
//         }
//       }
//       // console.log(foundBeacon);
//     }
//     n++;
//     // console.log(n);
//     if (n === 2000) break;
//     if (foundBeacon) {
//       beaconsFound++;
//       console.log(beaconsFound);
//       for (let t of tunnels) console.log(t.join(""))
//       break;
//     }
//   }
// }



let q = [[7, 8 + furthestLeft]];
let foundBeacon = false;
let beaconsFound = 0;
let current;
let size;

let dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1]
];

while (true) {
  size = q.length;
  foundBeacon = false;
  for (let i = 0; i < size; i++) {
    current = q.shift();
    let y = current[0];
    let x = current[1];

    if (y + 1 < tunnels.length) {
      if (tunnels[y + 1][x] === '.') {
        tunnels[y + 1][x] = '#';
        q.push([y + 1, x]);
      } else if (tunnels[y + 1][x] === 'B') {
        tunnels[y + 1][x] = 'b';
        foundBeacon = true;
      }
    }
    if (y - 1 >= 0) {
      if (tunnels[y - 1][x] === '.') {
        tunnels[y - 1][x] = '#';
        q.push([y - 1, x]);
      } else if (tunnels[y - 1][x] === 'B') {
        tunnels[y - 1][x] = 'b';
        foundBeacon = true;
      }
    }
    if (x + 1 < tunnels[0].length) {
      if (tunnels[y][x + 1] === '.') {
        tunnels[y][x + 1] = '#';
        q.push([y, x + 1]);
      } else if (tunnels[y][x + 1] === 'B') {
        tunnels[y][x + 1] = 'b';
        foundBeacon = true;
      }
    }
    if (x - 1 < tunnels[0].length) {
      if (tunnels[y][x - 1] === '.') {
        tunnels[y][x - 1] = '#';
        q.push([y, x - 1]);
      } else if (tunnels[y][x - 1] === 'B') {
        tunnels[y][x - 1] = 'b';
        foundBeacon = true;
      }
    }
    // console.log(foundBeacon);
  }
  for (let t of tunnels) console.log(t.join(""))
  console.log();
  console.log(q);
  console.log();
  if (foundBeacon) {
    beaconsFound++;
    console.log(beaconsFound);

    break;
  }
}

// for (let t of tunnels) console.log(t.join(""))