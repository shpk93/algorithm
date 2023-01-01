var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr).map(Number);
const k = input[0];
const arr = input.slice(1, k + 1);
function solution(k, arr) {
  let stack = [];

  arr.forEach((num) => {
    if (num === 0) stack.pop();
    else stack.push(num);
  });

  return stack.reduce((a, b) => a + b, 0);
}

console.log(solution(k, arr));
