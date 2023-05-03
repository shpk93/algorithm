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
const map = input
  .slice(1, N + 1)
  .map((el) => el.split("").map((el) => el.charCodeAt()));

function solution(N, M, map) {
  let visit = Array(100).fill(0);
  visit[map[0][0]] = 1;
  let dx = [0, 0, -1, 1];
  let dy = [1, -1, 0, 0];

  let answer = 0;

  dfs(0, 0, 1);
  function dfs(y, x, count) {
    if (answer < count) answer = count;
    for (let i = 0; i < 4; i++) {
      let ny = y + dy[i];
      let nx = x + dx[i];
      if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
      let next = map[ny][nx];
      if (!visit[next]) {
        visit[next] = 1;
        dfs(ny, nx, count + 1);
        visit[next] = 0;
      }
    }
  }
  return answer;
}

console.log(solution(N, M, map));
