var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
const [N, M] = input[0].split(" ").map(Number);
const coins = input.slice(1, 1 + N).map(Number);

function solution(N, M, coins) {
  let dp = Array(10005).fill(0);
  dp[0] = 1;

  coins.forEach((n) => {
    for (let i = 0; i <= 10000 - n; i++) {
      if (dp[i]) {
        dp[i + n] += dp[i];
      }
    }
  });
  return dp[N];
}

console.log(solution(N, M, coins));
