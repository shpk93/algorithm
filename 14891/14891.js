var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

let wheels = [];
for (let i = 0; i < 4; i++) {
  wheels.push(input[i].split("").map(Number));
}
let K = +input[4];

let commands = input.slice(5, 5 + K).map((_) => _.split(" ").map(Number));

function solution(wheels, commands) {
  let isUsed = Array(wheels.length).fill(0);
  let copywheels = [];
  wheels.forEach((_, i) => (copywheels[i] = wheels[i].slice()));

  commands.forEach(([wheelsIndex, arrow], i) => {
    if (arrow === 1) {
      rightMove(wheelsIndex - 1);
    } else {
      leftMove(wheelsIndex - 1);
    }
    isUsed = Array(wheels.length).fill(0);
    wheels.forEach((_, i) => (copywheels[i] = wheels[i].slice()));
  });

  function check(wheelsIndex) {
    let next = wheelsIndex - 1;
    let next2 = wheelsIndex + 1;
    let nextboolean = false;
    let next2boolean = false;

    if (wheels[next]) {
      let item = copywheels[wheelsIndex][6];
      let item2 = copywheels[next][2];
      if (item !== item2) {
        nextboolean = true;
      }
    }

    if (wheels[next2]) {
      let item = copywheels[wheelsIndex][2];
      let item2 = copywheels[next2][6];
      if (item !== item2) {
        next2boolean = true;
      }
    }
    return [nextboolean, next2boolean];
  }

  function rightMove(wheelsIndex) {
    if (isUsed[wheelsIndex] || wheelsIndex < 0 || wheelsIndex >= wheels.length)
      return;

    let [left, right] = check(wheelsIndex);

    wheels[wheelsIndex].unshift(wheels[wheelsIndex].pop());
    isUsed[wheelsIndex] = 1;

    if (left) leftMove(wheelsIndex - 1);
    if (right) leftMove(wheelsIndex + 1);
  }

  function leftMove(wheelsIndex) {
    if (isUsed[wheelsIndex] || wheelsIndex < 0 || wheelsIndex >= wheels.length)
      return;

    let [left, right] = check(wheelsIndex);

    wheels[wheelsIndex].push(wheels[wheelsIndex].shift());
    isUsed[wheelsIndex] = 1;

    if (left) rightMove(wheelsIndex - 1);
    if (right) rightMove(wheelsIndex + 1);
  }
  let answer = 0;
  for (let i = 0; i < wheels.length; i++) {
    if (wheels[i][0] === 1) {
      if (i === 0) answer += 1;
      if (i === 1) answer += 2;
      if (i === 2) answer += 4;
      if (i === 3) answer += 8;
    }
  }
  return answer;
}

console.log(solution(wheels, commands));
