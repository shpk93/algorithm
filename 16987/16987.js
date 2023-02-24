var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

const N = +input[0];
const arr = input.slice(1, N + 1).map((_) => _.split(" ").map(Number));

function solution(arr) {
  let answer = 0;
  let isused = Array(arr.length).fill(0);
  //[내구도,무게]
  function rec(select, count) {
    if (select >= arr.length) {
      answer = Math.max(answer, count);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (i === select) continue;
      let [hp1, weight1] = arr[select];
      let [hp2, weight2] = arr[i];
      if (hp1 <= 0 || hp2 <= 0) {
        answer = Math.max(answer, count);
        rec(select + 1, count);
        continue;
      }
      // console.log("치기전", arr);
      arr[select][0] -= weight2;
      arr[i][0] -= weight1;
      // console.log("치고난후", arr);

      let newCount = count;
      if (arr[select][0] <= 0) newCount++;
      if (arr[i][0] <= 0) newCount++;
      // console.log("뉴카운트", newCount, select);
      rec(select + 1, newCount);
      arr[select][0] += weight2;
      arr[i][0] += weight1;
    }
  }
  rec(0, 0);
  return answer;
}

console.log(solution(arr));
