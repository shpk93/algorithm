var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

const [N, M, H] = input[0].split(" ").map(Number);
const rows = input.slice(1, M + 1).map((el) => el.split(" ").map(Number));

function solution(N, M, H, rows) {
  let answer = Infinity;
  let matrix = Array.from({ length: H }, () => Array(N).fill(0));

  rows.forEach(([y, x]) => {
    matrix[y - 1][x - 1] = 2;
    matrix[y - 1][x] = 1;
  });

  function move(matrix) {
    for (let x = 0; x < N; x++) {
      let nowX = x;
      for (let y = 0; y < H; y++) {
        if (matrix[y][nowX] === 1) {
          nowX--;
        } else if (matrix[y][nowX] === 2) {
          nowX++;
        }
      }
      if (nowX !== x) return false;
    }
    return true;
  }

  go(0, 0, matrix, 0);
  function go(Y, X, matrix, count) {
    if (count === 3) {
      let check = move(matrix);
      if (check) {
        answer = Math.min(count, answer);
        return;
      }
      return;
    }

    for (let y = Y; y < matrix.length; y++) {
      for (let x = X; x < matrix[0].length - 1; x++) {
        if (matrix[y][x] === 0 && matrix[y][x + 1] === 0) {
          matrix[y][x] = 2;
          matrix[y][x + 1] = 1;
          let ny = y;
          let nx = x + 2;
          if (nx >= matrix[0].length) {
            ny++;
            nx -= matrix[0].length;
          }
          go(ny, nx, matrix, count + 1);
          matrix[y][x] = 0;
          matrix[y][x + 1] = 0;
        }
      }
      X = 0;
    }
    let check = move(matrix);
    if (check) {
      answer = Math.min(count, answer);
      return;
    }
  }
  return answer === Infinity ? -1 : answer;
}
console.log(solution(N, M, H, rows));
