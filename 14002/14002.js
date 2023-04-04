var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
const N = +input[0];
const nums = input[1].split(" ").map(Number);

function solution(N, nums) {
  let dp = Array(N + 1)
    .fill()
    .map((_) => [-1, -1]);

  //dp[자기자신을포함한가장긴부분길이][마지막벨류]

  for (let i = 0; i < nums.length; i++) {
    dp[i] = [1, nums[i]];
    if (i !== 0) {
      for (let j = 0; j < i; j++) {
        if (dp[j][0] >= dp[i][0] && dp[j][1] < dp[i][1]) {
          dp[i][0] = dp[j][0] + 1;
        }
      }
    }
  }

  let maxValue = 0;
  let maxIndex = 0;
  let answerArr = [];
  for (let i = 0; i < dp.length; i++) {
    if (maxValue < dp[i][0]) {
      maxIndex = i;
      maxValue = dp[i][0];
    }
  }
  let answer = maxValue;

  for (let i = maxIndex; i >= 0; i--) {
    if (i === maxIndex) {
      answerArr.push(dp[i][1]);
    } else {
      if (dp[i][0] === maxValue - 1) {
        answerArr.push(dp[i][1]);
        maxValue--;
      }
    }
  }

  return answer + "\n" + answerArr.reverse().join(" ");
}
console.log(solution(N, nums));
