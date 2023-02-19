var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

//11:04
const N = input[0];
const result = input.slice(1, N + 1).map((el) => el.split(" ").map(Number));

function solution(N, result) {
  let answer = 0;
  let player = [1, 2, 3, 4, 5, 6, 7, 8];
  let isUsed = Array(player.length + 1).fill(0);

  function playInning(attackArr, attackIndex, score) {
    for (let inning = 0; inning < N; inning++) {
      let outCount = 0;
      let base1 = 0;
      let base2 = 0;
      let base3 = 0;
      let inningInfo = result[inning];
      while (outCount < 3) {
        let go = inningInfo[attackArr[attackIndex]];
        switch (go) {
          case 0:
            outCount++;
            break;
          case 1:
            score += base3;
            base3 = base2;
            base2 = base1;
            base1 = 1;
            break;
          case 2:
            score += base3 + base2;
            base3 = base1;
            base2 = 1;
            base1 = 0;
            break;
          case 3:
            score += base3 + base2 + base1;
            base1 = base2 = 0;
            base3 = 1;
            break;
          default:
            score += base3 + base2 + base1 + 1;
            base1 = base2 = base3 = 0;
        }
        attackIndex = (attackIndex + 1) % 9;
      }
    }

    return [score, attackIndex];
  }

  function getPermu(select, arr) {
    if (arr.length === select) {
      arr.push(0);
      [arr[3], arr[8]] = [arr[8], arr[3]];

      let score = 0;
      let attackIndex = 0;

      [score, attackIndex] = playInning(arr, attackIndex, score);

      answer = Math.max(score, answer);
      [arr[3], arr[8]] = [arr[8], arr[3]];
      arr.pop();
      return;
    }
    for (let i = 1; i < player.length + 1; i++) {
      if (isUsed[i]) continue;
      isUsed[i] = 1;
      arr.push(i);
      getPermu(select, arr);
      arr.pop();
      isUsed[i] = 0;
    }
  }

  getPermu(8, []);
  return answer;
}

console.log(solution(N, result));
