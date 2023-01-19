var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString();

let n = +input;

function solution(n) {
  let i = 0;
  let answer = 0;
  while (true) {
    if (i === n) {
      console.log(answer - 1);
      break;
    }
    if (check(answer)) {
      i++;
    }
    answer++;
  }
}

function check(n) {
  n = String(n);

  return n.includes("666");
}

solution(187);
