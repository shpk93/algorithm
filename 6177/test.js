var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

let n = +input[0];
let arr = input.slice(1, n + 1).map(Number);

function solution(n, arr) {
  let stack = [];
  let answer = 0;

  for (let v of arr) {
    while (stack.length && stack[stack.length - 1] <= v) {
      stack.pop();
    }
    answer += stack.length;
    stack.push(v);
  }

  console.log(answer);
}

solution(n, arr);
