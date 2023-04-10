//  https://www.codetree.ai/frequent-problems/tail-catch-play

var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

let [n, m, k] = input[0].split(" ").map(Number);
let board = input.slice(1, n + 1).map((el) => el.split(" ").map(Number));

function solution(n, m, k, board) {
  let answer = 0;
  let dy = [0, 0, -1, 1];
  let dx = [1, -1, 0, 0];
  let teamArr = [];
  let headPosArr = [];
  let tailPosArr = [];

  let teamBoard = Array(board.length)
    .fill(0)
    .map((el) => Array(board[0].length).fill(0));
  let teamId = 1;

  // teamBoard에 각 팀번호를 라벨링
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] !== 0 && teamBoard[i][j] === 0) {
        let team = [[i, j]];
        teamBoard[i][j] = teamId;
        dfs(i, j, teamBoard, team);
        teamArr.push(team);
        teamId++;
      }
    }
  }

  // 각 팀의 꼬리와 머리위치를 기록
  for (let i = 0; i < teamArr.length; i++) {
    for (let j = 0; j < teamArr[i].length; j++) {
      let y = teamArr[i][j][0];
      let x = teamArr[i][j][1];
      if (board[y][x] === 1) {
        headPosArr[i] = [y, x];
      }
      if (board[y][x] === 3) {
        tailPosArr[i] = [y, x];
      }
    }
  }

  // 라운드 시작 전 각 팀을 움직이고 시작
  for (let i = 1; i <= k; i++) {
    teamArr.forEach((team) => move(team));
    goRound(i);
  }

  return answer;

  ////////////////////////

  function calculate(y, x) {
    let dis = getDistance(y, x);
    answer += dis * dis;
    [headPos, tailPos] = getHeadPosandTailPos(teamBoard[y][x]);
    board[headPos[0]][headPos[1]] = 3;
    board[tailPos[0]][tailPos[1]] = 1;
  }

  function goRound(round) {
    let arrow = Math.floor((round - 1) / n) % 4;
    let target = (round % n) - 1;
    if (target < 0) target = n - 1;

    // 위에서 왼쪽부터 오른쪽으로 던지기
    if (arrow === 0) {
      for (let i = 0; i < n; i++) {
        if (board[target][i] !== 4 && board[target][i] !== 0) {
          calculate(target, i);
          break;
        }
      }
    }

    // //밑에서 왼쪽부터 위로 던지기
    if (arrow === 1) {
      for (let i = n - 1; i >= 0; i--) {
        if (board[i][target] !== 4 && board[i][target] !== 0) {
          calculate(i, target);
          break;
        }
      }
    }

    // 밑에서 오른쪽에서 왼쪽으로 던지기
    if (arrow === 2) {
      target = n - 1 - target;
      for (let i = n - 1; i >= 0; i--) {
        if (board[target][i] !== 4 && board[target][i] !== 0) {
          calculate(target, i);
          break;
        }
      }
    }

    // 위에서 오른쪽부터 밑으로 던지기
    if (arrow === 3) {
      target = n - 1 - target;
      for (let i = 0; i < n; i++) {
        if (board[i][target] !== 4 && board[i][target] !== 0) {
          calculate(i, target);
          break;
        }
      }
    }
  }

  // 각 팀에 몇 번째 사람인지 구하는 함수
  function getDistance(sy, sx) {
    if (board[sy][sx] === 1) return 1;
    if (board[sy][sx] === 3) {
      return teamArr[teamBoard[sy][sx] - 1].reduce(
        (a, b) => (board[b[0]][b[1]] !== 4 ? a + 1 : a),
        0
      );
    }

    let queue = [[sy, sx, 1]];
    let [headPos] = getHeadPosandTailPos(teamBoard[sy][sx]);

    let visit = Array(board.length)
      .fill(0)
      .map((el) => Array(board[0].length).fill(0));
    visit[sy][sx] = 1;
    while (queue.length) {
      let [y, x, count] = queue.shift();
      for (let i = 0; i < dx.length; i++) {
        let ny = y + dy[i];
        let nx = x + dx[i];
        if (ny < 0 || nx < 0 || ny >= board.length || nx >= board[0].length)
          continue;
        if (visit[ny][nx]) continue;
        if (board[ny][nx] !== 0 && board[ny][nx] !== 3) {
          if (ny === headPos[0] && nx === headPos[1]) return count + 1;
          visit[ny][nx] = 1;
          queue.push([ny, nx, count + 1]);
        }
      }
    }
  }

  function getHeadPosandTailPos(teamId) {
    let headPos = [-1, -1];
    let tailPos = [-1, -1];

    team = teamArr[teamId - 1];

    team.forEach(([y, x]) => {
      if (board[y][x] === 1) {
        headPos = [y, x];
      }
      if (board[y][x] === 3) {
        tailPos = [y, x];
      }
    });

    return [headPos, tailPos];
  }

  function move(team) {
    let headIndex = -1;
    let value = [];
    for (let i = 0; i < team.length; i++) {
      let [y, x] = team[i];
      if (board[y][x] === 1) {
        headIndex = i;
      }
      value.push(board[y][x]);
    }
    let right = team[headIndex + 1];
    let left = team[headIndex - 1];
    if (right === undefined) right = team[0];
    if (left === undefined) left = team[team.length - 1];

    let arrow = 1;
    if (board[left[0]][left[1]] === 2) arrow = -1;

    if (arrow === 1) {
      value.push(value.shift());
    } else {
      value.unshift(value.pop());
    }

    for (let i = 0; i < team.length; i++) {
      let [y, x] = team[i];
      board[y][x] = value[i];
    }
  }

  function dfs(sy, sx, visit, team) {
    for (let i = 0; i < dx.length; i++) {
      let ny = sy + dy[i];
      let nx = sx + dx[i];
      if (ny < 0 || nx < 0 || ny >= board.length || nx >= board[0].length)
        continue;
      if (visit[ny][nx]) continue;
      if (board[ny][nx] !== 0) {
        visit[ny][nx] = teamId;
        team.push([ny, nx]);
        dfs(ny, nx, visit, team);
      }
    }
  }
}

console.log(solution(n, m, k, board));
