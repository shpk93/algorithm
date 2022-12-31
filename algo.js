var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

let [N, M] = input[0].trim().split(" ").map(Number);
let truePeople = input[1].trim().split(" ").map(Number);
truePeople.shift();
let party = [];

if (M > 0) {
  for (let i = 2; i < 2 + M; i++) {
    let a = input[i].trim().split(" ").map(Number);
    a.shift();
    party.push(a);
  }
}

function solution(N, M, truePeople, party) {
  let set = new Set();
  let answer = M;
  if (M === 0) return 0;
  if (truePeople.length === 0) return M;
  truePeople.forEach((el) => {
    set.add(el);
  });

  let visit = Array(party.length).fill(0);

  function check() {
    let move = 0;
    party.forEach((arr, j) => {
      for (let i = 0; i < arr.length; i++) {
        let n = arr[i];
        if (set.has(n) && visit[j] === 0) {
          arr.forEach((el) => set.add(el));
          visit[j] = 1;
          move = 1;
          break;
        }
      }
    });
    if (move) check();
  }
  check();

  party.forEach((arr) => {
    for (let i = 0; i < arr.length; i++) {
      let n = arr[i];
      if (set.has(n)) {
        answer--;
        break;
      }
    }
  });
  return answer;
}

console.log(solution(N, M, truePeople, party));
