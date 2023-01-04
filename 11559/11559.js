var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs
  .readFileSync(filepath)
  .toString()
  .trim()
  .split(splitStr)
  .map((_) => _.split(""));

function solution(input) {
  let answer = 0;

  while (true) {
    let boomCount = boom(input);
    if (boomCount) {
      answer++;

      move(input);
    } else {
      break;
    }
  }
  return answer;
}

function boom(matrix) {
  let count = 0;
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      if (matrix[y][x] !== ".") {
        let visit = {};

        dfs(matrix, y, x, visit, matrix[y][x]);
        let arr = Object.values(visit);
        if (arr.length >= 4) {
          while (arr.length) {
            let [ny, nx] = arr.pop();
            matrix[ny][nx] = ".";
          }
          count++;
        }
      }
    }
  }
  return count;
}
function dfs(matrix, starty, startx, visit, target) {
  let dx = [0, 0, -1, 1];
  let dy = [1, -1, 0, 0];

  for (let i = 0; i < dy.length; i++) {
    let ny = starty + dy[i];
    let nx = startx + dx[i];
    if (ny < 0 || nx < 0 || ny >= matrix.length || nx >= matrix[0].length)
      continue;
    if (
      matrix[ny][nx] === target &&
      !visit[target + String(ny) + "," + "x" + String(nx)]
    ) {
      visit[target + String(ny) + "," + "x" + String(nx)] = [ny, nx];
      dfs(matrix, ny, nx, visit, target);
    }
  }
}

function move(matrix) {
  let count = 0;
  for (let y = matrix.length - 1; y > 0; y--) {
    for (let x = 0; x < matrix[0].length; x++) {
      let top = matrix[y - 1][x];
      let now = matrix[y][x];
      if (now === "." && top !== ".") {
        let ny = y;
        while (ny < matrix.length - 1) {
          if (matrix[ny + 1][x] === ".") {
            ny++;
          } else break;
        }
        [matrix[ny][x], matrix[y - 1][x]] = [matrix[y - 1][x], matrix[ny][x]];
      }
    }
  }
  return count;
}

console.log(solution(input));
