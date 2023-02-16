var fs = require("fs");
const { isUint8ClampedArray } = require("util/types");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim();

function solution(input) {
  let stack = [];

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "]") {
      if (stack.length === 0) return 0;
      while (stack.length) {
        if (stack[stack.length - 1] === "[") {
          stack.pop();
          break;
        } else if (stack[stack.length - 1] === "(") {
          return 0;
        } else stack.pop();
      }
    } else if (input[i] === ")") {
      if (stack.length === 0) return 0;

      while (stack.length) {
        if (stack[stack.length - 1] === "(") {
          stack.pop();
          break;
        } else if (stack[stack.length - 1] === "[") {
          return 0;
        } else stack.pop();
      }
    } else {
      stack.push(input[i]);
    }
  }

  if (stack.length) return 0;

  let answer = 0;
  let regx = new RegExp(/\(\)/g);
  let regx2 = new RegExp(/\[\]/g);

  input = input.replace(regx, "2");
  input = input.replace(regx2, "3");

  stack = [];

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "]") {
      let arr = [];
      while (true) {
        let top = stack.pop();
        if (top === "[") {
          break;
        } else {
          arr.push(top * 3);
        }
      }
      stack.push(...arr);
    } else if (input[i] === ")") {
      let arr = [];
      while (true) {
        let top = stack.pop();
        if (top === "(") {
          break;
        } else {
          arr.push(top * 2);
        }
      }
      stack.push(...arr);
    } else {
      stack.push(input[i]);
    }
  }
  answer += stack.reduce((a, b) => Number(a) + Number(b), 0);
  return answer;
}

console.log(solution(input));
