var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);
let [N, M] = input[0].split(" ").map(Number);
let trees = input[1].split(" ").map(Number);

function solution(N, M, trees) {
  let left = 0;
  let right = 1000000000;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    let count = 0;
    trees.forEach((tree) => {
      if (tree - mid > 0) {
        count += tree - mid;
      }
    });
    if (count < M) {
      right = mid - 1;
    } else left = mid + 1;
  }
  return right;
}

console.log(solution(N, M, trees));
