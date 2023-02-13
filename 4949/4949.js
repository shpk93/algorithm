var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

let commands = [];
for (let i = 0; i < input.length; i++) {
  if (input[i].length === 1 && input[i][0] === ".") break;
  else commands.push(input[i]);
}

let answer = "";
function solution(command) {
  let stack = [];

  for (let i = 0; i < command.length; i++) {
    if (command[i] === "(") stack.push("(");
    if (command[i] === "[") stack.push("[");
    if (command[i] === "]") {
      if (stack.length === 0 || stack[stack.length - 1] !== "[") return "no";
      stack.pop();
    }
    if (command[i] === ")") {
      if (stack.length === 0 || stack[stack.length - 1] !== "(") return "no";
      stack.pop();
    }
  }
  if (stack.length) {
    return "no";
  }
  return "yes";
}

commands.forEach((command) => (answer += solution(command) + "\n"));
console.log(answer);
