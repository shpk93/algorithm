var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

const [N, S] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

function solution(N, S, arr) {
  let answer = 0;

  function rec(nowIndex, sum) {
    if (nowIndex === arr.length) {
      if (sum === S) {
        answer++;
      }
      return;
    }
    rec(nowIndex + 1, sum);

    rec(nowIndex + 1, sum + arr[nowIndex]);
  }
  rec(0, 0);
  if (S === 0) answer--;
  return answer;
}

console.log(solution(N, S, arr));
