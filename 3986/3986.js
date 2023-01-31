var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
const n = +input[0];
let strs = input.slice(1, 1 + n);
let answer = 0;
function solution(str) {
  let stack = [];

  for (let i = 0; i < str.length; i++) {
    if (stack.length === 0) stack.push(str[i]);
    else {
      let top = stack[stack.length - 1];
      if (top === str[i]) stack.pop();
      else stack.push(str[i]);
    }
  }
  if (stack.length) return 0;
  return 1;
}

strs.forEach((str) => (answer += solution(str)));

console.log(answer);
