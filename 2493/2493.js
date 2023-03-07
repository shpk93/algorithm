var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

let n = +input[0];
let arr = input[1].split(" ").map(Number);

function solution(n, arr) {
  let stack = [];
  stack.push([0, 100000002]);
  let answer = [];
  for (let i = 0; i < arr.length; i++) {
    while (stack[stack.length - 1][1] < arr[i]) {
      stack.pop();
    }

    answer.push(stack[stack.length - 1][0]);
    stack.push([i + 1, arr[i]]);
  }

  console.log(answer.join(" "));
}

solution(n, arr);
