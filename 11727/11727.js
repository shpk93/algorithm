var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString();

const N = +input;

function solution(N) {
  let dp = Array(N + 1).fill(0);
  let mod = 10007;

  // 1  [2x1] ,
  // 3  [[2x2],[1x2,1x2],[2x1,2x1] ],
  // 5  [[2x2,2x1],[2x1,2x2],[1x2,1x2,2x1],[2x1,1x2,1x2],[2x1,2x1,2x1]],
  // 11  [[2x2,2x2],[1x2,1x2,2x2],[2x1,2x1,2x2], [2x2,1x2,1x2],[1x2,1x2,1x2,1x2],[2x1,2x1,1x2,1x2],[2x2,2x1,2x1],[1x2,1x2,2x1,2x1],[2x1,2x2,2x1],[2x1,2x1,2x1,2x1],[2x1,1x2,1x2,2x1] ]

  dp[1] = 1;
  dp[2] = 3;

  for (let i = 3; i <= N; i++) {
    dp[i] = (dp[i - 2] * 2 + dp[i - 1]) % mod;
  }
  return dp[N];
}

console.log(solution(N));
