var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

let N = +input[0].split(" ")[0];
let K = +input[0].split(" ")[1];
// console.log(map);
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  enqueue(value) {
    const node = new Node(value);
    this.size++;
    if (!this.front) {
      this.front = node;
      this.rear = node;
    } else {
      this.rear.next = node;
      this.rear = node;
    }
  }

  dequeue() {
    if (!this.front) {
      return null;
    }
    this.size--;
    if (this.size < 0) this.size = 0;
    const node = this.front;
    this.front = this.front.next;
    if (!this.front) {
      this.rear = null;
    }
    return node.value;
  }
  empty() {
    return this.front === null;
  }
  Size() {
    return this.size;
  }
}

function solution(N, K) {
  let queue = new Queue();
  queue.enqueue([N, K, 0]);
  let answer = -1;
  let hash = {};
  while (queue.Size()) {
    bfs(...queue.dequeue());
    if (answer !== -1) break;
  }

  console.log(answer);
  function bfs(N, K, time) {
    // console.log(N, K, time);
    if (N === K) {
      console.log("찾음");
      answer = time;
      return;
    }
    let n = [N + 1, N - 1, N * 2];

    let nTime = time + 1;
    let nK = K + nTime;

    if (nK > 500000) nK = 500000;
    for (let i = 0; i < n.length; i++) {
      let nx = n[i];

      if (nx < 0 || nx > 500000 || hash[String(nx) + String(nK)]) continue;
      hash[String(nx) + String(nK)] = true;
      queue.enqueue([nx, nK, nTime]);
    }
  }
}

solution(N, K);
