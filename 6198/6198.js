var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

let n = +input[0];
let arr = input.slice(1, n + 1).map(Number);

function solution(n, arr) {
  let answer = 0;
  let stack = [];
  class bilding {
    constructor(value, index) {
      this.index = index;
      this.value = value;
      this.view = 0;
      this.same = 0;
    }
  }

  //요소보다 탑이 작거나 같으면  스택에서 빼고
  //정답에 스택에 길이만큼 더하고
  // 아니면 스택에 넣는다.

  for (let i = 0; i < arr.length; i++) {
    if (stack.length === 0) {
      stack.push(new bilding(arr[i], i));

      continue;
    }
    if (stack[stack.length - 1].value > arr[i]) {
      stack[stack.length - 1].view++;
      stack.push(new bilding(arr[i], i));
    } else if (stack[stack.length - 1].value === arr[i]) {
      stack[stack.length - 1].same++;
    } else {
      let same = false;
      while (stack.length && stack[stack.length - 1].value <= arr[i]) {
        let pop = stack.pop();
        if (arr[i] === pop.value) {
          same = true;
          stack.push(pop);
          i--;
          break;
        }
        if (stack.length) {
          stack[stack.length - 1].view += pop.view + pop.same;
          if (stack[stack.length - 1].value > arr[i])
            stack[stack.length - 1].view++;
        }
        answer += pop.view;
      }
      if (!same) {
        stack.push(new bilding(arr[i], i));
      }
    }
  }
  while (stack.length) {
    let pop = stack.pop();
    answer += pop.view;
  }

  console.log(answer);
}

solution(n, arr);
