var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
let n = +input[0];
let l = +input[1];

let brokenBotton = [];
if (l !== 0) brokenBotton = input[2].split(" ").slice(0, l).map(Number);

function solution(n, l, brokenBotton) {
  let botton = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  botton = botton.filter((el) => brokenBotton.indexOf(el) === -1);

  let permutation = [];
  permutation.push([[100], 0]);
  function getpermutation(selectNum, start, now) {
    if (now.length === selectNum) {
      permutation.push([+now.join(""), now.length]);
      return;
    }
    for (let i = 0; i < botton.length; i++) {
      now.push(botton[i]);
      getpermutation(selectNum, start + 1, now);
      now.pop();
    }
  }
  let length = String(n).length;
  getpermutation(length, 0, []);
  let max = getMax(length + 1);
  let min = getMin(length - 1);

  if (max[1] === length + 1) permutation.push(max);
  if (min[1] === length - 1) permutation.push(min);

  let answer = Infinity;

  permutation.forEach(([permu, num]) => {
    let click = Math.abs(permu - n) + num;
    answer = Math.min(answer, click);
  });

  return answer;
  function getMax(selectNum) {
    let max = [];
    let boolean = false;
    if (botton.length === 0) return [0, 9999999];
    if (botton.length === 1 && botton[0] === 0) return [0, 1];

    if (botton[0] === 0 && botton.length > 1) {
      max.push(botton[1]);
      boolean = true;
      for (let i = 0; i < selectNum - 1; i++) {
        max.push(botton[0]);
      }
    }
    if (!boolean) {
      for (let i = 0; i < selectNum; i++) {
        max.push(botton[0]);
      }
    }
    if (max.length === 0) return [0, 9999999];
    return [+max.join(""), max.length];
  }
  function getMin(selectNum) {
    let min = [];
    if (botton.length === 0) return [0, 9999999];
    for (let i = 0; i < selectNum; i++) {
      min.push(botton[botton.length - 1]);
    }
    if (min.length === 0) return [0, 9999999];
    return [+min.join(""), min.length];
  }
}

console.log(solution(n, l, brokenBotton));
