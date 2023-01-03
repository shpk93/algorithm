var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
const n = +input[0];
const arr = input.slice(1, n + 1);
function solution(n, arr) {
  let deque = Array(200005).fill(-1);
  let mid = Math.floor(deque.length / 2);
  let front = mid;
  let back = mid;
  let size = 0;
  let answer = "";
  let d_push_front = (item) => {
    while (deque[front] !== -1) {
      front--;
    }
    deque[front] = item;
    size++;
  };
  let d_push_back = (item) => {
    while (deque[back] !== -1) {
      back++;
    }
    deque[back] = item;
    size++;
  };
  let d_pop_back = () => {
    let item = deque[back];
    if (item !== -1) {
      deque[back] = -1;
      back--;
      size--;

      if (back < front) {
        front = back;
      }
    }
    return item;
  };
  let d_pop_front = () => {
    let item = deque[front];
    if (item !== -1) {
      deque[front] = -1;
      front++;
      size--;
      if (back < front) {
        back = front;
      }
    }
    return item;
  };
  let d_size = () => {
    return size;
  };
  let d_empty = () => {
    return size === 0 ? 1 : 0;
  };
  let d_front = () => {
    return deque[front];
  };
  let d_back = () => {
    return deque[back];
  };

  arr.forEach((el) => {
    let [cmd, item] = el.split(" ");
    if (cmd === "push_back") {
      d_push_back(item);
    }
    if (cmd === "push_front") {
      d_push_front(item);
    }
    if (cmd === "pop_front") {
      let item = d_pop_front();
      answer += item + "\n";
    }
    if (cmd === "pop_back") {
      let item = d_pop_back();
      answer += item + "\n";
    }
    if (cmd === "size") {
      answer += d_size() + "\n";
    }
    if (cmd === "empty") {
      answer += d_empty() + "\n";
    }
    if (cmd === "front") {
      answer += d_front() + "\n";
    }
    if (cmd === "back") {
      answer += d_back() + "\n";
    }
  });
  return answer;
}

console.log(solution(n, arr));
