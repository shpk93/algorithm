var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
const k = +input[0];
let commands = [];
let index = 1;
let time = 0;
while (time < k) {
  commands.push(input.slice(index, index + 3));
  index += 3;
  time++;
}
class Deque {
  constructor() {
    this.data = Array(200005).fill(-1);
    this.size = 0;
    this.front = 200004 / 2;
    this.back = 200004 / 2;
  }
  push_front(item) {
    this.data[--this.front] = item;
    this.size++;
  }
  push_back(item) {
    this.data[this.back++] = item;
    this.size++;
  }
  pop_back() {
    if (this.size === 0) return -1;
    let item = this.data[this.back - 1];
    this.size--;
    this.back--;
    return item;
  }
  pop_front() {
    if (this.size === 0) return -1;
    let item = this.data[this.front];
    this.front++;
    this.size--;
    return item;
  }
  travel() {
    return this.data.slice(this.front, this.back);
  }
}
function solution(k, command) {
  let reverse = false;
  let deque = new Deque();

  let [cmd, n, p] = command;
  p = JSON.parse(p);
  p.forEach((num) => {
    deque.push_back(num);
  });

  for (let i = 0; i < cmd.length; i++) {
    if (cmd[i] === "R") {
      reverse = !reverse;
    }
    if (cmd[i] === "D") {
      if (deque.size === 0) return "error";
      if (reverse) {
        deque.pop_back();
      } else {
        deque.pop_front();
      }
    }
  }
  return reverse
    ? JSON.stringify(deque.travel().reverse())
    : JSON.stringify(deque.travel());
}
commands.forEach((command) => {
  console.log(solution(k, command));
});
