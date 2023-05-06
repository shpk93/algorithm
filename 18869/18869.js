var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

let [M, N] = input[0].split(" ").map(Number);
let arrs = [];

for (let i = 1; i < M + 1; i++) {
  arrs.push(input[i].split(" ").map(Number));
}
function solution(M, N, arrs) {
  arrs = arrs.map((arr) => compress(arr));
  let answer = 0;

  for (let i = 0; i < arrs.length; i++) {
    for (let j = i + 1; j < arrs.length; j++) {
      let boolean = true;
      for (let k = 0; k < arrs[j].length; k++) {
        if (arrs[i][k] !== arrs[j][k]) boolean = false;
      }
      if (boolean) answer++;
    }
  }

  // 0,1,2
  // 2 0 1
  // 1 2 0

  //0,1,2
  //1 2  0
  return answer;

  //
  //
  function compress(arr) {
    let sorted = arr.slice().sort((a, b) => a - b);
    let newArr = [];

    for (let i = 0; i < arr.length; i++) {
      if (sorted[i] !== sorted[i + 1]) newArr.push(sorted[i]);
    }

    return arr.map((n) => binarySearch(n, newArr));
  }

  function binarySearch(target, arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      if (arr[mid] === target) {
        return mid;
      } else if (arr[mid] > target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return left;
  }
}

console.log(solution(M, N, arrs));
