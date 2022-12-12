const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  return contents.split(/\r?\n/);
}

let data = syncReadFile("day12/data.txt");

console.log(data);

let grid = [];
let goal = [];
let start = [];

for (let i = 0; i < data.length; i++) {
  let gridRow = [];

  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] === 'S') {
      start = [i, j];
      gridRow.push(0);
    } else if (data[i][j] === 'E') {
      goal = [i, j];
      gridRow.push(-2);
    } else {
      gridRow.push(data[i][j].charCodeAt(0) - 96);
    }
  }
  grid.push(gridRow);
}

console.log(grid);

let ans = grid.length * grid[0].length;

function dfs(grid, i, j, prevVal, steps) {
  if (i < grid.length && i >= 0 && j < grid[0].length && j >= 0) {
    console.log("previous val = " + prevVal + ", currVal = " + grid[i][j]);
    if (i === goal[0] && j === goal[1]) {
      ans = Math.min(ans, steps);
      console.log(grid);
    } else if (grid[i][j] >= 0 && grid[i][j] <= prevVal + 1) {
      console.log("actually moving " + steps);
      let temp = grid[i][j];
      grid[i][j] = 0;

      dfs(grid, i - 1, j, grid[i][j], steps + 1);
      dfs(grid, i + 1, j, grid[i][j], steps + 1);
      dfs(grid, i, j - 1, grid[i][j], steps + 1);
      dfs(grid, i, j + 1, grid[i][j], steps + 1);

      grid[i][j] = temp;
    }
  }
}
dfs(grid, start[0], start[1], 0, 0);
console.log(ans);
console.log(grid);