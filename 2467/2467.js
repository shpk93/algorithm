const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform !== "win32" ? "\n" : "\r\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .trim()
  .split(splitStr);

const N = +input[0];
const arr = input[1].split(" ").map(Number);
function solution(N, arr) {
  let left = 0;
  let right = arr.length - 1;
  let minSum = Infinity;
  let result = [];

  while (left < right) {
    const sum = arr[left] + arr[right];

    if (Math.abs(sum) < minSum) {
      minSum = Math.abs(sum);
      result = [arr[left], arr[right]];
    }

    if (sum < 0) {
      left++;
    } else {
      right--;
    }
  }

  return result.join(" ");
}

console.log(solution(N, arr));
