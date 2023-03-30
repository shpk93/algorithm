var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString();
let n = +input;

// 0    10
// 1    01,21
// 2    21,23
// 3    32,34
// 4
// 5
// 6
// 7
// 8
// 9     89,

function solution(n) {
  let dp = [[0, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

  for (let i = 1; i < n; i++) {
    let arr = [];
    for (let j = 0; j <= 9; j++) {
      if (j === 0) {
        arr.push(dp[i - 1][1] % 1000000000);
      } else if (j === 9) {
        arr.push(dp[i - 1][8] % 1000000000);
      } else {
        arr.push((dp[i - 1][j - 1] + dp[i - 1][j + 1]) % 1000000000);
      }
    }
    dp.push(arr);
  }

  return dp[n - 1].reduce((a, b) => a + b) % 1000000000;
}

console.log(solution(n));
