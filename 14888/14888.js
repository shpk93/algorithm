var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

const N = +input[0];
const nums = input[1].split(" ").map(Number);
let [p, m, x, d] = input[2].split(" ").map(Number);

function solution(N, nums, p, m, x, d) {
  let useOperators = [];

  for (let i = 0; i < p; i++) useOperators.push("+");
  for (let i = 0; i < m; i++) useOperators.push("-");
  for (let i = 0; i < x; i++) useOperators.push("*");
  for (let i = 0; i < d; i++) useOperators.push("/");

  let max = Number.MIN_SAFE_INTEGER;
  let min = Infinity;
  let isUsed = Array(useOperators.length).fill(0);
  function getpermutation(arr) {
    if (arr.length === N) {
      go(arr);
      return;
    }
    for (let i = 0; i < useOperators.length; i++) {
      if (isUsed[i]) continue;
      isUsed[i] = 1;
      arr.push(useOperators[i]);
      getpermutation(arr);
      arr.pop();
      isUsed[i] = 0;
    }
  }
  getpermutation(["dummy"]);

  function go(operators) {
    let curNum = nums[0];
    for (let index = 1; index < operators.length; index++) {
      let operator = operators[index];
      let nextNum = curNum;
      if (operator === "+") {
        nextNum = curNum + nums[index];
      }
      if (operator === "-") {
        nextNum = curNum - nums[index];
      }
      if (operator === "*") {
        nextNum = curNum * nums[index];
      }
      if (operator === "/") {
        if (curNum < 0) {
          nextNum = 0 - Math.floor(Math.abs(curNum) / nums[index]);
        } else {
          nextNum = Math.floor(curNum / nums[index]);
        }
      }
      curNum = nextNum;
    }
    max = Math.max(curNum, max);
    min = Math.min(curNum, min);
  }

  return max + "\n" + min;
}
console.log(solution(N, nums, p, m, x, d));
