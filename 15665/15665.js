var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

const [N, M] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);
function solution(N, M, nums) {
  nums.sort((a, b) => a - b);

  let answer = new Set();

  function rec(index, arr) {
    if (arr.length === M) {
      answer.add(arr.join(" "));
      return;
    }

    for (let i = index - 1; i < nums.length; i++) {
      if (i < 0) continue;
      arr.push(nums[i]);
      rec(i + 1, arr);
      arr.pop();
    }
  }
  rec(0, []);
  answer = Array.from(answer).join("\n");
  return answer;
}

console.log(solution(N, M, nums));
