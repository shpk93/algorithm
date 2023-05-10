var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

const N = +input[0];
const nums = input[1].split(" ").map(Number);
let [p, m, x, d] = input[2].split(" ").map(Number);

function solution(N, nums, p, m, x, d) {
  let start = nums.shift();
  let operaterArr = [p, m, x, d];

  let max = -Infinity;
  let min = Infinity;

  rec([]);
  return max + "\n" + min;

  //
  function rec(arr) {
    if (arr.length === N - 1) {
      let result = calculate(arr);
      max = Math.max(result, max);
      min = Math.min(result, min);
      return;
    }
    for (let i = 0; i < operaterArr.length; i++) {
      if (operaterArr[i] === 0) continue;
      operaterArr[i]--;
      arr.push(i);
      rec(arr);
      arr.pop();
      operaterArr[i]++;
    }
  }

  function calculate(operaters) {
    let num = start;

    for (let i = 0; i < operaters.length; i++) {
      if (operaters[i] === 0) {
        num += nums[i];
      } else if (operaters[i] === 1) {
        num -= nums[i];
      } else if (operaters[i] === 2) {
        num *= nums[i];
      } else if (operaters[i] === 3) {
        if (num < 0) {
          num = -Math.floor(-num / nums[i]);
        } else num = Math.floor(num / nums[i]);
      }
    }
    return num;
  }
}
console.log(solution(N, nums, p, m, x, d));
