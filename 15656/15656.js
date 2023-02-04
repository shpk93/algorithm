var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

const [N, M] = input[0].split(" ").map(Number);
const nums = input[1].split(" ").map(Number);
function solution(N, M, nums) {
  nums.sort((a, b) => a - b);
  let answer = [];

  function rec(index, arr) {
    if (arr.length === M) {
      answer.push(arr.join(" "));
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      arr.push(nums[i]);
      rec(i + 1, arr);
      arr.pop();
    }
  }
  rec(0, []);
  return answer.join("\n");
}

console.log(solution(N, M, nums));
