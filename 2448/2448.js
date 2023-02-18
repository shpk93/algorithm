var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString();
const n = +input;

function solution(n) {
  let l = n * 2;
  let h = n;
  let matrix = Array.from({ length: h }, () => Array(l).fill(" "));

  function rec(starty, startx, l, h) {
    if (h === 3) {
      for (let x = startx; x < startx + l - 1; x++) {
        matrix[starty + 2][x] = "*";
      }
      let boolean = true;
      for (let x = startx + 1; x < startx + l - 2; x++) {
        if (boolean) matrix[starty + 1][x] = "*";
        boolean = !boolean;
      }
      matrix[starty][startx + 2] = "*";
    } else {
      rec(starty, startx + l / 4, l / 2, h / 2);
      rec(starty + h / 2, startx, l / 2, h / 2);
      rec(starty + h / 2, startx + l / 2, l / 2, h / 2);
    }
  }
  rec(0, 0, l, h);

  matrix.forEach((_, i) => {
    matrix[i] = matrix[i].join("");
  });
  return matrix.join("\n");
}

console.log(solution(n));
