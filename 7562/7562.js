var fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform !== "win32" ? "\n" : "\r\n";
var input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .split(splitStr);

let T = +input[0];

for (let i = 1; i <= 3 * T; i += 3) {
  let N = +input[i];
  let startPos = input[i + 1].split(" ").map(Number);
  let endPos = input[i + 2].split(" ").map(Number);
  console.log(solution(N, startPos, endPos));
}

function solution(N, startPos, endPos) {
  if (startPos[0] === endPos[0] && startPos[1] === endPos[1]) return 0;
  let board = Array(N)
    .fill(0)
    .map((_) => Array(N).fill(0));

  let dy = [-2, -1, -2, -1, 1, 2, 2, 1];
  let dx = [-1, -2, 1, 2, 2, 1, -1, -2];

  let queue = [startPos];
  board[startPos[0]][startPos[1]] = 1;

  while (queue.length) {
    let [y, x] = queue.shift();

    for (let i = 0; i < dx.length; i++) {
      let ny = y + dy[i];
      let nx = x + dx[i];
      if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
      if (board[ny][nx] !== 0) continue;
      board[ny][nx] = board[y][x] + 1;
      if (ny === endPos[0] && nx === endPos[1]) return board[ny][nx] - 1;
      queue.push([ny, nx]);
    }
  }
}
