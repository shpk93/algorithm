var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

let [N, M] = input[0].split(" ").map(Number);
let edges = input.slice(1, 1 + M).map((el) => el.split(" ").map(Number));

function solution(N, edges) {
  let graph = Array(N)
    .fill(0)
    .map((el) => Array(N).fill(Infinity));

  for (let i = 0; i < N; i++) {
    graph[i][i] = 0;
  }
  edges.forEach(([A, B]) => {
    graph[A - 1][B - 1] = 1;
    graph[B - 1][A - 1] = 1;
  });

  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (graph[i][k] + graph[k][j] < graph[i][j]) {
          graph[i][j] = graph[i][k] + graph[k][j];
        }
      }
    }
  }
  let answer = [];
  graph.forEach((el, i) => {
    answer.push([el.reduce((a, b) => a + b), i + 1]);
  });
  answer.sort((a, b) => a[0] - b[0]);
  return answer[0][1];
}

console.log(solution(N, edges));
