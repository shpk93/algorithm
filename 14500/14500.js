var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

let [N, M] = input[0].split(" ").map(Number);
let matrix = [];
let answer = 0;
for (let i = 1; i < N + 1; i++) {
  matrix.push(input[i].split(" ").map(Number));
}

function solution(N, M, matrix) {
  let block = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 1],
    ],
  ];
  let arr = [];

  block.forEach((el) => rotate(el, 0));

  function rotate(block, num) {
    if (num === 4) return;
    if (num === 0) arr.push(block);
    let h = 0;
    let r = 0;
    let minh = Infinity;
    let minr = Infinity;
    block.forEach(([y, x]) => {
      h = Math.max(h, y);
      r = Math.max(r, x);
      minh = Math.min(minh, y);
      minr = Math.min(minr, x);
    });

    let newBlock = [];

    block.forEach(([y, x], i) => {
      newBlock.push([x, r - y + 1]);
    });

    let minArr = newBlock.reduce(
      (a, b) => [Math.min(a[0], b[0]), Math.min(a[1], b[1])],
      [Infinity, Infinity]
    );
    newBlock.forEach((el, i) => {
      newBlock[i][0] = el[0] - minArr[0];
      newBlock[i][1] = el[1] - minArr[1];
    });
    arr.push(newBlock);

    let newBlock2 = [];
    block.forEach(([y, x], i) => {
      newBlock2[i] = [y, Math.abs(x - r)];
    });

    arr.push(newBlock2);
    rotate(newBlock, num + 1);
  }

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      for (let i = 0; i < arr.length; i++) {
        go(arr[i], y, x, 0);
      }
    }
  }

  function go(blockArr, y, x) {
    let sum = 0;
    for (let i = 0; i < blockArr.length; i++) {
      let [dy, dx] = blockArr[i];
      let ny = dy + y;
      let nx = dx + x;
      if (ny < 0 || nx < 0 || ny >= N || nx >= M) return;
      sum += matrix[ny][nx];
    }
    answer = Math.max(sum, answer);
  }

  return answer;
}

console.log(solution(N, M, matrix));
