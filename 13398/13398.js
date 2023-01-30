var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

const n = +input[0];
const arr = input[1].split(" ").map(Number);

function solution(n, arr) {
  const dp = Array(n)
    .fill(0)
    .map((el) => [-Infinity, -Infinity]);

  dp[0][0] = arr[0];
  // dp[n] = n요소를 포함한 최대값.

  for (let i = 1; i < arr.length; i++) {
    dp[i][0] = Math.max(dp[i - 1][0] + arr[i], arr[i]);
    dp[i][1] = Math.max(dp[i - 1][0], dp[i - 1][1] + arr[i]);
  }

  return Math.max(...dp.flat().flat());
}

console.log(solution(n, arr));
