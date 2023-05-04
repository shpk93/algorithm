var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

const [N, M, P] = input[0].split(" ").map(Number);
const players = input[1].split(" ").map(Number);
const board = input.slice(2, N + 2).map((_) => _.split(""));

function solution(N, M, P, players, board) {
  let queues = Array(P) // 각 플레이어들의 시작지점을 담아놓는 배열
    .fill()
    .map((_) => []);
  let dy = [0, 0, -1, 1];
  let dx = [1, -1, 0, 0];
  let answer = Array(P).fill(0);

  // 초기 보드를 돌면서  시작지점 세팅
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (board[y][x] !== "." && board[y][x] !== "#") {
        let player = board[y][x];
        queues[player - 1].push([y, x, players[player - 1]]);
      }
    }
  }

  let flag = true; // 움직임을 확인하는 변수 .

  // 움직일 수 있을때까지 매번 라운드를 진행한다.
  while (flag) {
    flag = false;
    for (let i = 1; i <= P; i++) {
      go(i);
    }
  }

  count();
  return answer.join(" ");

  // 해당 플레이어의 시작지점에서 플레이어가 가능한 move만큼 bfs.
  // 새로 성을 쌓는 위치는 다음 큐의 시작지점이다.
  function go(player) {
    let queue = queues[player - 1];
    let add = [];
    while (queue.length) {
      let nq = [];
      for (let i = 0; i < queue.length; i++) {
        let [y, x, move] = queue[i];
        for (let j = 0; j < 4; j++) {
          let ny = y + dy[j];
          let nx = x + dx[j];
          if (ny < 0 || nx < 0 || nx >= M || ny >= N) continue;
          if (board[ny][nx] !== ".") continue;

          board[ny][nx] = player;
          add.push([ny, nx, players[player - 1]]);
          if (move > 1) nq.push([ny, nx, move - 1]);
        }
      }
      queue = nq;
    }
    if (add.length) {
      flag = true;
      queues[player - 1] = add;
    }
  }

  function count() {
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        if (board[y][x] !== "." && board[y][x] !== "#") {
          let player = board[y][x];
          answer[player - 1]++;
        }
      }
    }
  }
}
console.log(solution(N, M, P, players, board));
