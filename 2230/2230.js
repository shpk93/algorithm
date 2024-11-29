const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform !== "win32" ? "\n" : "\r\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .trim()
  .split(splitStr);

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1, N + 1).map(Number);
function solution(N, M, arr) {
  arr.sort((a, b) => a - b);

  let left = 0;
  let right = 0;
  let answer = arr[arr.length - 1] - arr[0];

  while (left <= right) {
    let result = arr[right] - arr[left];
    if (result < M && right < arr.length - 1) {
      right++;
    } else if (result === M) {
      return result;
    } else {
      left++;
      if (result > M) answer = Math.min(result, answer);
    }
  }
  return answer;
}

console.log(solution(N, M, arr));
