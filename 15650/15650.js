var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

const [N, M] = input[0].split(" ").map(Number);

function solution(N, M) {
  answer = [];
  let answerStr = "";
  arr = [];
  for (let i = 1; i <= N; i++) {
    arr.push(i);
  }

  function rec(start, nums) {
    if (nums.length === M) {
      answer.push(nums.slice());
      return;
    }
    for (let i = start; i < arr.length; i++) {
      nums.push(arr[i]);
      rec(i + 1, nums);
      nums.pop();
    }
  }
  rec(0, []);
  answer.forEach((arr) => {
    answerStr += arr.join(" ") + "\n";
  });
  return answerStr;
}

console.log(solution(N, M));
