var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
const [T, W] = input[0].split(" ").map(Number);
const nums = input.slice(1, T + 1).map(Number);

function solution(T, W, nums) {
  let dp = Array(T + 1)
    .fill()
    .map((el) =>
      Array(2)
        .fill(0)
        .map((el) => Array(W + 2).fill(0))
    );

  //   dp[0][0][0] = 0;
  //   dp[0][1][0] = 0
  // dp[시간][위치][움직인횟수] = 지금까지 받은과일갯수

  //            [이전시간][다른위치][움직이기전횟수]

  for (let i = 0; i < nums.length; i++) {
    let pos = nums[i];

    for (let j = 1; j < W + 2; j++) {
      if (pos === 1) {
        dp[i + 1][0][j] = Math.max(dp[i][0][j] + 1, dp[i][1][j - 1] + 1);
        dp[i + 1][1][j] = Math.max(dp[i][0][j - 1], dp[i][1][j]);
      }
      if (pos === 2) {
        if (i === 0 && j === 1) continue;

        dp[i + 1][1][j] = Math.max(dp[i][1][j] + 1, dp[i][0][j - 1] + 1);
        dp[i + 1][0][j] = Math.max(dp[i][1][j - 1], dp[i][0][j]);
      }
    }
  }

  return Math.max(...dp.flat().flat());
}
console.log(solution(T, W, nums));
