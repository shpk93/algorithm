var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);
let [N, M] = input[0].split(" ").map(Number);
let matrix = input.slice(1, N + 1).map((el) => el.split(" ").map(Number));

function solution(N, M, matrix) {
  //0은 빈칸,1은 벽,2는 바이러스위치

  let answer = Infinity;

  let virus = [];
  let zeroPos = [];
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      if (matrix[y][x] === 2) {
        virus.push([y, x]);
        matrix[y][x] = "*";
      } else if (matrix[y][x] === 1) {
        matrix[y][x] = "#";
      } else if (matrix[y][x] === 0) {
        zeroPos.push([y, x]);
      }
    }
  }

  if (zeroPos.length === 0) return 0;
  function getCombi(virusPos, index) {
    if (virusPos.length === M) {
      let copyMatrix = matrix.map((el) => el.slice());
      let queue = [];

      virusPos.forEach(([y, x]) => {
        copyMatrix[y][x] = 1;
        queue.push([y, x, 1]);
      });

      while (queue.length) {
        bfs(...queue.shift(), copyMatrix, queue);
      }

      let count = -1;
      for (let i = 0; i < zeroPos.length; i++) {
        let [y, x] = zeroPos[i];
        if (copyMatrix[y][x] === 0) {
          count = -1;
          break;
        }
        if (count < copyMatrix[y][x]) count = copyMatrix[y][x];
      }

      if (count !== -1) {
        answer = Math.min(answer, count - 1);
      }

      return;
    }

    for (let i = index; i < virus.length; i++) {
      virusPos.push(virus[i]);
      getCombi(virusPos, i + 1);
      virusPos.pop();
    }
  }
  getCombi([], 0);

  return answer === Infinity ? -1 : answer;

  function bfs(y, x, count, matrix, queue) {
    let dy = [0, 0, -1, 1];
    let dx = [1, -1, 0, 0];

    for (let i = 0; i < 4; i++) {
      let ny = dy[i] + y;
      let nx = dx[i] + x;

      if (ny < 0 || nx < 0 || ny >= N || nx >= N || matrix[ny][nx] === "#")
        continue;
      if (matrix[ny][nx] === 0 || matrix[ny][nx] === "*") {
        matrix[ny][nx] = count + 1;
        queue.push([ny, nx, count + 1]);
      }
    }
  }
}

console.log(solution(N, M, matrix));
