var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

let index = 0;
let result = "";
while (true) {
  let [w, h] = input[index].split(" ").map(Number);
  if (w === 0 && h === 0) break;
  let board = input.slice(index + 1, h + index + 1).map((el) => el.split(""));
  result += solution(w, h, board) + "\n";
  index += h + 1;
}
console.log(result.trimEnd());

//비트마스킹 풀이
function solution(w, h, board) {
  if (w === 1 && h === 1) {
    if (board[h][w] === "*") return -1;
    return 0;
  }

  let answer = Infinity;
  let trashPos = {};
  let trashCount = 0;
  let startPos = [0, 0];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (board[y][x] === "*") {
        trashCount++;
        trashPos[`${y} ${x}`] = 1 << (trashCount - 1);
      }
      if (board[y][x] === "o") {
        startPos = [y, x];
        board[y][x] = ".";
      }
    }
  }
  if (trashCount === 0) return 0;

  bfs(startPos);

  return answer === Infinity ? -1 : answer;

  // 함수
  function bfs(startPos) {
    let dy = [0, 0, -1, 1];
    let dx = [-1, 1, 0, 0];

    let visit = Array(h)
      .fill(0)
      .map((_) =>
        Array(w)
          .fill(0)
          .map((_) => Array(1 << trashCount).fill(0))
      );

    //[y,x,state,time]
    let queue = [[...startPos, 0, 0]];
    visit[startPos[0]][startPos[1]][0] = 1;

    while (queue.length) {
      let nq = [];
      for (let j = 0; j < queue.length; j++) {
        let [y, x, state, time] = queue[j];
        if (time >= answer) {
          break;
        }
        for (let i = 0; i < 4; i++) {
          let ny = y + dy[i];
          let nx = x + dx[i];
          if (ny < 0 || nx < 0 || ny >= h || nx >= w) continue;
          if (visit[ny][nx][state]) continue;
          if (board[ny][nx] === "x") continue;

          if (board[ny][nx] === "*") {
            let index = trashPos[`${ny} ${nx}`];
            let nextState = state | index;
            if (nextState === 2 ** trashCount - 1) {
              answer = Math.min(answer, time + 1);
            } else {
              queue.push([ny, nx, nextState, time + 1]);
              visit[ny][nx][nextState] = 1;
            }
          } else {
            visit[ny][nx][state] = 1;
            queue.push([ny, nx, state, time + 1]);
          }
        }
      }
      queue = nq;
    }
  }
}
