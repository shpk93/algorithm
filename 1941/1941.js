var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

const map = [];

for (let i = 0; i < 5; i++) {
  map.push(input[i].slice(0, 5));
}

function solution(map) {
  let answer = 0;
  let arr = [];
  let visit = Array.from({ length: 5 }, () => Array(5).fill(0));
  for (let i = 0; i <= 24; i++) {
    arr.push(i);
  }
  function getCombination(index, nums) {
    if (nums.length === 7) {
      test(nums);
    }
    for (let i = index; i < arr.length; i++) {
      nums.push(arr[i]);
      getCombination(i + 1, nums);
      nums.pop();
    }
  }
  getCombination(0, []);

  function test(combi) {
    combi.forEach((num) => {
      let y = Math.floor(num / 5);
      let x = num % 5;
      visit[y][x] = 1;
    });

    let check = dfs(combi[0], visit);
    if (check) {
      answer++;
    }
    combi.forEach((num) => {
      let y = Math.floor(num / 5);
      let x = num % 5;
      visit[y][x] = 0;
    });
  }

  function dfs(num, visit) {
    let y = Math.floor(num / 5);
    let x = num % 5;

    let stack = [[y, x]];
    let Ycount = 0;
    let dy = [0, 0, -1, 1];
    let dx = [1, -1, 0, 0];
    let people = 0;

    while (stack.length) {
      let [y, x] = stack.pop();
      if (visit[y][x] === 2) continue;
      visit[y][x] = 2;
      if (map[y][x] === "Y") Ycount++;
      people++;
      for (let i = 0; i < dy.length; i++) {
        let ny = dy[i] + y;
        let nx = dx[i] + x;
        if (ny < 0 || nx < 0 || ny >= 5 || nx >= 5) continue;
        if (visit[ny][nx] === 1) {
          stack.push([ny, nx]);
        }
      }
    }
    if (people === 7 && Ycount <= 3) {
      return true;
    }
    return false;
  }
  return answer;
}

console.log(solution(map));
