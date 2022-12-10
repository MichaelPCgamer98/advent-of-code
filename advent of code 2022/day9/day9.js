const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  return contents.split(/\r?\n/);
}

let data = syncReadFile("day9/data.txt");

//quick note about the complete route txt file. only the final 'drawing' is correct (and incomplete, the whole thing's too large).  the first ones are results of an incorrect algorithm (but still cool to look at :) )

console.log(data);

let tail = [0, 0];
let head = [0, 0];

let dirs = {
  R: [0, 1],
  L: [0, -1],
  U: [-1, 0],
  D: [1, 0]
}

let minHeadX = 1000;
let minHeadY = 1000;
let maxHeadX = -1000;
let maxHeadY = -1000;

let positions = new Set();
positions.add("0|0")

function headTooFar(head, tail) {
  for (let i = tail[0] - 1; i <= tail[0] + 1; i++) {
    for (let j = tail[1] - 1; j <= tail[1] + 1; j++) {
      if (head[0] === i && head[1] === j) return false;
    }
  }
  return true;
}

/*
HHHHH
H...H
H.T.H
H...H
HHHHH*/
function moveTail(head, tail) {
  if (head[0] === tail[0]) {
    if (head[1] > tail[1]) {
      tail[1]++;
      // console.log("right");
    } else {
      tail[1]--;
      // console.log("left");
    }
  } else if (head[1] === tail[1]) {
    if (head[0] > tail[0]) {
      tail[0]++;
      // console.log("down");
    } else {
      tail[0]--;
      // console.log("up");
    }
  } else if (head[0] < tail[0]) {
    if (head[1] > tail[1]) { //up right
      tail[0]--;
      tail[1]++;
      // console.log("up right");
    } else if (head[1] < tail[1]) {
      tail[0]--;
      tail[1]--;
      // console.log("up left");
    }
  } else if (head[0] > tail[0]) {
    if (head[1] > tail[1]) {
      tail[0]++;
      tail[1]++;
      // console.log("down right");
    } else if (head[1] < tail[1]) {
      tail[0]++;
      tail[1]--;
      // console.log("down left");
    }
  }
  if (!positions.has(tail[0] + "|" + tail[1])) {
    positions.add(tail[0] + "|" + tail[1]);
  }

  // console.log(positions);
}

function print() {
  for (var i = minHeadY; i <= maxHeadY; i++) {
    let row = [];
    for (var j = minHeadX; j <= maxHeadX; j++) {
      if (i === 0 && j === 0) {
        row.push("0");
      } else if (i === head[0] && j === head[1]) {
        row.push("H"); //H
      } else if (i === tail[0] && j === tail[1]) {
        row.push("T"); //T
      } else if (positions.has(i + "|" + j)) {
        row.push("#");
      } else if (i === 0 && j === 0) {
        row.push("s");
      } else {
        row.push(".");
      }
    }
    console.log(row.join(""));
  }

}

for (let d of data) {
  let dArr = d.split(" ");
  let dir = dArr[0];
  let c = parseInt(dArr[1]);

  for (let i = 1; i <= c; i++) {
    head[0] -= dirs[dir][0];
    head[1] += dirs[dir][1];

    minHeadX = Math.min(minHeadX, head[1]);
    minHeadY = Math.min(minHeadY, head[0]);
    maxHeadX = Math.max(maxHeadX, head[1]);
    maxHeadY = Math.max(maxHeadY, head[0]);
    // console.log("head " + head);

    if (headTooFar(head, tail)) {
      // console.log("head too far");
      moveTail(head, tail);
    }
    // console.log("tail " + tail);
    // print();
    // console.log();
  }

}
print();
// console.log(minHeadX);
// console.log(minHeadY);
// console.log(maxHeadX);
// console.log(maxHeadY);
console.log("ans = " + positions.size);

//3262 is too low!, 6522 is correct!



//PT2

let rope = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];

positions = new Set();
positions.add("0|0");

function headTooFarPT2(head, tail) {
  for (let i = tail[0] - 1; i <= tail[0] + 1; i++) {
    for (let j = tail[1] - 1; j <= tail[1] + 1; j++) {
      if (head[0] === i && head[1] === j) return false;
    }
  }
  return true;
}

function moveTailPT2(head, tail, indexOfTail) {
  if (head[0] === tail[0]) {
    if (head[1] > tail[1]) {
      tail[1]++;
      // console.log("right");
    } else {
      tail[1]--;
      // console.log("left");
    }
  } else if (head[1] === tail[1]) {
    if (head[0] > tail[0]) {
      tail[0]++;
      // console.log("down");
    } else {
      tail[0]--;
      // console.log("up");
    }
  } else if (head[0] < tail[0]) {
    if (head[1] > tail[1]) { //up right
      tail[0]--;
      tail[1]++;
      // console.log("up right");
    } else if (head[1] < tail[1]) {
      tail[0]--;
      tail[1]--;
      // console.log("up left");
    }
  } else if (head[0] > tail[0]) {
    if (head[1] > tail[1]) {
      tail[0]++;
      tail[1]++;
      // console.log("down right");
    } else if (head[1] < tail[1]) {
      tail[0]++;
      tail[1]--;
      // console.log("down left");
    }
  }
  if (!positions.has(tail[0] + "|" + tail[1]) && indexOfTail === 0) {
    positions.add(tail[0] + "|" + tail[1]);
  }
  // console.log(positions);
}

for (let d of data) {
  let dArr = d.split(" ");
  let dir = dArr[0];
  let c = parseInt(dArr[1]);

  for (let i = 1; i <= c; i++) {
    rope[9][0] -= dirs[dir][0];
    rope[9][1] += dirs[dir][1];

    // minHeadX = Math.min(minHeadX, head[1]);
    // minHeadY = Math.min(minHeadY, head[0]);
    // maxHeadX = Math.max(maxHeadX, head[1]);
    // maxHeadY = Math.max(maxHeadY, head[0]);
    // console.log("head " + head);

    for (let j = 9; j >= 1; j--) {
      if (headTooFarPT2(rope[j], rope[j - 1])) {
        // console.log("head too far");
        moveTailPT2(rope[j], rope[j - 1], j - 1);
      }
    }
    // console.log("tail " + tail);
    // print();
    // console.log();
  }
}

console.log(positions.size);

// 14208 is too high!, 2717 is correct!
