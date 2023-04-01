var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
const N = +input[0];
const nums = input[1].split(" ").map(Number);

function solution(N, nums) {
  let dp = [];
  let max = nums[0];
  dp[0] = nums[0];

  // dp[i] = 현재까지 nums[i]를 포함한 가장 큰 수.
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    max = Math.max(max, dp[i]);
  }
  return max;
}

console.log(solution(N, nums));
