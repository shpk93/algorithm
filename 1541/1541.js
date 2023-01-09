var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString();

function solution(input) {
  a = input.split(/\-|\+/);

  a.forEach((el, i) => {
    a[i] = +el.replace(/(^0+)/, "");
  });

  b = input.match(/\-|\+/g);

  if (a.length === 1) return input;
  if (a.length !== b.length) b.unshift("+");

  let arr = [];
  let stack = [];
  b.forEach((el, i) => {
    if (el === "+") {
      stack.push(a[i]);
    } else {
      arr.push(stack.reduce((a, b) => a + b, 0));
      stack = [a[i]];
    }
  });
  if (stack.length) arr.push(stack.reduce((a, b) => a + b, 0));
  return arr.reduce((a, b) => a - b);
}

console.log(solution(input));
