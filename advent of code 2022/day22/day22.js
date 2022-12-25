const { readFileSync, promises: fsPromises } = require('fs');
const acorn = require('acorn');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  return contents.split(/\r?\n/);
}

let data = syncReadFile("day22/data.txt");

// console.log(data);

let map = [];

let maxWidth = 0;

for (let i = 0; i < data.length; i++) {
  map.push(data[i].split(""));
  maxWidth = Math.max(maxWidth, data[i].length);
}

console.log(map);

let moveData = "10R5L5R10L4R5L5";
let num = "";
let moves = [];

for (let i = 0; i < moveData.length; i++) {
  if (new Set(['L', 'R']).has(moveData[i])) {
    moves.push(num);
    num = "";
    moves.push(moveData[i]);
  } else {
    num += moveData[i];
  }
}

console.log(moves);

let dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0]
];

let rowWalls = [];
let rowWall = [];

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if ((map[i][j] === '#' || map[i][j] === '.') && (j === 0 || map[i][j - 1] === ' ')) {
      rowWall.push(j);
    } else if ((map[i][j] === '#' || map[i][j] === '.') && (j === map[i].length - 1 || map[i][j + 1] === ' ')) {
      rowWall.push(j);
      rowWalls.push(rowWall);
      rowWall = [];
    }
  }
}

console.log(rowWalls);

let colWalls = [];
let colWall = [];

for (let j = 0; j < maxWidth; j++) {
  for (let i = 0; i < map.length; i++) {
    if ((map[i][j] === '#' || map[i][j] === '.') && (i === 0 || map[i - 1][j] === ' ' || map[i - 1].length <= j)) {
      // console.log("start", i, j);
      colWall.push(i);
    } else if ((map[i][j] === '#' || map[i][j] === '.') && (i === map.length - 1 || map[i + 1][j] === ' ' || map[i - 1].length <= j)) {
      // console.log("end", i, j);
      colWall.push(i);
      colWalls.push(colWall);
      colWall = [];
    }
  }
}


console.log(colWalls);

let currDir = 0;

let pos = [0, data[0].indexOf(".")];

console.log(pos);

let flag = true;

let low = 0;
let high = 0;
let mid = 0;

for (let i = 0; i < moves.length; i++) {
  if (flag) { //stepping
    let steps = parseInt(moves[i]);

    for (let j = 0; j < steps; j++) {
      // console.log(map[pos[0 + dirs[currDir][0]]][pos[1 + dirs[currDir][1]]]);
      if (currDir === 0) { //going right

        // this needs to be copied 3 more times (for the other 3 directions)
        if (map[pos[0]][pos[1] + 1] === '.') {
          pos[1] += 1;
        } else if (map[pos[0]][pos[1] + 1] === ' ') { //binary search rowWalls for the "lane" you need
          low = 0;
          high = rowWalls.length;
          while (low < high) {
            mid = low + Math.floor((low - high) / 2);
            if (rowWalls[mid][1] > pos[1]) {
              high = mid - 1;
            } else if (rowWalls[mid[1]] < pos[1]) {
              low = mid + 1;
            } else {
              break;
            }
          }
          if (rowWalls[mid][0] !== '#') {
            pos[1] = rowWalls[mid][0];
          } else break;
        }


      }
      if (map[pos[0 + dirs[currDir][0]]][pos[1 + dirs[currDir][1]]] === '.') {
        pos[0] += dirs[currDir][0];
        pos[1] += dirs[currDir][1];
      }
      map[pos[0]][pos[1]] = 'P';
      // console.log(pos);
      for (let m of map) {
        // console.log(m.join(""));
      }
      // console.log();
      map[pos[0]][pos[1]] = '.';
    }
  } else { //turning
    currDir += 1;
    currDir %= dirs.length;
  }
  flag = !flag;
}

console.log(pos);