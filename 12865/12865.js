var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

let [N, K] = input[0].split(" ").map(Number);
let arr = [];
for (let i = 1; i < N + 1; i++) {
  arr.push(input[i].split(" ").map(Number));
}
function solution(N, K, arr) {
  let dp = Array(K + 1).fill(0);

  //N은 물품의수 K는 무게

  arr.forEach(([W, V]) => {
    for (let i = K; i >= 0; i--) {
      if (i + W >= dp.length) continue;
      dp[i + W] = Math.max(dp[i + W], dp[i] + V);
    }
  });

  return dp[K];
}

console.log(solution(N, K, arr));
