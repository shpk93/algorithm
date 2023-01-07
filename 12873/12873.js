var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString();

const N = +input;

function solution(N) {
  let people = [];

  for (let i = 1; i <= N; i++) {
    people.push(i);
  }

  let stage = 1;
  let start = 0;
  while (people.length !== 1) {
    start = ((stage ** 3 + start) % people.length) - 1;
    if (start < 0) start = people.length - 1;
    people.splice(start, 1);

    stage++;
  }

  return people[0];
}

console.log(solution(N));
