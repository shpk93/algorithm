var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

const [N, M] = input[0].split(" ").map(Number);

function solution(N, M) {
  answer = [];
  arr = [];
  for (let i = 1; i <= N; i++) {
    arr.push(i);
  }

  function rec(start, nums) {
    if (nums.length === M) {
      answer.push(nums.join(" "));
      return;
    }
    for (let i = start; i < arr.length; i++) {
      nums.push(arr[i]);
      rec(i, nums);
      nums.pop();
    }
  }
  rec(0, []);
  return answer.join("\n");
}

console.log(solution(N, M));
