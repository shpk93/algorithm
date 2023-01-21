var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
input = +input[0];

function solution(a) {
  for (let i = 0; i < a; i++) {
    let str = "";
    for (let j = 0; j < 2 * a - 1 - i; j++) {
      if (j >= i) str += "*";
      else str += " ";
    }
    console.log(str);
  }
  for (let i = 1; i < a; i++) {
    let str = "";
    let left = a - i - 1;
    for (let j = 0; j < a + i; j++) {
      if (j < left) str += " ";
      else str += "*";
    }
    console.log(str);
  }
}

solution(input);
