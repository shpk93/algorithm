var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);
let [N, K] = input[0].split(" ").map(Number);
let lines = input.slice(1, N + 1).map(Number);

function solution(N, K, lines) {
  let left = 0;
  let right = 2 ** 32;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let count = 0;
    lines.forEach((line) => {
      count += Math.floor(line / mid);
    });

    if (count < K) {
      right = mid - 1;
    } else left = mid + 1;
  }
  return right;
}

console.log(solution(N, K, lines));
