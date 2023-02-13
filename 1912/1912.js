var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
const N = +input[0];
const nums = input[1].split(" ").map(Number);

function solution(N, nums) {
  let prefix = [];

  for (let i = 0; i < nums.length; i++) {
    if (i === 0) prefix.push(nums[i]);
    else {
      prefix.push(prefix[i - 1] + nums[i]);
    }
  }

  console.log(prefix);
}

console.log(solution(N, nums));
