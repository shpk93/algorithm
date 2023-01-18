var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);
const [n, w, L] = input[0].split(" ").map(Number);
const trucks = input[1].split(" ").map(Number);

function solution(n, w, L, trucks) {
  let road = Array(w).fill(0);
  let trucksIndex = 0;
  let time = 0;
  function move() {
    road.pop();
    road.unshift(0);
  }

  while (trucksIndex < trucks.length) {
    time++;
    move();
    let sum = road.reduce((a, b) => a + b, 0);
    if (sum + trucks[trucksIndex] <= L) {
      road[0] = trucks[trucksIndex];
      trucksIndex++;
    }
  }
  for (let i = 0; i < road.length; i++) {
    if (road[i] !== 0) {
      time += road.length - i;
      break;
    }
  }
  return time;
}

console.log(solution(n, w, L, trucks));
