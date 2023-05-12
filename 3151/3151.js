var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

const N = +input[0];
const nums = input[1].split(" ").map(Number);

function solution(N, nums) {
  let result = 0;
  nums.sort((a, b) => a - b);

  for (let x = 0; x < N - 2; x++) {
    let start = x + 1;
    let end = N - 1;

    while (start < end) {
      let sum = nums[start] + nums[end] + nums[x];
      if (sum === 0) {
        let l = 1;
        let r = 1;
        if (nums[start] === nums[end]) {
          result += end - start;
          start++;
          continue;
        }
        while (start + 1 < end && nums[start] === nums[start + 1]) {
          l++;
          start++;
        }
        while (start < end - 1 && nums[end] === nums[end - 1]) {
          r++;
          end--;
        }
        result += l * r;
      }

      if (sum < 0) {
        start++;
      } else {
        end--;
      }
    }
  }
  return result;
}
console.log(solution(N, nums));
