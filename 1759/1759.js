var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

const [L, C] = input[0].split(" ").map(Number);
const arr = input[1].split(" ");

function solution(L, C, arr) {
  arr.sort((a, b) => {
    if (a < b) return -1;
    else return 1;
  });

  let combination = [];
  function getCombination(selectNum, index, combi) {
    if (selectNum === combi.length) {
      let str = combi.join("");
      let regex = new RegExp(/a|e|i|o|u/, "g");
      let match = str.match(regex);
      if (match && str.length - match.length >= 2) combination.push(str);
      return;
    }

    for (let i = index; i < arr.length; i++) {
      combi.push(arr[i]);
      getCombination(selectNum, i + 1, combi);
      combi.pop();
    }
  }

  getCombination(L, 0, []);

  return combination.join("\n");
}

console.log(solution(L, C, arr));
