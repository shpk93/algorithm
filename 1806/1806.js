const fs = require("fs");
const path = require("path");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform !== "win32" ? "\n" : "\r\n";
const input = fs
  .readFileSync(path.resolve(__dirname, filepath))
  .toString()
  .trim()
  .split(splitStr);

const [N, S] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);
function solution(N, S, arr) {
  const sumArr = [];
  let sum = 0;
  let answer = Infinity;

  for (let i = 0; i < arr.length; i++) {
    sumArr[i] = sum += arr[i];
  }
  sumArr.unshift(0);
  let left = 0;
  let right = 1;

  while (right < sumArr.length && left < sumArr.length) {
    let subSum = sumArr[right] - sumArr[left];

    if (subSum >= S) {
      answer = Math.min(right - left, answer);
    }

    if (subSum < S) {
      right++;
    } else {
      if (right - left > 1) {
        left++;
      } else {
        right++;
      }
    }
  }

  if (answer === Infinity) return 0;
  return answer;
}

console.log(solution(N, S, arr));
