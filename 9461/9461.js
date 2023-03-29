var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
const T = +input[0];
const nums = input.slice(1, T + 1).map(Number);

const dp = [0, 1, 1, 1, 2, 2, 3, 4, 5, 7, 9];

for (let i = 0; i <= 100; i++) {
  if (dp[i] !== undefined) continue;
  dp[i] = dp[i - 2] + dp[i - 3];
}

function solution(num) {
  return dp[num];
}

nums.forEach((num) => console.log(solution(num)));
