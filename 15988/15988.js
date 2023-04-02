var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);
let n = +input[0];
let arr = input.slice(1, n + 1).map(Number);

function solution(n, arr) {
  // 정수 n이 주어졌을 때, n을 1, 2, 3의 합으로 나타내는 방법의 수를 구하는 프로그램을 작성하시오.
  let answer = "";
  let max = Math.max(...arr);
  let dp = [0];

  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 4;

  for (let i = 4; i <= max; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2] + dp[i - 3]) % 1000000009;
  }

  arr.forEach((el) => {
    answer += dp[el] + "\n";
  });
  return answer;
}

console.log(solution(n, arr));
