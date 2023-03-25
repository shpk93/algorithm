var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let input = +fs.readFileSync(filepath).toString();

function solution(n) {
  let dp = [false, 0, 1, 2];

  let answer = [1, 1];

  for (let i = 3; i <= n; i++) {
    let num = dp[i - 1] + 1;
    let num2 = Infinity;
    let num3 = Infinity;
    let targetNum = 1;
    if (i % 2 === 0) {
      num2 = dp[i / 2] + 1;
    }
    if (i % 3 === 0) {
      num3 = dp[i / 3] + 1;
    }
    let fix = Math.min(num, num2, num3);
    dp[i] = fix;
    if (fix === num2) targetNum = 2;
    if (fix === num3) targetNum = 3;
    answer.push(targetNum);
  }
  let str = "";
  console.log(dp[n]);
  while (n >= 1) {
    str += n + " ";
    if (answer[n - 1] === 1) {
      n = n - 1;
    } else if (answer[n - 1] === 2) {
      n = n / 2;
    } else if (answer[n - 1] === 3) {
      n = n / 3;
    }
  }

  console.log(str);
}

solution(input);
