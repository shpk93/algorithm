var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
const [N, M] = input[0].split(" ").map(Number);
const apps = input[1].split(" ").map(Number);
const costs = input[2].split(" ").map(Number);

function solution(N, M, apps, costs) {
  let dp = Array(apps.length + 1)
    .fill()
    .map((_) => Array(10001).fill(0));

  //dp[인덱스][비용]  => app[index]까지 순회했을때 해당 비용에 최대메모리

  for (let i = 1; i <= apps.length; i++) {
    let memory = apps[i - 1];
    let cost = costs[i - 1];

    for (let total = 0; total < 10001; total++) {
      if (total < cost) {
        dp[i][total] = dp[i - 1][total];
      } else {
        dp[i][total] = Math.max(
          dp[i - 1][total],
          dp[i - 1][total - cost] + memory
        );
      }
    }
  }

  return dp[N].findIndex((memory) => M <= memory);
}

console.log(solution(N, M, apps, costs));
