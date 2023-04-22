var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);
let [N, M, K] = input[0].split(" ").map(Number);
let A = input.slice(1, N + 1).map((el) => el.split(" ").map(Number));
let tree = input.slice(1 + N, 1 + N + M).map((el) => el.split(" ").map(Number));

// 삼성 기출 나무 재테크

function solution(N, M, K, A, tree) {
  //N가로세로길이 ,K년,A는 양분추가배열, tree는 초기트리

  // 양분 맵을 만들고 양분을 5로 초기화
  // 트리 맵을 만들고 초기 트리 박아놓기
  // 계절별 함수 만들기.

  let treeBoard = Array(N)
    .fill()
    .map((_) =>
      Array(N)
        .fill(0)
        .map((_) => Array())
    );

  let lifeBoard = Array(N)
    .fill()
    .map((_) => Array(N).fill(5));

  tree.sort((a, b) => b[2] - a[2]);
  tree.forEach(([y, x, z]) => {
    treeBoard[y - 1][x - 1].push(z);
  });

  let dieTrees = [];

  for (let i = 0; i < K; i++) {
    spring();
    summmer();
    fall();
    winter();
  }

  return countTree();

  //
  function spring() {
    // 나이만큼 양분먹고 나이 1 증가
    // 큐가 없어서 뒤에서 부터 순회
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if (treeBoard[y][x].length) {
          let nextTree = [];
          let life = lifeBoard[y][x];
          for (let i = treeBoard[y][x].length - 1; i >= 0; i--) {
            let age = treeBoard[y][x][i];
            if (life - age < 0) {
              dieTrees.push([y, x, age]);
            } else {
              life -= age;
              nextTree.push(age + 1);
            }
          }
          treeBoard[y][x] = nextTree.reverse();
          lifeBoard[y][x] = life;
        }
      }
    }
  }

  function summmer() {
    // 죽은나무 양분으로 추가
    dieTrees.forEach(([y, x, age]) => {
      let pluslife = Math.floor(age / 2);
      lifeBoard[y][x] += pluslife;
    });
    dieTrees = [];
  }

  function fall() {
    //  5의배수 나무 팔방으로 번식
    let dx = [0, 0, -1, 1, -1, -1, 1, 1];
    let dy = [1, -1, 0, 0, 1, -1, -1, 1];

    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if (treeBoard[y][x].length) {
          treeBoard[y][x].forEach((age) => {
            if (age % 5 === 0) {
              for (let i = 0; i < dx.length; i++) {
                let ny = y + dy[i];
                let nx = x + dx[i];
                if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
                treeBoard[ny][nx].push(1);
              }
            }
          });
        }
      }
    }
  }

  function winter() {
    // 양분추가
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        lifeBoard[y][x] += A[y][x];
      }
    }
  }

  function countTree() {
    // 살아있는 나무 리턴
    let count = 0;
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if (treeBoard[y][x].length) {
          count += treeBoard[y][x].length;
        }
      }
    }
    return count;
  }
}

console.log(solution(N, M, K, A, tree));
