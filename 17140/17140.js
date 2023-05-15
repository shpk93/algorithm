var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);
const [r, c, k] = input[0].split(" ").map(Number);
const map = input.slice(1, 4).map((el) => el.split(" ").map(Number));

// 어렵지 않은데 손이 많이 가는 문제였음
// 엣지케이스로
// 초기 주어진 r,c가 최초 맵의 규격인 3x3에 벗어난 좌표가 들어왔음
// 고치는데 1시간 소요
// 실전이었으면 무조건 틀렸을듯. 나중에 파이썬으로 다시해보자

function solution(r, c, k, map) {
  for (let i = 0; i <= 100; i++) {
    let y = map.length;
    let x = map[0].length;

    if (r - 1 < y && c - 1 < x && map[r - 1][c - 1] === k) return i;
    if (y >= x) {
      map = sort(map);
    } else {
      map = rotate2(sort(rotate(map)));
    }
  }

  return -1;

  //정렬시켜서 새로운 맵을 만드는 함수
  function sort(map) {
    let newMap = Array(map.length);
    let maxcount = 0;
    for (let y = 0; y < map.length; y++) {
      let countArr = [];
      for (let i = 0; i < 101; i++) {
        countArr.push([i, 0]);
      }
      for (let x = 0; x < map[0].length; x++) {
        if (map[y][x] !== 0) {
          let num = map[y][x];
          countArr[num][1]++;
        }
      }
      countArr.sort((a, b) => {
        if (a[1] === b[1]) return a[0] - b[0];
        return a[1] - b[1];
      });

      let arr = [];

      for (let [num, count] of countArr) {
        if (arr.length >= 100) break;
        if (count === 0) continue;
        arr.push(num, count);
      }
      maxcount = Math.max(arr.length, maxcount);
      newMap[y] = arr;
    }
    for (let y = 0; y < map.length; y++) {
      if (newMap[y].length < maxcount) {
        while (newMap[y].length < maxcount) {
          newMap[y].push(0);
        }
      }
    }
    return newMap;
  }

  // 회전한 상태를 정렬시켰을때 다시 원래대로 돌리는 함수
  function rotate2(map) {
    let h = map.length;
    let r = map[0].length;
    let newMap = Array(r)
      .fill(0)
      .map((_) => Array(h).fill(0));

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < r; x++) {
        newMap[x][y] = map[y][x];
      }
    }
    return newMap;
  }

  // 행이 열보다 짧을때 회전해서 구현
  function rotate(map) {
    let h = map.length;
    let r = map[0].length;
    let newMap = Array(r)
      .fill(0)
      .map((_) => Array(h).fill(0));

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < r; x++) {
        newMap[x][h - 1 - y] = map[y][x];
      }
    }

    return newMap;
  }
}

console.log(solution(r, c, k, map));
