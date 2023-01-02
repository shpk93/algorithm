var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(" ").map(Number);

let [a, b, c] = input;

function solution(n, r, c) {
  if (n === 0) return 0;
  let half = Math.pow(2, n - 1);
  if (r < half && c < half) return solution(n - 1, r, c);
  if (r < half && c >= half) return half * half + solution(n - 1, r, c - half);
  if (r >= half && c < half)
    return half * half * 2 + solution(n - 1, r - half, c);
  return 3 * half * half + solution(n - 1, r - half, c - half);
}

console.log(solution(a, b, c));
