var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

let [N, M] = input[0].split(" ").map(Number);
let matrix = [];
for (let i = 1; i < N + 1; i++) {
  matrix.push(input[i].split(" ").map(Number));
}
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
  // matrix.forEach((el) => console.log(el.join("")));

  let time = 0;

  let cheese = 0;

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      if (matrix[y][x] === 1) {
        cheese++;
      }
    }
  }

  if (cheese === 0) return time;

  // 4변중 2변 이상

  function airbfs(matrix) {
    let air = Array(N)
      .fill(0)
      .map((el) => Array(M).fill(0));

    let queue = new Queue();

    for (let y = 0; y < air.length; y++) {
      for (let x = 0; x < air[0].length; x++) {
        if (air[y][x] === 0 && matrix[y][x] === 0) {
          queue.push([y, x]);
          break;
        }
      }
    }

    let dy = [0, 0, -1, 1];
    let dx = [1, -1, 0, 0];

    while (queue.Size()) {
      let [y, x] = queue.shift();

      for (let i = 0; i < dy.length; i++) {
        let ny = y + dy[i];
        let nx = x + dx[i];
        if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;

        if (air[ny][nx] === 0 && matrix[ny][nx] === 0) {
          air[ny][nx] = 1;
          queue.push([ny, nx]);
        }
      }
    }
    return air;
  }

  function remove(air, matrix) {
    let dy = [0, 0, -1, 1];
    let dx = [1, -1, 0, 0];

    let removeCount = 0;
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[0].length; x++) {
        if (matrix[y][x] === 1) {
          let checkCount = 0;
          for (let i = 0; i < dy.length; i++) {
            let ny = y + dy[i];
            let nx = x + dx[i];
            if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
            if (air[ny][nx] === 1) {
              checkCount++;
            }
          }
          if (checkCount >= 2) {
            matrix[y][x] = 0;
            removeCount++;
          }
        }
      }
    }
    return removeCount;
  }
  while (cheese > 0) {
    let air = airbfs(matrix);
    let removeCount = remove(air, matrix);
    cheese -= removeCount;

    time++;
  }

  return time;
}

console.log(solution(N, M, matrix));
