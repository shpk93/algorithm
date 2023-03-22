var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

input.forEach((el) => {
  solution(el);
});

function solution(S) {
  let isReading = true;
  let readArr = [];
  let answer = "";
  for (let i = 0; i < S.length; i++) {
    if (S[i] === "<") {
      if (readArr.length) {
        answer += readArr.reverse().join("");
        readArr = [];
      }
      isReading = false;
      answer += S[i];
      continue;
    }
    if (S[i] === ">") {
      isReading = true;
      answer += S[i];
      continue;
    }
    if (!isReading) {
      answer += S[i];
    } else {
      if (S[i] === " ") {
        answer += readArr.reverse().join("") + " ";
        readArr = [];
      } else {
        readArr.push(S[i]);
      }
    }
  }
  if (readArr.length) {
    answer += readArr.reverse().join("");
  }
  console.log(answer);
}
