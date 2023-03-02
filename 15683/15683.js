var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

let [N, M] = input[0].split(" ").map(Number);
let map = input.slice(1, N + 1).map((el) => el.split(" ").map(Number));

function solution(N, M, map) {
  let cameraCount = 0;
  let cameraArr = [];
  let newMatrix = Array(N)
    .fill(0)
    .map((el) => Array(M).fill(0));

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (map[y][x] !== 0 && map[y][x] !== 6) {
        cameraCount++;
        cameraArr.push([y, x, map[y][x] - 1]);
      }
      if (map[y][x] === 6) {
        newMatrix[y][x] = 6;
      }
    }
  }

  let answer = N * M;
  let dy = [-1, 0, 1, 0];
  let dx = [0, 1, 0, -1];

  let cameraDir = [[1], [1, 3], [0, 1], [0, 1, 3], [0, 1, 2, 3]];

  function draw(y, x, cameraNumber, dir, matrix) {
    matrix[y][x] = "#";
    let camera = cameraDir[cameraNumber];
    camera.forEach((arrow) => {
      let ny = y;
      let nx = x;
      arrow = (arrow + dir) % 4;
      while (true) {
        ny = ny + dy[arrow];
        nx = nx + dx[arrow];
        if (nx < 0 || ny < 0 || ny >= N || nx >= M) break;
        if (map[ny][nx] === 6) {
          matrix[ny][nx] = 6;
          break;
        }
        matrix[ny][nx] = "#";
      }
    });
  }

  function backtracking(index, arr) {
    if (arr.length === cameraCount) {
      let copyMatrix = newMatrix.map((el) => el.slice());
      arr.forEach(([y, x, cameraNumber, dir]) => {
        draw(y, x, cameraNumber, dir, copyMatrix);
      });
      let count = 0;
      for (let y = 0; y < N; y++) {
        for (let x = 0; x < M; x++) {
          if (copyMatrix[y][x] === 0) count++;
        }
      }
      answer = Math.min(count, answer);
      return;
    }
    for (let i = index; i < cameraArr.length; i++) {
      for (let j = 0; j < 4; j++) {
        arr.push([...cameraArr[i], j]);
        backtracking(i + 1, arr);
        arr.pop();
      }
    }
  }
  backtracking(0, []);

  return answer;
}

console.log(solution(N, M, map));
