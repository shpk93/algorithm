var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
const k = +input[0];
const arr = input[1].split(" ").map(Number);
function solution(k, arr) {
  let stack = [];
  let answer = Array(arr.length).fill(-1);

  for (let i = 0; i < arr.length; i++) {
    if (stack.length === 0) stack.push([arr[i], i]);
    else {
      if (stack[stack.length - 1][0] < arr[i]) {
        while (stack.length && stack[stack.length - 1][0] < arr[i]) {
          answer[stack.pop()[1]] = arr[i];
        }
      }
      stack.push([arr[i], i]);
    }
  }

  return answer.join(" ");
}

console.log(solution(k, arr));
