var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

var input = fs.readFileSync(filepath).toString().split(" ").map(Number);

class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(item) {
    const node = new Node(item);
    if (this.head == null) {
      this.head = node;
      this.head.next = null;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
    this.length += 1;
  }

  pop() {
    const popItem = this.head;
    this.head = this.head.next;
    this.length -= 1;
    return popItem.item;
  }

  size() {
    return this.length;
  }
}

function solution(N, K) {
  let isVisit = new Array(200000).fill(false);
  let isVisit2 = new Array(200000).fill(false);
  if (N === K) {
    console.log(0);
    console.log(N);
    return;
  }

  let answer = 0;
  let queue = new Queue();
  queue.push([0, N]);
  isVisit[N] = true;

  let bfs = (time, now) => {
    let dx = [-1, 1, now];

    for (let i = 0; i < dx.length; i++) {
      let nx = now + dx[i];
      if (nx < 0 || nx >= isVisit.length) continue;
      if (isVisit[nx] === false) {
        isVisit[nx] = true;
        isVisit2[nx] = now;
        if (nx === K) {
          answer = time + 1;
          queue = new Queue();
          return;
        } else {
          queue.push([time + 1, nx]);
        }
      }
    }
  };

  while (queue.size()) {
    bfs(...queue.pop());
  }
  let stack = [K];

  while (true) {
    if (isVisit2[stack[stack.length - 1]] !== false) {
      stack.push(isVisit2[stack[stack.length - 1]]);
    } else {
      break;
    }
  }
  stack = stack.reverse();
  console.log(answer);
  console.log(stack.join(" "));
}

solution(...input);
