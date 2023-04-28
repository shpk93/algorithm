var fs = require("fs");
var path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .split(splitStr);
const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1, M + 1).map((el) => el.split(" ").map(Number));

function solution(N, M, board) {
  const startPoints = [];
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === 1) startPoints.push([y, x]);
    }
  }
  let ans = 0;

  bfs(startPoints);

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === 0) return -1;
    }
  }

  return ans - 1;

  //
  function bfs(startPoints) {
    let queue = [...startPoints];
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];

    while (queue.length) {
      let nq = [];
      for (let j = 0; j < queue.length; j++) {
        const [y, x] = queue[j];
        for (let i = 0; i < dx.length; i++) {
          const [ny, nx] = [y + dy[i], x + dx[i]];
          if (ny >= 0 && nx >= 0 && ny < M && nx < N) {
            if (board[ny][nx] === 0) {
              board[ny][nx] = board[y][x] + 1;
              nq.push([ny, nx]);
            }
          }
        }
      }
      queue = nq;
      ans++;
    }
  }
}

console.log(solution(N, M, board));
