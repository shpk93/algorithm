var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);
let map = input.map((el) => el.split("").map(Number));

// 스도쿠
function solution(map) {
  let isUsed1 = Array(10)
    .fill(0)
    .map((_) => Array(10).fill(0)); //가로
  let isUsed2 = Array(10)
    .fill(0)
    .map((_) => Array(10).fill(0)); //세로
  let isUsed3 = Array(10)
    .fill(0)
    .map((_) => Array(10).fill(0)); //박스

  let answer = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      let num = map[y][x];
      if (num !== 0) {
        isUsed1[y][num] = 1;
        isUsed2[x][num] = 1;
        isUsed3[getBoxNumber(y, x)][num] = 1;
      }
    }
  }

  go(0, map);

  return answer.slice(1);

  //
  function go(pos, map) {
    if (answer !== 0) return;

    if (pos === 81) {
      answer = "";
      map.forEach((el) => (answer += "\n" + el.join("")));
      return;
    }

    let y = Math.floor(pos / 9);
    let x = pos % 9;

    if (map[y][x] === 0) {
      for (let i = 1; i <= 9; i++) {
        if (isUsed1[y][i] || isUsed2[x][i] || isUsed3[getBoxNumber(y, x)][i])
          continue;
        isUsed1[y][i] = 1;
        isUsed2[x][i] = 1;
        isUsed3[getBoxNumber(y, x)][i] = 1;
        map[y][x] = i;
        go(pos + 1, map);
        isUsed1[y][i] = 0;
        isUsed2[x][i] = 0;
        isUsed3[getBoxNumber(y, x)][i] = 0;
        map[y][x] = 0;
      }
    } else go(pos + 1, map);
  }

  function getBoxNumber(y, x) {
    if (y < 3 && x < 3) return 0;
    if (y < 3 && x < 6) return 1;
    if (y < 3 && x < 9) return 2;

    if (y < 6 && x < 3) return 3;
    if (y < 6 && x < 6) return 4;
    if (y < 6 && x < 9) return 5;

    if (y < 9 && x < 3) return 6;
    if (y < 9 && x < 6) return 7;
    if (y < 9 && x < 9) return 8;
  }
}

console.log(solution(map));
