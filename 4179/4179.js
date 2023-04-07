var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

let [R, C] = input[0].split(" ").map(Number);

let matrix = input.slice(1, R + 1);

function solution(R, C, matrix) {
  matrix = matrix.map((el) => el.split(""));

  let queue = [];
  let answer = "IMPOSSIBLE";

  for (let y = 0; y < R; y++) {
    for (let x = 0; x < C; x++) {
      if (matrix[y][x] === "F") queue.push([y, x, "F"]);
    }
  }
  for (let y = 0; y < R; y++) {
    for (let x = 0; x < C; x++) {
      if (matrix[y][x] === "J") {
        queue.push([y, x, "J", 0]);
        break;
      }
    }
  }

  while (queue.length) {
    bfs(...queue.shift());
  }

  function bfs(y, x, type, count) {
    let dx = [0, 0, -1, 1];
    let dy = [-1, 1, 0, 0];

    for (let i = 0; i < dx.length; i++) {
      let ny = y + dy[i];
      let nx = x + dx[i];

      if (type === "J") {
        if (ny < 0 || nx < 0 || ny >= R || nx >= C) {
          answer = count + 1;
          queue = [];
          return;
        }
        if (matrix[ny][nx] === ".") {
          matrix[ny][nx] = count + 1;
          queue.push([ny, nx, "J", count + 1]);
        }
      } else if (type === "F") {
        if (
          ny < 0 ||
          nx < 0 ||
          ny >= R ||
          nx >= C ||
          matrix[ny][nx] === "#" ||
          matrix[ny][nx] === "F"
        )
          continue;

        matrix[ny][nx] = "F";
        queue.push([ny, nx, "F"]);
      }
    }
  }
  return answer;
}

console.log(solution(R, C, matrix));
