var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr).map(Number);
const n = input[0];
const arr = input.slice(1, n + 1);
function solution(n, arr) {
  let stack = [];
  let stackNum = 1;
  let answer = [];

  for (let i = 0; i < arr.length; i++) {
    if (stackNum === arr[i]) {
      answer.push("+", "-");
      stackNum++;
    } else if (stackNum < arr[i]) {
      while (stackNum !== arr[i]) {
        stack.push(stackNum);
        stackNum++;
        answer.push("+");
      }
      if (stackNum === arr[i]) {
        answer.push("+", "-");
        stackNum++;
      }
    } else if (stackNum > arr[i]) {
      if (stack.length === 0 || stack[stack.length - 1] < arr[i]) {
        return "NO";
      }
      while (stack.length) {
        let target = stack.pop();
        answer.push("-");
        if (target === arr[i]) break;
      }
    }
  }

  return answer.join("\n");
}

console.log(solution(n, arr));
