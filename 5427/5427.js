var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

const testCaseNum = +input[0];
let target = 1;
let answer = "";
for (i = 0; i < testCaseNum; i++) {
  let [w, h] = input[target].split(" ").map(Number);
  let matrix = input
    .slice(target + 1, target + 1 + h)
    .map((el) => el.split(""));

  answer += solution(w, h, matrix) + "\n";
  target += h + 1;
}

console.log(answer);

function solution(w, h, matrix) {
  let dx = [0, 0, 1, -1];
  let dy = [1, -1, 0, 0];
  let queue = [];
  let start = [];
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (matrix[i][j] === "*") {
        queue.push([i, j, "*", 0]);
      }
      if (matrix[i][j] === "@") {
        start.push([i, j, "@", 0]);
      }
    }
  }
  queue.push(start[0]);

  while (queue.length) {
    let nq = [];
    for (let j = 0; j < queue.length; j++) {
      let [y, x, option, dist] = queue[j];
      for (let i = 0; i < dx.length; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) {
          if (option === "@") {
            return dist + 1;
          }
          continue;
        }
        if (matrix[ny][nx] === ".") {
          if (option === "*") {
            matrix[ny][nx] = "*";
          }
          if (option === "@") {
            matrix[ny][nx] = dist + 1;
          }
          nq.push([ny, nx, option, dist + 1]);
        }
      }
    }
    queue = nq;
  }
  return "IMPOSSIBLE";
}
