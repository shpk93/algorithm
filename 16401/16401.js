var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

let [M, N] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
function solution(M, N, arr) {
  let left = 1;
  let right = 1000000001;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let count = 0;
    arr.forEach((n) => {
      count += Math.floor(n / mid);
    });

    if (count >= M) {
      left = mid + 1;
    } else right = mid - 1;
  }
  return left - 1;
}

console.log(solution(M, N, arr));
