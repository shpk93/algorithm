var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);
let [N, M] = input[0].split(" ").map(Number);
let board = input.slice(1, N + 1).map((el) => el.split(" ").map(Number));

function solution(N, M, board) {
  let visit = Array(N)
    .fill()
    .map((_) => Array(M).fill(0));

  let answer = [0, 0];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (board[y][x] === 1 && visit[y][x] === 0) {
        let size = bfs(y, x);
        answer[0]++;
        answer[1] = Math.max(answer[1], size);
      }
    }
  }

  return answer.join("\n");

  ///////
  function bfs(sy, sx) {
    let dy = [0, 0, -1, 1];
    let dx = [1, -1, 0, 0];
    let queue = [[sy, sx]];
    let size = 1;
    visit[sy][sx] = size++;
    while (queue.length) {
      let [y, x] = queue.shift();
      for (let i = 0; i < dx.length; i++) {
        let ny = y + dy[i];
        let nx = x + dx[i];
        if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
        if (board[ny][nx] === 1 && visit[ny][nx] === 0) {
          visit[ny][nx] = size++;
          queue.push([ny, nx]);
        }
      }
    }
    return size - 1;
  }
}

console.log(solution(N, M, board));
