var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

const N = +input[0];
const matrix = [];
for (let i = 1; i < N + 1; i++) {
  matrix.push(input[i].split(" ").map(Number));
}

function solution(N, matrix) {
  let isUsed = Array(2 * N + 1).fill(0); // 같은 대각선에 사용하고있는지 판단
  let isUsed2 = Array(2 * N + 1).fill(0);

  let bishop = []; // 검은색타일
  let bishop2 = []; // 흰색타일
  let answer = 0;
  let answer2 = 0;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (matrix[y][x] === 1) {
        if (y % 2 === 0) {
          if (x % 2 === 0) {
            bishop.push([y, x]);
          } else bishop2.push([y, x]);
        } else {
          if (x % 2 === 1) {
            bishop.push([y, x]);
          } else bishop2.push([y, x]);
        }
      }
    }
  }

  function rec(start, count, bishop, type) {
    if (start >= bishop.length) {
      if (type === "b") answer = Math.max(count, answer);
      else answer2 = Math.max(count, answer2);
      return;
    }

    for (let i = start; i < bishop.length; i++) {
      let [y, x] = bishop[i];
      if (isUsed[x + y]) continue;
      if (isUsed2[x - y + N + 1]) continue;

      isUsed[x + y] = 1;
      isUsed2[x - y + N + 1] = 1;
      rec(i + 1, count + 1, bishop, type);
      isUsed[x + y] = 0;
      isUsed2[x - y + N + 1] = 0;
    }
  }

  rec(0, 0, bishop, "b");
  rec(0, 0, bishop2, "w");
  return answer + answer2;
}

console.log(solution(N, matrix));
