var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

const [N, M, K, X] = input[0].split(" ").map(Number);

function solution(N, M, K, X) {
  let graph = Array(N + 1)
    .fill()
    .map((_) => []);

  for (let i = 1; i < M + 1; i++) {
    let [from, to] = input[i].split(" ").map(Number);
    graph[from].push(to);
  }

  let visit = Array(N + 1).fill(-1); // visit에는 시작 노드부터의 거리가 적혀있음

  // X번 노드부터 bfs시작.
  let queue = [X];
  visit[X] = 0;

  while (queue.length) {
    let nq = [];
    for (let i = 0; i < queue.length; i++) {
      let v = queue[i];
      if (visit[v] === K) break;
      for (let nv of graph[v]) {
        if (visit[nv] !== -1) continue;
        visit[nv] = visit[v] + 1;
        nq.push(nv);
      }
    }
    queue = nq;
  }

  let answer = [];
  visit.forEach((move, i) => {
    if (move === K) answer.push(i);
  });

  return answer.length ? answer.join("\n") : -1;
}

console.log(solution(N, M, K, X));
