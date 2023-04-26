var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);
let N = +input[0];
let A = input[1].split(" ").map(Number);

function solution(N, A) {
  let prefix = [0];

  let dp = Array(N + 1)
    .fill()
    .map((_) => Array(4).fill(0));
  A.forEach((num, i) => {
    prefix.push(prefix[i] + num);
  });

  if (prefix[N] % 4 !== 0) return 0;

  let target = prefix[N] / 4;

  if (prefix[N] === 0) {
    let zero = 0;
    for (let i = 1; i <= N; i++) {
      if (prefix[i] === 0) zero++;
    }
    return ((zero - 1) * (zero - 2) * (zero - 3)) / 6;
  }

  dp[0][0] = 1;
  for (let i = 1; i < prefix.length; i++) {
    dp[i][0] = 1;
    for (let j = 1; j <= 3; j++) {
      dp[i][j] = dp[i - 1][j];
      if (target * j == prefix[i]) dp[i][j] += dp[i - 1][j - 1];
    }
  }
  return dp[N][3];
}

console.log(solution(N, A));
