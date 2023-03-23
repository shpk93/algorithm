var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";

var input = fs.readFileSync(filepath).toString().split(splitStr);

let [N, M, K] = input[0].split(" ").map(Number);
let matrix = input.slice(1, N + 1).map((el) => el.split("").map(Number));

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

function solution(N, M, K, matrix) {
  let isVisit = Array.from({ length: N }, () => {
    return Array.from({ length: M }, () =>
      Array.from({ length: K + 1 }, () => Infinity)
    );
  });
  let answer = -1;
  let queue = new Queue();
  queue.push([0, 0, 1, 0]);
  isVisit[0][0][0] = 1;
  while (queue.size()) {
    bfs(...queue.pop());
  }

  console.log(answer);
  function bfs(y, x, dist, rock) {
    let dx = [0, 0, 1, -1];
    let dy = [1, -1, 0, 0];

    if (y === N - 1 && x === M - 1) {
      let max = Math.min(...isVisit[N - 1][M - 1]);
      if (max !== Infinity) answer = max;
      return;
    }

    for (let i = 0; i < dx.length; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (nx < 0 || ny < 0 || ny >= N || nx >= M) continue;

      if (matrix[ny][nx] === 0 && isVisit[ny][nx][rock] > dist + 1) {
        isVisit[ny][nx][rock] = dist + 1;
        queue.push([ny, nx, dist + 1, rock]);
      }
      if (matrix[ny][nx] === 1) {
        if (rock < K + 1 && isVisit[ny][nx][rock + 1] > dist + 1) {
          isVisit[ny][nx][rock + 1] = dist + 1;
          queue.push([ny, nx, dist + 1, rock + 1]);
        }
      }
    }
  }
}

solution(N, M, K, matrix);
