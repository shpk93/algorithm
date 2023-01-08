var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString();

let N = +input;

function solution(N) {
  let dp = Array(N + 1).fill(0);
  dp[0] = BigInt(0);
  dp[1] = BigInt(1);
  dp[2] = BigInt(1);

  for (let i = 3; i <= N; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return String(dp[N]);
}

console.log(solution(N));

//  0 [  ]
//  1 [1]
//  1 [10],
//  2 [101], [100]
//  3 [1010], [1001], [1000]
//  5 [10101],[10100],[10010],[10000],[10001]
//  8 [101010],[101000],[101001],[100100],[100101],[100000],[100001],[100010]
