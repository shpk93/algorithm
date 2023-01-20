var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
const n = +input[0];
const arr = input.slice(1, n + 1).map(Number);
function solution(n, arr) {
  let answer = 0;
  let stack = [];

  for (let i = 0; i < arr.length; i++) {
    let count = 1;
    while (stack.length && stack[stack.length - 1][0] <= arr[i]) {
      answer += stack[stack.length - 1][1];
      if (stack[stack.length - 1][0] === arr[i]) {
        count += stack[stack.length - 1][1];
      } else {
        count = 1;
      }
      stack.pop();
    }
    if (stack.length) answer++;
    stack.push([arr[i], count]);
  }

  return answer;
}

console.log(solution(n, arr));
