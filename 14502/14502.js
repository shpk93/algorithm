var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

const [N, M] = input[0].split(" ").map(Number);
let matrix = input.slice(1, N + 1).map((el) => el.split(" ").map(Number));

function solution(matrix) {
  let answer = 0;
  let virusPos = [];
  let visit = Array(matrix.length)
    .fill(0)
    .map((el) => Array(matrix[0].length).fill(0));
  let dy = [0, 0, -1, 1];
  let dx = [1, -1, 0, 0];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      if (matrix[y][x] === 2) {
        virusPos.push([y, x]);
      }
    }
  }

  bulidWall(0, 0, 0);

  function countZero(matrix) {
    let count = 0;
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[0].length; x++) {
        if (matrix[y][x] === 0) count++;
      }
    }
    return count;
  }

  function bulidWall(y, x, count) {
    if (count === 3) {
      let copyMatrix = [];
      matrix.forEach((el) => copyMatrix.push(el.slice()));

      virusPos.forEach(([y, x]) => {
        dfs(y, x, copyMatrix);
      });
      let count = countZero(copyMatrix);
      answer = Math.max(count, answer);
      visit = Array(matrix.length)
        .fill(0)
        .map((el) => Array(matrix[0].length).fill(0));
      return;
    }

    for (let ny = y; ny < matrix.length; ny++) {
      for (let nx = x; nx < matrix[0].length; nx++) {
        if (matrix[ny][nx] === 0) {
          matrix[ny][nx] = 1;
          bulidWall(ny, nx, count + 1);
          matrix[ny][nx] = 0;
        }
      }
      x = 0;
    }
  }

  function dfs(y, x, matrix) {
    for (let i = 0; i < dx.length; i++) {
      let ny = y + dy[i];
      let nx = x + dx[i];

      if (ny < 0 || nx < 0 || ny >= matrix.length || nx >= matrix[0].length)
        continue;

      if (matrix[ny][nx] === 0 && visit[ny][nx] === 0) {
        matrix[ny][nx] = 2;
        visit[ny][x] = 1;
        dfs(ny, nx, matrix);
      }
    }
  }
  return answer;
}
console.log(solution(matrix));
