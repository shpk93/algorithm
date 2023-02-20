var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

const [N, M, G, R] = input[0].split(" ").map(Number);
const arr = input.slice(1, N + 1).map((_) => _.split(" ").map(Number));
class NodeQueue {
  constructor(value) {
    this.next = null;
    this.value = value;
  }
}
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  add(value) {
    let nodeQueue = new NodeQueue(value);
    if (this.size == 0) {
      this.head = nodeQueue;
    } else {
      this.tail.next = nodeQueue;
    }
    this.tail = nodeQueue;
    this.size++;
  }
  popleft() {
    if (this.size == 0) {
      return null;
    }
    let value = this.head.value;
    this.head = this.head.next;
    this.size--;
    if (this.size == 0) {
      this.tail = null;
    }
    return value;
  }
  isEmpty() {
    return this.size == 0;
  }
}

function solution(N, M, G, R, matrix) {
  let combination = [];
  let answer = 0;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (matrix[y][x] === 2) {
        combination.push([y, x]);
      }
    }
  }

  function travel(Rcount, Gcount, nowIndex, nowArr) {
    if (Rcount === R && Gcount === G) {
      let count = bfs(nowArr);
      answer = Math.max(count, answer);
      return;
    }
    for (let i = nowIndex; i < combination.length; i++) {
      if (Gcount < G) {
        nowArr.push([...combination[i], "G", 0]);
        travel(Rcount, Gcount + 1, i + 1, nowArr);
        nowArr.pop();
      }
      if (Rcount < R) {
        nowArr.push([...combination[i], "R", 0]);
        travel(Rcount + 1, Gcount, i + 1, nowArr);
        nowArr.pop();
      }
    }
  }

  travel(0, 0, 0, []);

  function bfs(arr) {
    const visit = Array.from({ length: N }, () =>
      Array(M)
        .fill()
        .map((_) => [Infinity, null])
    );

    let queue = new Queue();
    let dy = [0, 0, -1, 1];
    let dx = [1, -1, 0, 0];
    for (let i = 0; i < arr.length; i++) {
      let [y, x, j, time] = arr[i];
      visit[y][x][0] = time;
      visit[y][x][1] = j;
      queue.add([y, x, j, time]);
    }
    while (!queue.isEmpty()) {
      let [y, x, j, time] = queue.popleft();
      if (visit[y][x][1] === "F") continue;
      for (let i = 0; i < dy.length; i++) {
        let ny = y + dy[i];
        let nx = x + dx[i];
        if (ny < 0 || nx < 0 || ny >= N || nx >= M || matrix[ny][nx] === 0)
          continue;

        if (visit[ny][nx][0] === time + 1 && visit[ny][nx][1] !== j) {
          visit[ny][nx][0] = -1;
          visit[ny][nx][1] = "F";
        }
        if (visit[ny][nx][0] > time + 1) {
          visit[ny][nx][0] = time + 1;
          visit[ny][nx][1] = j;
          queue.add([ny, nx, j, time + 1]);
        }
      }
    }
    let count = 0;
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        if (visit[y][x][1] === "F") {
          count++;
        }
      }
    }
    return count;
  }

  return answer;
}

console.log(solution(N, M, G, R, arr));
