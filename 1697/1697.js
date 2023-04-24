var fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
var input = fs.readFileSync(path.resolve(__dirname, filepath)).toString();

let [N, K] = input.split(" ").map(Number);

function solution(N, K) {
  if (N === K) return 0;
  let visit = Array(1000001).fill(-1);
  visit[N] = 0;
  let queue = [N];

  while (queue.length) {
    let now = queue.shift();
    let dir = [-1, 1, now];

    for (let i = 0; i < dir.length; i++) {
      let next = now + dir[i];
      if (next < 0 || next > 100000) continue;
      if (visit[next] !== -1) continue;
      visit[next] = visit[now] + 1;
      if (next == K) return visit[next];
      queue.push(next);
    }
  }
  return -1;
}

console.log(solution(N, K));
