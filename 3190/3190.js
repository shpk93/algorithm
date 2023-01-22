var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

let N = +input[0];
let K = +input[1];
let apples = [];
for (let i = 2; i < K + 2; i++) {
  apples.push(input[i].split(" ").map(Number));
}
let L = +input[apples.length + 2];
let snakeDirs = [];
for (let i = apples.length + 3; i < apples.length + L + 3; i++) {
  snakeDirs.push(
    input[i].split(" ").map((el) => {
      if (Number(el)) {
        return +el;
      }
      return el;
    })
  );
}
function solution(N, apples, snakeDirs) {
  // 동남서북
  let dy = [0, 1, 0, -1];
  let dx = [1, 0, -1, 0];

  let matrix = Array(N)
    .fill(0)
    .map((_) => Array(N).fill(0));

  apples.forEach(([y, x]) => {
    matrix[y - 1][x - 1] = "A";
  });

  matrix[0][0] = 1;
  let movepos = [[0, 0]];
  let moveIndex = 0;
  let hash = {};

  snakeDirs.forEach(([time, dir]) => {
    hash[time] = dir;
  });

  function travel(y, x, dir, time) {
    let ny = y + dy[dir];
    let nx = x + dx[dir];
    if (ny < 0 || nx < 0 || ny >= N || nx >= N || matrix[ny][nx] === 1) {
      return time + 1;
    }
    if (matrix[ny][nx] === "A") {
      matrix[ny][nx] = 1;
    } else {
      matrix[ny][nx] = 1;
      matrix[movepos[moveIndex][0]][movepos[moveIndex][1]] = 0;
      moveIndex++;
    }
    movepos.push([ny, nx]);
    if (hash[time + 1]) {
      if (hash[time + 1] === "L") {
        dir--;
      } else dir++;

      if (dir < 0) dir = 3;
      if (dir >= 4) dir = 0;
    }

    return travel(ny, nx, dir, time + 1);
  }

  return travel(0, 0, 0, 0);
}

console.log(solution(N, apples, snakeDirs));
