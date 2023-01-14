var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

const [N, M] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);
function solution(N, M, nums) {
  nums.sort((a, b) => a - b);

  let used = Array(10000).fill(0);
  let answer = new Set();

  function rec(arr) {
    if (arr.length === M) {
      answer.add(arr.join(" "));
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = 1;
      arr.push(nums[i]);
      rec(arr);
      arr.pop();
      used[i] = 0;
    }
  }
  rec([]);
  answer = Array.from(answer).join("\n");
  return answer;
}

console.log(solution(N, M, nums));
