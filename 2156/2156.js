var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

let N = +input[0];
let arr = input.slice(1, N + 1).map(Number);

function solution(N, arr) {
  let d = Array(N + 1).fill(0);

  if (N === 1) return arr[0];
  if (N === 2) return arr[0] + arr[1];

  d[1] = arr[0];
  d[2] = arr[0] + arr[1];

  for (let i = 3; i <= N; ++i)
    d[i] = Math.max(
      d[i - 1],
      d[i - 2] + arr[i - 1],
      d[i - 3] + arr[i - 2] + arr[i - 1]
    );

  return d[N];
}

console.log(solution(N, arr));
