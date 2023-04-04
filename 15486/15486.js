var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
const N = +input[0];
const nums = input.slice(1, N + 1).map((el) => el.split(" ").map(Number));

function solution(N, tpArr) {
  // 퇴사는 N+1일날 한다.
  // 퇴사전까지 얻을수있는 최대수익은 무엇인가.

  let dp = Array(N + 1).fill(0);

  // dp[i] = i날까지 가능한 최대 이익

  for (let i = 0; i < tpArr.length; i++) {
    let [t, p] = tpArr[i];

    if (i + t <= N) {
      dp[i + t] = Math.max(dp[i + t], dp[i] + p);
    }
    dp[i + 1] = Math.max(dp[i], dp[i + 1]);
  }

  return dp[N];
}

console.log(solution(N, nums));
