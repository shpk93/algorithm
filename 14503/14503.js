var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

let [N, M] = input[0].split(" ").map(Number);
let [startY, startX, dir] = input[1].split(" ").map(Number);
let map = [];
for (let i = 2; i < N + 2; i++) {
  map.push(input[i].split(" ").map(Number));
}
function solution(N, M, startY, startX, dir, map) {
  let dy = [
    [-1, 0, 1, 0, -1],
    [0, -1, 0, 1, 0],
    [1, 0, -1, 0, 1],
    [0, 1, 0, -1, 0],
  ];

  let dx = [
    [0, -1, 0, 1, 0],
    [1, 0, -1, 0, 1],
    [0, 1, 0, -1, 0],
    [-1, 0, 1, 0, -1],
  ];

  let beforeCount = getCount(map);
  travel(startY, startX, dir, map);
  let afterCount = getCount(map);

  function getCount(map) {
    let count = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (map[i][j] === 0) count++;
      }
    }
    return count;
  }

  function travel(y, x, dir, map) {
    map[y][x] = 2;
    let newdir = dir;

    for (let i = 1; i < dx[0].length; i++) {
      let ny = y + dy[dir][i];
      let nx = x + dx[dir][i];
      newdir--;
      if (newdir < 0) newdir = 3;
      if (ny < 0 || nx < 0 || ny >= N || nx >= M || map[ny][nx] !== 0) {
        continue;
      }
      return travel(ny, nx, newdir, map);
    }
    let ny = y - dy[dir][0];
    let nx = x - dx[dir][0];
    if (!(ny < 0 || nx < 0 || ny >= N || nx >= M || map[ny][nx] === 1)) {
      return travel(ny, nx, dir, map);
    }
  }
  return beforeCount - afterCount;
}

console.log(solution(N, M, startY, startX, dir, map));
