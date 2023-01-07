var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

let N = +input[0];

let board = [];
for (let i = 1; i < N + 1; i++) {
  board.push(input[i].split(" ").slice(0, N).map(Number));
}

function solution(board) {
  let answer = 0;
  let arr = [0, 1, 2, 3];
  let box = [];
  function getcombination(combi) {
    if (combi.length === 5) {
      box.push(combi.slice());
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      getcombination([...combi, arr[i]]);
    }
  }
  getcombination([]);

  let copyBoard = [];

  box.forEach((combi) => {
    board.forEach((el, i) => {
      copyBoard[i] = el.slice();
    });
    combi.forEach((num) => {
      for (let i = 0; i < num; i++) {
        copyBoard = rotate(copyBoard);
      }
      leftSum(copyBoard);
    });
    count(copyBoard);
  });

  function count(board) {
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[0].length; x++) {
        answer = Math.max(board[y][x], answer);
      }
    }
  }

  function rotate(board) {
    let newBoard = [];
    for (let i = 0; i < N; i++) {
      newBoard.push(Array(N).fill(0));
    }
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        newBoard[y][x] = board[N - 1 - x][y];
      }
    }
    return newBoard;
  }

  function leftSum(board) {
    for (let y = 0; y < N; y++) {
      let newArr = Array(N).fill(0);
      let newArrIndex = 0;
      for (let x = 0; x < N; x++) {
        if (board[y][x] === 0) continue;
        if (newArr[newArrIndex] === 0) {
          newArr[newArrIndex] = board[y][x];
        } else if (newArr[newArrIndex] === board[y][x]) {
          newArr[newArrIndex] = newArr[newArrIndex] * 2;
          newArrIndex++;
        } else {
          newArrIndex++;
          newArr[newArrIndex] = board[y][x];
        }
      }
      for (let x = 0; x < N; x++) {
        board[y][x] = newArr[x];
      }
    }
  }
  return answer;
}

console.log(solution(board));
