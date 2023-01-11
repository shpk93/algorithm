var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

const N = +input[0];
const S = input.slice(1, N + 1).map((el) => el.split(" ").map(Number));

function solution(N, S) {
  let selectNum = N / 2;

  let answer = Infinity;
  let isUsed = Array(N).fill(0);

  function getScore(team) {
    let score = 0;

    for (let i = 0; i < team.length; i++) {
      let person1 = team[i];
      for (let j = i + 1; j < team.length; j++) {
        let person2 = team[j];
        score += S[person1][person2] + S[person2][person1];
      }
    }
    return score;
  }

  function getCombination(index, arr) {
    if (arr.length === selectNum) {
      let team1 = arr;
      let team2 = [];
      isUsed.forEach((el, i) => {
        if (el === 0) team2.push(i);
      });

      let score = getScore(team1) - getScore(team2);
      answer = Math.min(Math.abs(score), answer);
      return;
    }

    for (let i = index; i < N; i++) {
      isUsed[i] = 1;
      arr.push(i);
      getCombination(i + 1, arr);
      arr.pop();
      isUsed[i] = 0;
    }
  }
  getCombination(0, []);

  return answer;
}
console.log(solution(N, S));
