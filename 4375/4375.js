var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

let answer = "";
function solution(t) {
  let o = 1;
  let answer = 1;
  while (true) {
    if (o % t === 0) {
      break;
    } else {
      o = o * 10 + 1;
      o = o % t;
      answer++;
    }
  }
  return answer;
}
input.forEach((el) => {
  answer += solution(el) + "\n";
});

console.log(answer);
