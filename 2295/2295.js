var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
const T = +input[0];

let arr = input.slice(1, 1 + T).map(Number);

function solution(arr) {
  arr.sort((a, b) => a - b);
  let two = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      two.push(arr[i] + arr[j]);
    }
  }
  let answer = -Infinity;

  two.sort((a, b) => a - b);

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (find(arr[j] - arr[i])) {
        answer = Math.max(answer, arr[j]);
      }
    }
  }

  return answer;

  function find(target) {
    let left = 0;
    let right = two.length;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (two[mid] === target) {
        return true;
      }
      if (two[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return false;
  }
}

console.log(solution(arr));
