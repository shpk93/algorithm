var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

let [N, M, K] = input[0].split(" ").map(Number);

let matrix = Array.from({ length: N }, () => Array(M).fill(0));
let stikerbox = [];

for (let i = 1; i < input.length; i++) {
  let [r, c] = input[i].split(" ").map(Number);
  let stiker = [];

  for (let j = i + 1; j < i + r + 1; j++) {
    stiker.push(input[j].split(" ").map(Number));
  }
  stikerbox.push(stiker);
  i = i + r;
}

function solution(matrix, stikerbox) {
  let answer = 0;
  stikerbox = stikerbox.reverse();

  while (stikerbox.length) {
    go(0);
  }

  function check(y, x, stiker) {
    if (
      stiker.length + y > matrix.length ||
      stiker[0].length + x > matrix[0].length
    ) {
      return false;
    }

    for (let cy = y; cy < stiker.length + y; cy++) {
      for (let cx = x; cx < stiker[0].length + x; cx++) {
        if (matrix[cy][cx] === 1 && stiker[cy - y][cx - x] !== 0) {
          return false;
        }
      }
    }
    return true;
  }

  function write(y, x, stiker) {
    for (let wy = y; wy < stiker.length + y; wy++) {
      for (let wx = x; wx < stiker[0].length + x; wx++) {
        if (stiker[wy - y][wx - x] === 1)
          matrix[wy][wx] = stiker[wy - y][wx - x];
      }
    }
  }
  function rotate(stiker) {
    let r = stiker.length;
    let c = stiker[0].length;

    let newStiker = Array.from({ length: c }, () => Array(r).fill(0));
    if (newStiker.length === 0) newStiker.push([]);
    for (let y = 0; y < r; y++) {
      for (let x = 0; x < c; x++) {
        newStiker[x][r - y - 1] = stiker[y][x];
      }
    }
    stikerbox[stikerbox.length - 1] = newStiker;

    return newStiker;
  }

  function go(rotateCount) {
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[0].length; x++) {
        let boolean = check(y, x, stikerbox[stikerbox.length - 1]);
        if (boolean) {
          write(y, x, stikerbox[stikerbox.length - 1]);
          stikerbox.pop();
          return;
        }
      }
    }
    if (rotateCount < 3) {
      rotate(stikerbox[stikerbox.length - 1]);
      go(rotateCount + 1);
    } else stikerbox.pop();
  }

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      if (matrix[y][x] === 1) answer++;
    }
  }

  return answer;
}

console.log(solution(matrix, stikerbox));
