const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";

var input = require("fs")
  .readFileSync(filepath)
  .toString()
  .trim()
  .split(splitStr);

let [N, M, K] = input[0].split(" ").map(Number);
let matrix = input.slice(1, N + 1).map((el) => el.split("").map(Number));

class Node {
  constructor(y, x, b, s, t) {
    this.y = y;
    this.x = x;
    this.b = b;
    this.s = s;
    this.t = t;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  isEmpty() {
    if (this.length === 0) return true;
    else return false;
  }

  push(y, x, b, s, t) {
    let node = new Node(y, x, b, s, t);
    if (this.length === 0) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.length++;
  }

  shift() {
    let item = this.head;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }
    this.length--;
    return item;
  }
}

function solution(N, M, K, matrix) {
  let dy = [0, 0, -1, 1];
  let dx = [1, -1, 0, 0];

  let visit = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => K + 1)
  );

  // // [y,x,깬벽,밤낮,시간]

  let queue = new Queue();
  queue.push(0, 0, 0, true, 1);

  while (!queue.isEmpty()) {
    let { y, x, b, s, t } = queue.shift();
    if (y === N - 1 && x === M - 1) {
      return t;
    }
    for (let i = 0; i < 4; i++) {
      let ny = y + dy[i];
      let nx = x + dx[i];
      let ns = !s;
      if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
      let nb = matrix[ny][nx] + b;
      if (nb >= visit[ny][nx]) continue;
      if (matrix[ny][nx] === 0) {
        visit[ny][nx] = nb;
        queue.push(ny, nx, nb, ns, t + 1);
      } else {
        // 벽일때
        if (s) {
          // 아침일때는 벽뿌수기
          visit[ny][nx] = nb;
          queue.push(ny, nx, nb, ns, t + 1);
        } else {
          // 저녁일때
          queue.push(y, x, b, ns, t + 1);
        }
      }
    }
  }

  return -1;
}

console.log(solution(N, M, K, matrix));
