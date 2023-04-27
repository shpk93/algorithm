const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "win32" ? "\r\n" : "\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .split(splitStr);

const N = +input[0];
const map = input.slice(1, 1 + N);

function solution(N, map) {
  map.forEach((el, i) => (map[i] = el.split(" ").map(Number)));
  let dy = [0, 0, -1, 1];
  let dx = [1, -1, 0, 0];
  let answer = Infinity;

  labelIsland();
  getDistanceBfs();

  return answer;

  // 예외처리 함수
  function inRange(y, x) {
    return y >= 0 && x >= 0 && y < N && x < N;
  }

  // 섬들의 최단거리를 구하는 함수
  function getDistanceBfs() {
    let visit = Array(N)
      .fill()
      .map((_) => Array(N).fill(-1));
    let queue = [];
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if (map[y][x] !== 0) {
          queue.push([y, x, map[y][x]]);
          visit[y][x] = 0;
        }
      }
    }

    while (queue.length) {
      let [y, x, id] = queue.shift();
      for (let i = 0; i < 4; i++) {
        let ny = y + dy[i];
        let nx = x + dx[i];
        if (!inRange(ny, nx)) continue;
        if (map[ny][nx] === 0) {
          map[ny][nx] = id;
          visit[ny][nx] = visit[y][x] + 1;
          queue.push([ny, nx, id]);
        } else if (map[ny][nx] !== id) {
          answer = Math.min(answer, visit[y][x] + visit[ny][nx]);
        }
      }
    }
  }

  // 각 섬들을 라벨링하는 함수
  function labelIsland() {
    let labelId = 2;
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if (map[y][x] === 1) {
          labelDfs(y, x, labelId);
          labelId++;
        }
      }
    }
  }

  //해당 섬과 연결된 곳에 id값 부여
  function labelDfs(sy, sx, id) {
    let stack = [[sy, sx]];
    map[sy][sx] = id;
    while (stack.length) {
      let [y, x] = stack.pop();
      for (let i = 0; i < 4; i++) {
        let ny = y + dy[i];
        let nx = x + dx[i];
        if (!inRange(ny, nx) || map[ny][nx] === 0 || map[ny][nx] === id)
          continue;
        map[ny][nx] = id;
        stack.push([ny, nx]);
      }
    }
  }
}

console.log(solution(N, map));
