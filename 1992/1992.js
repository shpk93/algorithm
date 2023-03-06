var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
// console.log(input);
const n = input[0];
const matrix = input.slice(1, n + 1).map((_) => _.split("").map(Number));

function solution(n, matrix) {
  function quadTree(starty, startx, size) {
    if (size === 1) return matrix[starty][startx];
    let answer = "";
    let target = matrix[starty][startx];

    for (let y = starty; y < starty + size; y++) {
      for (let x = startx; x < startx + size; x++) {
        if (matrix[y][x] !== target) {
          return (
            "(" +
            quadTree(starty, startx, size / 2) +
            quadTree(starty, startx + size / 2, size / 2) +
            quadTree(starty + size / 2, startx, size / 2) +
            quadTree(starty + size / 2, startx + size / 2, size / 2) +
            ")"
          );
        }
      }
    }
    answer += target;
    return answer;
  }

  return quadTree(0, 0, n);
}

console.log(solution(n, matrix));
