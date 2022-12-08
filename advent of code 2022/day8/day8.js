const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  return contents.split(/\r?\n/);
}

let data = syncReadFile("day8/data.txt");

let grid = [];

for (let i = 0; i < data.length; i++) {
  let curr = data[i].split("");
  let row = [];
  for (let j = 0; j < curr.length; j++) {
    row.push(parseInt(curr[j]));
  }
  grid.push(row);
}
// console.log(grid);

let perimeter = (grid.length * 2) + (grid[0].length * 2) - 4;

// console.log(perimeter);

let total = 0;

function down(grid, i, j, current) {
  for (let d = i + 1; d < grid.length; d++) {
    if (grid[d][j] >= current) return false;
  }
  return true;
}

function up(grid, i, j, current) {
  for (let u = i - 1; u >= 0; u--) {
    if (grid[u][j] >= current) return false;
  }
  return true;
}

function left(grid, i, j, current) {
  for (let l = j - 1; l >= 0; l--) {
    if (grid[i][l] >= current) return false;
  }
  return true;
}

function right(grid, i, j, current) {
  for (let r = j + 1; r < grid[i].length; r++) {
    if (grid[i][r] >= current) return false;
  }
  return true;
}

for (let i = 1; i < grid.length - 1; i++) {
  for (let j = 1; j < grid[i].length - 1; j++) {
    let current = grid[i][j];

    if (down(grid, i, j, current) || up(grid, i, j, current) || left(grid, i, j, current) || right(grid, i, j, current)) {
      // console.log(i + " " + j);
      total++;
    }
  }
}

// console.log(perimeter + total);

//PT 2

let maxScenery = 0;

function downPT2(grid, i, j, current) {
  let d;
  for (d = i + 1; d < grid.length; d++) {
    if (grid[d][j] >= current) break;
  }
  console.log("down", i, d);
  return Math.min(grid.length - 1, d) - i;
}

function upPT2(grid, i, j, current) {
  let u;
  for (u = i - 1; u >= 0; u--) {
    if (grid[u][j] >= current) break;
  }
  // console.log("up", i, u)
  return i - Math.max(0, u);
}

function leftPT2(grid, i, j, current) {
  let l;
  for (l = j - 1; l >= 0; l--) {
    if (grid[i][l] >= current) break;
  }
  // console.log("left", j, l);
  return j - Math.max(0, l);
}

function rightPT2(grid, i, j, current) {
  let r;
  for (r = j + 1; r < grid[i].length; r++) {
    if (grid[i][r] >= current) break;
  }
  // console.log("right", j, r);
  return Math.min(grid[i].length - 1, r) - j;
}

for (let i = 1; i < grid.length - 1; i++) {
  for (let j = 1; j < grid[i].length - 1; j++) {
    let current = grid[i][j];


    let u = upPT2(grid, i, j, current);
    let l = leftPT2(grid, i, j, current);
    let r = rightPT2(grid, i, j, current);
    let d = downPT2(grid, i, j, current);

    // console.log(i, j, u, l, r, d);

    maxScenery = Math.max(maxScenery, d * u * l * r);
  }
}

console.log("max scenery = " + maxScenery);