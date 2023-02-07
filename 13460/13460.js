var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

let [N, M] = input[0].split(" ").map(Number);
let matrix = [];
for (let i = 1; i < N + 1; i++) {
  matrix.push(input[i].split(""));
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
  let answer = Infinity;
  function rotate(matrix) {
    let newMatrix = Array(matrix[0].length)
      .fill(0)
      .map((el) => Array(matrix.length).fill("#"));

    for (let y = 1; y < newMatrix.length - 1; y++) {
      for (let x = 1; x < newMatrix[0].length - 1; x++) {
        newMatrix[y][x] = matrix[x][newMatrix.length - y - 1];
      }
    }

    return newMatrix;
  }

  let queue = new Queue();
  queue.push([matrix, 1]);

  function bfs(matrix, count) {
    if (count >= 11) return;
    let rotateArr = [];
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        let newmatrix = [];
        matrix.forEach((el) => newmatrix.push(el.slice()));
        rotateArr.push(newmatrix);
      } else {
        rotateArr[i] = rotate(rotateArr[i - 1]);
      }
    }
    for (let i = 0; i < rotateArr.length; i++) {
      let find = move(rotateArr[i]);
      if (find === 1) {
        answer = count;
        queue = new Queue();
        return;
      } else if (find === -1) continue;
      else {
        queue.push([rotateArr[i], count + 1]);
      }
    }
  }

  while (queue.Size()) {
    bfs(...queue.shift());
  }
  function move(matrix) {
    //0은 아직찾지못함 ,
    //1은 찾음
    //-1은 불가능함
    let moveBoolean = false;
    let Rpos = [0, 0, "R"];
    let Bpos = [0, 0, "B"];
    for (let y = 1; y < matrix.length - 1; y++) {
      for (let x = 1; x < matrix[0].length - 1; x++) {
        if (matrix[y][x] === "B") {
          Bpos = [y, x, "B"];
        }
        if (matrix[y][x] === "R") {
          Rpos = [y, x, "R"];
        }
      }
    }
    let arr = [Rpos, Bpos];
    let Rfind = 0;
    let Bfind = 0;
    arr.sort((a, b) => a[1] - b[1]);

    while (arr.length) {
      dfs2(...arr.pop());
    }

    function dfs2(y, x, shape) {
      let ny = y;
      let nx = x + 1;
      if (nx >= matrix[0].length || matrix[ny][nx] === "#") return;
      if (matrix[ny][nx] === "O") {
        matrix[y][x] = ".";
        if (shape === "R") Rfind = 1;
        if (shape === "B") Bfind = 1;
        return;
      }
      if (matrix[ny][nx] === ".") {
        moveBoolean = true;
        matrix[y][x] = ".";
        matrix[ny][nx] = shape;
        return dfs2(ny, nx, shape);
      }
    }
    if (Bfind) return -1;
    if (Rfind) return 1;
    if (!moveBoolean) return -1;
    return 0;
  }
  return answer === Infinity ? -1 : answer;
}

console.log(solution(N, M, matrix));
