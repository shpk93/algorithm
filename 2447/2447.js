var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString();
const n = +input;

function solution(n) {
  let matrix = Array.from({ length: n }, () => Array(n).fill(" "));

  function rec(size, starty, startx) {
    if (size === 3) {
      for (let y = starty; y < starty + size; y++) {
        for (let x = startx; x < startx + size; x++) {
          if (y % 3 === 1 && x % 3 === 1) continue;
          matrix[y][x] = "*";
        }
      }
    } else {
      rec(size / 3, starty, startx);
      rec(size / 3, starty, startx + size / 3);
      rec(size / 3, starty, startx + 2 * (size / 3));
      rec(size / 3, starty + size / 3, startx);
      rec(size / 3, starty + size / 3, startx + 2 * (size / 3));
      rec(size / 3, starty + 2 * (size / 3), startx);
      rec(size / 3, starty + 2 * (size / 3), startx + size / 3);
      rec(size / 3, starty + 2 * (size / 3), startx + 2 * (size / 3));
    }
  }
  rec(n, 0, 0);

  matrix.forEach((_, i) => (matrix[i] = matrix[i].join("")));
  return matrix.join("\n");
}

console.log(solution(n));
