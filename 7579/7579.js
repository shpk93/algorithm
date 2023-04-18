var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
const [N, M] = input[0].split(" ").map(Number);
const apps = input[1].split(" ").map(Number);
const costs = input[2].split(" ").map(Number);

function solution(N, M, apps, costs) {
  let dp = Array(apps.length)
    .fill()
    .map((_) => Array(10001).fill(-1));

  let answer = Infinity;
  for (let i = 0; i < apps.length; i++) {
    let bite = apps[i];
    let cost = costs[i];
    dp[i][cost] = bite;
    if (bite >= M) answer = Math.min(answer, cost);
    for (let j = 0; j < apps.length; j++) {
      if (j === i) continue;
      for (let k = dp[i].length - 1; k >= 0; k--) {
        if (dp[i][k] !== -1) {
          let bite2 = apps[j];
          let cost2 = costs[j];
          dp[i][k + cost2] = Math.max(dp[i][k + cost2], dp[i][k] + bite2);
          if (dp[i][k + cost2] >= M) {
            answer = Math.min(answer, k + cost2);
          }
        }
      }
    }
  }

  //   console.log(dp);
  return answer;
  //dp[appindex][비용]  => 해당 app을 종료했을시 해당 비용에 최대메모리
}

console.log(solution(N, M, apps, costs));
