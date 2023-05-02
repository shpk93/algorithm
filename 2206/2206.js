const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform !== "win32" ? "\n" : "\r\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .trim()
  .split(splitStr);

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1, N + 1).map((el) => el.split("").map(Number));

function solution(N, M, map) {
  if (N === 1 && M === 1) return 1;
  let dy = [0, 0, -1, 1];
  let dx = [1, -1, 0, 0];

  let visit = Array.from({ length: 2 }, () =>
    Array.from({ length: N }, () => Array(M).fill(0))
  );
  let queue = [[0, 0, 0, 1]];
  visit[0][0][0] = 1;
  while (queue.length) {
    let nq = [];
    for (let i = 0; i < queue.length; i++) {
      let [y, x, rock, move] = queue[i];

      for (let j = 0; j < dy.length; j++) {
        let [ny, nx] = [y + dy[j], x + dx[j]];
        if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
        if (visit[rock][ny][nx]) continue;
        if (ny === N - 1 && nx === M - 1) {
          return move + 1;
        }
        if (map[ny][nx] === 1 && rock === 0 && visit[1][ny][nx] === 0) {
          visit[1][ny][nx] = move + 1;
          nq.push([ny, nx, 1, move + 1]);
        } else if (map[ny][nx] === 0) {
          visit[rock][ny][nx] = 1;
          nq.push([ny, nx, rock, move + 1]);
        }
      }
    }
    queue = nq;
  }
  return -1;
}

console.log(solution(N, M, map));
