var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
const N = +input[0];
const nums = input[1].split(" ").map(Number);

function solution(N, nums) {
  let dp = [...nums];
  let answer = nums[0];

  //dp[i]  = 현재까지 가장 큰 증가하는 수열의 합

  // 반복문을  본인 이전의 요소와 비교.
  // 이전요소보다 본인이 크다면
  // 본인 dp테이블에 이전요소수열합 + 자기자신을 추가한다.
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + nums[i]);
        answer = Math.max(answer, dp[i]);
      }
    }
  }

  return answer;
}

console.log(solution(N, nums));
