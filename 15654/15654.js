var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

const [N, M] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);
function solution(N, M, nums) {
  nums.sort((a, b) => a - b);
  let used = Array(nums.length).fill(0);
  let answer = [];

  function rec(index, arr) {
    if (arr.length === M) {
      answer.push(arr.join(" "));
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      arr.push(nums[i]);
      used[i] = 1;
      rec(i + 1, arr);
      used[i] = 0;
      arr.pop();
    }
  }
  rec(0, []);
  return answer.join("\n");
}

console.log(solution(N, M, nums));
