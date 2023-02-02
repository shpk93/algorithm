var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

let N = +input[0].split(" ")[0];
let M = +input[0].split(" ")[1];
let map = input.slice(1, N + 1).map((_) => _.split(" ").map(Number));
// console.log(map);
function solution(N, M, map) {
  //  //
  let combiList = [];

  let cList = [];
  let hList = [];

  function getCombi(start, combi, origin, selectNum) {
    if (combi.length === selectNum) {
      combiList.push(combi.slice());
      return;
    }

    for (let i = start; i < origin.length; i++) {
      combi.push(i);
      getCombi(i + 1, combi, origin, selectNum);
      combi.pop();
    }
  }

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (map[y][x] === 1) {
        hList.push([y, x]);
      }
      if (map[y][x] === 2) {
        cList.push([y, x]);
      }
    }
  }

  let answer = [];

  getCombi(0, [], cList, M);

  if (cList.length < M) {
    combiList.push(cList.map((_, i) => i));
  }

  let disArr = Array(hList.length).fill(Infinity);
  combiList.forEach((v) => {
    disArr = Array(hList.length).fill(Infinity);
    v.forEach((i) => {
      let [cPosY, cPosX] = cList[i];
      for (let h = 0; h < hList.length; h++) {
        let dis = Math.abs(hList[h][0] - cPosY) + Math.abs(hList[h][1] - cPosX);
        disArr[h] = Math.min(disArr[h], dis);
      }
    });
    answer.push(disArr.reduce((a, b) => a + b));
  });

  console.log(Math.min(...answer));
}

solution(N, M, map);
