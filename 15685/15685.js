var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

const N = +input[0];
const dragonCurves = input
  .slice(1, N + 1)
  .map((el) => el.split(" ").map(Number));

function solution(N, dragonCurves) {
  let map = Array(101)
    .fill(0)
    .map((el) => Array(101).fill(0));

  let answer = 0;

  let dragonMove = [[0], [0, 1]];

  for (let i = 2; i <= 11; i++) {
    dragonMove[i] = [
      ...dragonMove[i - 1],
      ...dragonMove[i - 1]
        .slice()
        .reverse()
        .map((el) => {
          if (el + 1 >= 4) {
            return el + 1 - 4;
          }
          return el + 1;
        }),
    ];
  }

  let dx = [1, 0, -1, 0];
  let dy = [0, -1, 0, 1];

  function move(y, x, arrow, dragronNumber) {
    let movesArr = dragonMove[dragronNumber].map((el) => {
      if (el + arrow >= 4) {
        return el + arrow - 4;
      }
      return el + arrow;
    });

    map[y][x] = 1;
    movesArr.forEach((arrow) => {
      let ny = y + dy[arrow];
      let nx = x + dx[arrow];
      map[ny][nx] = 1;
      y = ny;
      x = nx;
    });
  }

  dragonCurves.forEach((el) => {
    let [x, y, arrow, dragronNumber] = el;
    move(y, x, arrow, dragronNumber);
  });

  for (let y = 0; y < map.length - 1; y++) {
    for (let x = 0; x < map[0].length - 1; x++) {
      if (
        map[y][x] === 1 &&
        map[y + 1][x] === 1 &&
        map[y][x + 1] === 1 &&
        map[y + 1][x + 1] === 1
      ) {
        answer++;
      }
    }
  }
  return answer;
}
console.log(solution(N, dragonCurves));
