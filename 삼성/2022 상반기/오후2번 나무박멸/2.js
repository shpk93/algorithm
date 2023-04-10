// https://www.codetree.ai/frequent-problems/tree-kill-all/

var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);
let [n, m, k, c] = input[0].split(" ").map(Number);
let matrix = input.slice(1, 1 + n).map((el) => el.split(" ").map(Number));

function solution(n, m, k, c, matrix) {
  //나무는 매초당 1씩증가
  //번식은 성장한 값에 상하좌우이동가능한갯수로 나누고 나머지를 버린값
  //제초제는 4개의 대각선으로 이동. 나무가있는곳으로만 이동하며
  //c년만큼유지

  let dx = [0, 0, -1, 1, -1, -1, 1, 1];
  let dy = [1, -1, 0, 0, -1, 1, -1, 1];

  let answer = 0;

  // 제초제 유효시간이 적힌 행렬
  let removeMatrix = Array(n)
    .fill()
    .map((el) => Array(n).fill(0));

  // 작업시작
  for (let i = 0; i < m; i++) {
    grow(matrix);
    matrix = spread(matrix, removeMatrix);
    remove(matrix, removeMatrix);
  }

  return answer;

  // 나무 성장하는 함수 .
  function grow(matrix) {
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (matrix[y][x] > 0) {
          let count = 0;
          for (let i = 0; i < 4; i++) {
            let ny = y + dy[i];
            let nx = x + dx[i];
            if (!in_range(ny, nx)) continue;
            if (matrix[ny][nx] > 0 && !removeMatrix[ny][nx]) count++;
          }
          matrix[y][x] += count;
        }
        if (removeMatrix[y][x] > 0) removeMatrix[y][x]--;
      }
    }
  }

  // 지우고 제초제 뿌리는함수
  function remove(matrix, removeMatrix) {
    let max = 0;
    let maxPos = [0, 0];
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (matrix[y][x] > 0) {
          let count = checkRemoveDfs(y, x, matrix);
          if (max < count) {
            maxPos = [y, x];
            max = count;
          }
        }
      }
    }

    removeDfs(maxPos[0], maxPos[1], matrix, removeMatrix);
    answer += max;
  }

  // 가장 큰 곳 지우고 제초제 뿌리는함수
  function removeDfs(y, x, matrix, removeMatrix) {
    let stack = [];

    for (let i = 4; i < 8; i++) {
      stack.push([y, x, k, i]);
    }
    matrix[y][x] = 0;
    removeMatrix[y][x] = c + 1;
    while (stack.length) {
      let [y, x, rest, arrow] = stack.pop();
      let ny = y + dy[arrow];
      let nx = x + dx[arrow];
      if (!in_range(ny, nx)) continue;
      if (matrix[ny][nx] > 0) {
        matrix[ny][nx] = 0;
        removeMatrix[ny][nx] = c + 1;
        if (rest > 1) stack.push([ny, nx, rest - 1, arrow]);
      }
      if (matrix[ny][nx] === 0 || matrix[ny][nx] === -1) {
        removeMatrix[ny][nx] = c + 1;
      }
    }
  }

  // 가장큰곳 체크하는함수
  function checkRemoveDfs(y, x, matrix) {
    let count = matrix[y][x];
    let stack = [];

    for (let i = 4; i < 8; i++) {
      stack.push([y, x, k, i]);
    }

    while (stack.length) {
      let [y, x, rest, arrow] = stack.pop();
      let ny = y + dy[arrow];
      let nx = x + dx[arrow];
      if (!in_range(ny, nx)) continue;
      if (matrix[ny][nx] > 0) {
        count += matrix[ny][nx];
        if (rest > 1) stack.push([ny, nx, rest - 1, arrow]);
      }
    }

    return count;
  }

  // 범위체크 함수
  function in_range(y, x) {
    return !(y < 0 || x < 0 || x >= n || y >= n);
  }

  // 나무 번식시키는함수
  function spread(matrix, removeMatrix) {
    let copyMatrix = matrix.map((el) => el.slice());
    let stack = [];

    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (matrix[y][x] > 0) {
          stack.push([y, x]);
        }
      }
    }

    while (stack.length) {
      let [y, x] = stack.pop();

      let box = [];
      for (let i = 0; i < 4; i++) {
        let ny = y + dy[i];
        let nx = x + dx[i];
        if (!in_range(ny, nx) || removeMatrix[ny][nx] > 0) continue;
        if (matrix[ny][nx] === 0) {
          box.push([ny, nx]);
        }
      }

      if (box.length) {
        let count = Math.floor(matrix[y][x] / box.length);
        box.forEach(([ny, nx]) => {
          copyMatrix[ny][nx] = copyMatrix[ny][nx] + count;
        });
      }
    }
    return copyMatrix;
  }
}

console.log(solution(n, m, k, c, matrix));
