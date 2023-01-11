var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

const [N, M] = input[0].trim().split(" ").map(Number);
const map = input.slice(1, N + 1).map((el) => el.trim().split(" ").map(Number));

// 5:30
function solution(N, L, map) {
  let answer = 0;
  function rotate(matrix) {
    let newMatrix = Array(N)
      .fill(0)
      .map((el) => Array(N).fill(0));
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        newMatrix[x][N - y - 1] = matrix[y][x];
      }
    }
    return newMatrix;
  }

  let rotateMap = rotate(map);
  go(map);
  go(rotateMap);

  function go(matrix) {
    for (let y = 0; y < N; y++) {
      let isbuild = Array(N).fill(0);
      let boolean = true;
      let stack = 1;
      for (let x = 0; x < N - 1; x++) {
        let nowLevel = matrix[y][x];
        let nextLevel = matrix[y][x + 1];
        if (nowLevel === nextLevel) stack++;
        else if (nowLevel === nextLevel - 1) {
          if (isbuild[x] || stack < L) {
            boolean = false;
            break;
          }
          stack = 1;
        } else if (nowLevel === nextLevel + 1) {
          stack = 0;
          for (nx = x + 1; nx < N && nx <= x + L; nx++) {
            if (matrix[y][nx] === nextLevel) {
              stack++;
              isbuild[nx] = true;
            }
          }
          if (stack === L) {
            stack = 0;
            x = x + L - 1;
          } else {
            boolean = false;
            break;
          }
        } else {
          boolean = false;
          break;
        }
      }
      if (boolean) answer++;
    }
  }
  return answer;
}
console.log(solution(N, M, map));
