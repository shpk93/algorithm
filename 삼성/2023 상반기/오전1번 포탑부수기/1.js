//https://www.codetree.ai/frequent-problems/destroy-the-turret/

// 컨디션이 조금 안좋아서 조금 오래 걸린거같다. 오타주의하며 다시풀어보자.
var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

var input = fs.readFileSync(filepath).toString().trim().split("\n");

let [n, m, k] = input[0].split(" ").map(Number);

let matrix = input.slice(1, n + 1).map((el) => el.split(" ").map(Number));

// 공격자 선정 후
// 목적지 선정 후
// 레이저 공격시도
// 실패시 포탄공격
// 이후 정비
// k번반복 후 정답리턴
function solution(n, m, k, matrix) {
  let dy = [0, 1, 0, -1, -1, 1, 1, -1];
  let dx = [1, 0, -1, 0, -1, -1, 1, 1];
  let time = 1;
  let answer = 0;

  let attackTimeMatrix = Array(n)
    .fill(0)
    .map((el) => Array(m).fill(0));

  let attackRelationMatrix = Array(n)
    .fill(0)
    .map((el) => Array(m).fill(0));

  for (time = 1; time <= k; time++) {
    let attackPos = getAttackPos(matrix);
    let strongPos = getStrongPos(attackPos, matrix);
    //더이상 타격할 곳이 없을시 반복종료
    if (!strongPos) break;
    matrix[attackPos[0]][attackPos[1]] += n + m;
    attackTimeMatrix[attackPos[0]][attackPos[1]] = time;
    attackRelationMatrix[attackPos[0]][attackPos[1]] = 1;
    let flag = razerAttack(attackPos, strongPos);

    //레이저공격에 실패시 폭탄공격
    if (!flag) {
      boomAttack(attackPos, strongPos);
    }
    // 정비 후 어택관계초기화
    jeongbi(matrix);
    attackRelationMatrix = Array(n)
      .fill(0)
      .map((el) => Array(m).fill(0));
  }

  getAnswer(matrix);

  return answer;

  ////////////
  function getAnswer(matrix) {
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        if (matrix[y][x] !== 0) {
          answer = Math.max(answer, matrix[y][x]);
        }
      }
    }
  }

  // 공격좌표 찾는함수
  function getAttackPos(matrix) {
    let arr = [];
    let min = Infinity;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        if (matrix[y][x] !== 0 && min >= matrix[y][x]) {
          if (min > matrix[y][x]) arr = [];
          arr.push([y, x]);
          min = matrix[y][x];
        }
      }
    }

    arr.sort(([y1, x1], [y2, x2]) => {
      if (attackTimeMatrix[y1][x1] === attackTimeMatrix[y2][x2]) {
        if (y1 + x1 === y2 + x2) {
          return x2 - x1;
        }
        return y2 + x2 - (y1 + x1);
      }
      return attackTimeMatrix[y2][x2] - attackTimeMatrix[y1][x1];
    });
    return arr[0];
  }

  // 목적좌표 찾는함수
  function getStrongPos(attackpos, matrix) {
    let arr = [];
    let max = -1;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        if (matrix[y][x] !== 0 && max <= matrix[y][x]) {
          if (y === attackpos[0] && x === attackpos[1]) continue;
          if (max < matrix[y][x]) arr = [];
          arr.push([y, x]);
          max = matrix[y][x];
        }
      }
    }

    arr.sort(([y1, x1], [y2, x2]) => {
      if (attackTimeMatrix[y1][x1] === attackTimeMatrix[y2][x2]) {
        if (y1 + x1 === y2 + x2) {
          return x1 - x2;
        }
        return y1 + x1 - (y2 + x2);
      }
      return attackTimeMatrix[y1][x1] - attackTimeMatrix[y2][x2];
    });

    return arr[0];
  }

  function razerAttack(attackPos, strongPos) {
    let visit = Array(n)
      .fill(0)
      .map((el) => Array(m).fill(0));
    let queue = [[...attackPos, []]];
    let flag = false;

    let damage = matrix[attackPos[0]][attackPos[1]];

    visit[attackPos[0]][attackPos[1]] = 1;

    while (queue.length) {
      let [y, x, movePosArr] = queue.shift();

      for (let i = 0; i < 4; i++) {
        // 범위벗어날시 반대편좌표로 이동
        let ny = (y + dy[i] + n) % n;
        let nx = (x + dx[i] + m) % m;

        if (matrix[ny][nx] === 0) continue;
        if (visit[ny][nx]) continue;
        if (ny === strongPos[0] && nx === strongPos[1]) {
          matrix[ny][nx] -= damage;
          if (matrix[ny][nx] < 0) matrix[ny][nx] = 0;
          attackRelationMatrix[ny][nx] = 1;
          //기록

          // 현재 발자취를 레이저공격
          for (let i = 0; i < movePosArr.length; i++) {
            let [ry, rx] = movePosArr[i];
            attackRelationMatrix[ry][rx] = 1;
            matrix[ry][rx] -= Math.floor(damage / 2);
            if (matrix[ry][rx] < 0) matrix[ry][rx] = 0;
          }

          flag = true;
          queue = [];
          break;
        } else {
          visit[ny][nx] = 1;
          queue.push([ny, nx, [...movePosArr, [ny, nx]]]);
        }
      }
    }
    return flag;
  }

  //폭탄공격
  function boomAttack(attackPos, strongPos) {
    //공격관계 기록 후 목적지직접공격
    attackRelationMatrix[strongPos[0]][strongPos[1]] = 1;
    matrix[strongPos[0]][strongPos[1]] -= matrix[attackPos[0]][attackPos[1]];

    if (matrix[strongPos[0]][strongPos[1]] < 0)
      matrix[strongPos[0]][strongPos[1]] = 0;
    let damage = Math.floor(matrix[attackPos[0]][attackPos[1]] / 2);

    // 주변 8자리 목적지 간접타격 후 기록
    for (let i = 0; i < 8; i++) {
      // 범위벗어날시 반대편좌표로 이동
      let ny = strongPos[0] + dy[i];
      let nx = strongPos[1] + dx[i];
      ny = (ny + n) % n;
      nx = (nx + m) % m;

      //간접타격 좌표가 공격지일시 스킵
      if (attackPos[0] === ny && attackPos[1] === nx) continue;
      matrix[ny][nx] -= damage;
      if (matrix[ny][nx] < 0) matrix[ny][nx] = 0;
      attackRelationMatrix[ny][nx] = 1;
    }
  }

  // 정비함수
  function jeongbi(matrix) {
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        if (matrix[y][x] > 0 && attackRelationMatrix[y][x] === 0) {
          matrix[y][x]++;
        }
      }
    }
  }
}

console.log(solution(n, m, k, matrix));
