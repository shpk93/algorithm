var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

const [N, M] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);
function solution(N, M, nums) {
  nums.sort((a, b) => a - b);

  let answer = new Set();

  function rec(arr, index) {
    if (arr.length === M) {
      answer.add(arr.join(" "));
      return;
    }

    for (let i = index; i < nums.length; i++) {
      arr.push(nums[i]);
      rec(arr, i + 1);
      arr.pop();
    }
  }
  rec([], 0);
  answer = Array.from(answer).join("\n");
  return answer;
}

console.log(solution(N, M, nums));
