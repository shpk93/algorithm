var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
const N = +input[0];
const matrix = input.slice(1, N + 1).map((el) => el.split(" ").map(Number));
function solution(N, matrix) {
  // 아기상어의 위치를 찾고
  // 아기상어 위치에서 bfs를 돌려
  // 찾으면 해당시간만큼 추가.
  // 못찾을때까지 돌려보자

  let dy = [-1, 0, 0, 1];
  let dx = [0, -1, 1, 0];
  let babyPos = [0, 0];
  let size = 2;
  let eat = 0;
  let answer = 0;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (matrix[y][x] === 9) {
        babyPos = [y, x];
      }
    }
  }

  while (true) {
    let [ny, nx, time] = bfs(babyPos[0], babyPos[1], size);
    if (time === -1) break;
    answer += time;
    babyPos = [ny, nx];
    eat++;
    if (eat === size) {
      size++;
      eat = 0;
    }
  }

  return answer;

  //bfs함수
  //못먹으면 -1을 리턴하고
  //먹으면 걸린 시간과 해당 좌표를 리턴해보자.
  function bfs(sy, sx, size) {
    let queue = [[sy, sx, 0]];
    let visit = Array(N)
      .fill(0)
      .map((_) => Array(N).fill(0));

    matrix[sy][sx] = 0;
    visit[sy][sx] = 1;

    let findArr = [];
    while (queue.length) {
      let nq = [];

      for (let j = 0; j < queue.length; j++) {
        let [y, x, time] = queue[j];

        for (let i = 0; i < dy.length; i++) {
          let ny = y + dy[i];
          let nx = x + dx[i];
          if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
          if (visit[ny][nx]) continue;
          if (matrix[ny][nx] > size) continue;
          if (matrix[ny][nx] === size || matrix[ny][nx] === 0) {
            visit[ny][nx] = 1;
            nq.push([ny, nx, time + 1]);
          } else {
            findArr.push([ny, nx, time + 1]);
          }
        }
      }

      // 물고기를 찾았을떄
      // 우선순위 정렬 후 해당좌표 리턴
      if (findArr.length) {
        findArr.sort((a, b) => {
          if (a[0] === b[0]) return a[1] - b[1];
          return a[0] - b[0];
        });
        return findArr[0];
      }
      queue = nq;
    }

    return [-1, -1, -1];
  }
}

console.log(solution(N, matrix));
