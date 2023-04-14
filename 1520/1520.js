var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

let [N, M] = input[0].split(" ").map(Number);
let matrix = input.slice(1, N + 1).map((el) => el.split(" ").map(Number));
function solution(N, M, matrix) {
  let memo = Array(N)
    .fill()
    .map((el) => Array(M).fill(-1));

  let dx = [0, 0, -1, 1];
  let dy = [-1, 1, 0, 0];

  memo[N - 1][M - 1] = 1;

  function dfs(y, x) {
    if (memo[y][x] !== -1) {
      return memo[y][x];
    }

    memo[y][x] = 0;
    for (let i = 0; i < 4; i++) {
      let ny = dy[i] + y;
      let nx = dx[i] + x;
      if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
      if (matrix[y][x] <= matrix[ny][nx]) continue;
      memo[y][x] += dfs(ny, nx);
    }
    return memo[y][x];
  }
  dfs(0, 0);

  return memo[0][0];
}

console.log(solution(N, M, matrix));
