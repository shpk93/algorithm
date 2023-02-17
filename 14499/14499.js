var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);
const [N, M, X, Y, K] = input[0].split(" ").map(Number);
const map = input.slice(1, N + 1).map((_) => _.split(" ").map(Number));
const commands = input[N + 1].split(" ").map(Number);

function solution(N, M, X, Y, K, map, commands) {
  let answer = [];
  [X, Y] = [Y, X];
  //X,Y는 주사위가 시작하는 좌표
  //주사위에 바닥면의 좌표는 [3,1]
  //주사위의 위좌표는 [1,1]
  let dice = [
    [-1, 0, -1],
    [0, 0, 0],
    [-1, 0, -1],
    [-1, 0, -1],
  ];

  travel(Y, X, 0, commands);

  function travel(y, x, index, commands) {
    if (index >= commands.length) return;

    let cmd = commands[index];
    let dy = [0, 0, -1, 1];
    let dx = [1, -1, 0, 0];

    let ny = y + dy[cmd - 1];
    let nx = x + dx[cmd - 1];

    if (ny < 0 || nx < 0 || ny >= N || nx >= M) {
      travel(y, x, index + 1, commands);
    } else {
      moveDice(cmd);
      answer.push(dice[1][1]);
      if (map[ny][nx] === 0) {
        map[ny][nx] = dice[3][1];
      } else {
        dice[3][1] = map[ny][nx];
        map[ny][nx] = 0;
      }

      travel(ny, nx, index + 1, commands);
    }
  }

  function moveDice(dir) {
    let newdice = Array.from({ length: 4 }, () => Array(3).fill(-1));
    if (dir === 1) {
      newdice[0][1] = dice[0][1];
      newdice[1][1] = dice[1][0];
      newdice[1][2] = dice[1][1];
      newdice[3][1] = dice[1][2];
      newdice[2][1] = dice[2][1];
      newdice[1][0] = dice[3][1];
    }
    if (dir === 2) {
      newdice[0][1] = dice[0][1];
      newdice[3][1] = dice[1][0];
      newdice[1][0] = dice[1][1];
      newdice[1][1] = dice[1][2];
      newdice[2][1] = dice[2][1];
      newdice[1][2] = dice[3][1];
    }
    if (dir === 3) {
      newdice[3][1] = dice[0][1];
      newdice[1][0] = dice[1][0];
      newdice[0][1] = dice[1][1];
      newdice[1][2] = dice[1][2];
      newdice[1][1] = dice[2][1];
      newdice[2][1] = dice[3][1];
    }
    if (dir === 4) {
      newdice[1][1] = dice[0][1];
      newdice[1][0] = dice[1][0];
      newdice[2][1] = dice[1][1];
      newdice[1][2] = dice[1][2];
      newdice[3][1] = dice[2][1];
      newdice[0][1] = dice[3][1];
    }
    dice = newdice;
  }

  return answer.join("\n");
}

console.log(solution(N, M, X, Y, K, map, commands));
