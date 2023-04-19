var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
const G = +input[0];
const P = +input[1];
const planes = input.slice(2, 2 + G).map(Number);

function solution(G, P, planes) {
  let posArr = Array(G + 1)
    .fill()
    .map((el, i) => i);

  let used = Array(G + 1).fill(0);

  let answer = 0;

  for (let i = 0; i < planes.length; i++) {
    let num = getGateNumber(planes[i]);
    if (num === 0) break;
    answer++;
  }

  return answer;

  function getGateNumber(num) {
    let pos = posArr[num];
    let move = [num];
    for (let i = pos; i >= 1; i--) {
      if (used[i] === 0) {
        used[i] = 1;
        move.forEach((n) => (posArr[n] = i - 1));
        return i;
      } else move.push[i];
    }
    return 0;
  }
}

console.log(solution(G, P, planes));
