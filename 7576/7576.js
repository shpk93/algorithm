var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
const [N, M] = input[0].split(" ").map(Number);
const matrix = input.slice(1, M + 1).map((el) => el.split(" ").map(Number));

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

  push(value) {
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

  shift() {
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

function solution(N, M, matrix) {
  //N은 가로
  //M은 세로
  let queue = new Queue();

  for (let y = 0; y < M; y++) {
    for (let x = 0; x < N; x++) {
      if (matrix[y][x] === 1) {
        queue.push([y, x]);
      }
    }
  }
  let answer = 0;
  function bfs(y, x) {
    let dy = [0, 0, 1, -1];
    let dx = [1, -1, 0, 0];

    for (let i = 0; i < dx.length; i++) {
      let ny = dy[i] + y;
      let nx = dx[i] + x;

      if (ny < 0 || nx < 0 || ny >= M || nx >= N) continue;

      if (matrix[ny][nx] === 0) {
        matrix[ny][nx] = matrix[y][x] + 1;
        queue.push([ny, nx]);
      }
    }
  }
  while (queue.Size()) {
    bfs(...queue.shift());
  }

  for (let y = 0; y < M; y++) {
    for (let x = 0; x < N; x++) {
      if (matrix[y][x] > answer) {
        answer = matrix[y][x];
      }
      if (matrix[y][x] === 0) return -1;
    }
  }
  return answer - 1;
}

console.log(solution(N, M, matrix));
