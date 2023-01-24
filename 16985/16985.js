var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

let boardBox = [];

let board = [];
for (let i = 0; i < 25; i++) {
  board.push(input[i].split(" ").map(Number));
  if (board.length === 5) {
    boardBox.push(board);
    board = [];
  }
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

function solution(boardBox) {
  let arr = [0, 1, 2, 3, 4];
  let isUsed = [0, 0, 0, 0, 0];
  let dy = [0, 0, 1, -1, 0, 0];
  let dx = [1, -1, 0, 0, 0, 0];
  let dz = [0, 0, 0, 0, 1, -1];
  // 순열배열에 들어있는것
  // [[박스번호,회전수],  ~ ]

  // 각 보드별로 회전한 4개의 경우의 수를 배열로 담음
  // ex) boardBoxWithRotate[0][2]     =   0번째 보드를 2번 회전한보드
  let boardBoxWithRotate = [];
  let queue = new Queue();
  let answer = Infinity;

  boardBox.forEach((board) => {
    let arr = [];
    for (let i = 0; i < 4; i++) {
      if (i === 0) arr.push(board);
      else {
        arr.push(rotate(arr[i - 1]));
      }
    }
    boardBoxWithRotate.push(arr);
  });

  getpermutation([], 0);

  return answer === Infinity ? -1 : answer;

  function bfs(z, y, x, visit, boardBox) {
    for (let i = 0; i < dy.length; i++) {
      let ny = dy[i] + y;
      let nx = dx[i] + x;
      let nz = dz[i] + z;

      if (ny < 0 || nx < 0 || nz < 0 || ny >= 5 || nx >= 5 || nz >= 5) continue;
      if (boardBox[nz][ny][nx] === 0) continue;
      if (visit[nz][ny][nx] === 0) {
        visit[nz][ny][nx] = visit[z][y][x] + 1;
        queue.push([nz, ny, nx, visit, boardBox]);
      }
    }
  }
  function rotate(matrix) {
    let newMatrix = Array.from({ length: 5 }, () => Array(5).fill(0));

    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[0].length; x++) {
        newMatrix[y][x] = matrix[5 - x - 1][y];
      }
    }
    return newMatrix;
  }
  function getpermutation(permu, index) {
    if (answer === 12) return;
    if (permu.length === 5) {
      let boardBox = Array(5);
      permu.forEach(([boxNumber, lotateNumber], i) => {
        boardBox[i] = boardBoxWithRotate[boxNumber][lotateNumber];
      });

      if (boardBox[0][0][0] === 1 && boardBox[4][4][4] === 1) {
        let visit = [];
        for (let i = 0; i < 5; i++) {
          visit.push(Array.from({ length: 5 }, () => Array(5).fill(0)));
        }
        visit[0][0][0] = 1;
        queue.push([0, 0, 0, visit, boardBox]);
        while (queue.Size()) {
          bfs(...queue.shift());
        }
        if (visit[4][4][4] !== 0) answer = Math.min(answer, visit[4][4][4] - 1);
      }
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (isUsed[i]) continue;
      isUsed[i] = 1;
      for (let j = 0; j < 4; j++) {
        permu.push([i, j]);
        getpermutation(permu, index + 1);
        if (answer === 12) return;
        permu.pop();
      }
      isUsed[i] = 0;
    }
  }
}
console.log(solution(boardBox));
