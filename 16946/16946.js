var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

let [N, M] = input[0].split(" ").map(Number);
let matrix = [];
for (let i = 1; i <= N; i++) {
  matrix.push(input[i].split("").map(Number));
}

function solution(N, M, matrix) {
  if (N == 1 && M == 1) return matrix[N - 1][M - 1];
  let zeroId = 2;
  let movebox = {};

  let dx = [0, 0, -1, 1];
  let dy = [-1, 1, 0, 0];

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (matrix[y][x] === 0) {
        zerodfs(y, x);
      }
    }
  }

  let visit = Array(zeroId + 1).fill(0);

  let answer = Array(N)
    .fill()
    .map((_) => Array(M).fill(0));

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (matrix[y][x] === 1) {
        answer[y][x] = checkWallmove(y, x);
      } else answer[y][x] = 0;
    }
  }

  return answer.map((el) => el.join("")).join("\n");

  //
  function checkWallmove(y, x) {
    let count = 1;
    let arr = [];

    for (let i = 0; i < dy.length; i++) {
      let ny = y + dy[i];
      let nx = x + dx[i];
      if (!inRange(ny, nx) || matrix[ny][nx] === 1 || visit[matrix[ny][nx]])
        continue;
      count += movebox[matrix[ny][nx]];
      count %= 10;
      visit[matrix[ny][nx]] = 1;
      arr.push(matrix[ny][nx]);
    }

    arr.forEach((n) => (visit[n] = 0));
    return count;
  }

  function inRange(y, x) {
    return y >= 0 && x >= 0 && y < N && x < M;
  }

  function zerodfs(sy, sx) {
    let stack = [[sy, sx]];
    let move = 1;
    matrix[sy][sx] = zeroId;

    while (stack.length) {
      let [y, x] = stack.pop();
      for (let i = 0; i < dy.length; i++) {
        let ny = y + dy[i];
        let nx = x + dx[i];
        if (!inRange(ny, nx) || matrix[ny][nx]) continue;
        matrix[ny][nx] = zeroId;
        move++;
        move %= 10;
        stack.push([ny, nx]);
      }
    }

    movebox[zeroId] = move;
    zeroId++;
  }
}

console.log(solution(N, M, matrix));
