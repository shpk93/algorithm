var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().trim().split(splitStr);

let T = +input[0];
let commands = [];
let index = 2;
for (let i = 0; i < T; i++) {
  commands.push(input[index].split(" "));
  index += 2;
}

function solution(commands) {
  // 실패한 코드
  /// 내 머릿속으로 회전하기 힘들어서 나중에 큐브 갖고와서 직접 대고 움직여봐야할듯

  let U = Array(3)
    .fill(0)
    .map((el) => Array(3).fill("w"));
  let D = Array(3)
    .fill(0)
    .map((el) => Array(3).fill("y"));
  let F = Array(3)
    .fill(0)
    .map((el) => Array(3).fill("r"));
  let B = Array(3)
    .fill(0)
    .map((el) => Array(3).fill("o"));
  let L = Array(3)
    .fill(0)
    .map((el) => Array(3).fill("g"));
  let R = Array(3)
    .fill(0)
    .map((el) => Array(3).fill("b"));

  function u(arrow) {
    let temp = [0, 0, 0];
    if (arrow === "-") {
      // 앞 왼 오 뒤
      for (let i = 0; i < 3; i++) {
        temp[i] = F[0][i];
      }
      // 앞면 오른쪽 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], R[0][i]] = [R[0][i], temp[i]];
      }
      // 오른쪽면 뒷면 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], B[0][i]] = [B[0][i], temp[i]];
      }
      // 뒷면 왼쪽 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], L[0][i]] = [L[0][i], temp[i]];
      }
      for (let i = 0; i < 3; i++) {
        [temp[i], F[0][i]] = [F[0][i], temp[i]];
      }
    } else {
      for (let i = 0; i < 3; i++) {
        temp[i] = F[0][i];
      }
      // 앞면 왼쪽 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], L[0][i]] = [L[0][i], temp[i]];
      }
      // 왼면 뒷면 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], B[0][i]] = [B[0][i], temp[i]];
      }
      // 뒷면 오쪽 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], R[0][i]] = [R[0][i], temp[i]];
      }
      for (let i = 0; i < 3; i++) {
        [temp[i], F[0][i]] = [F[0][i], temp[i]];
      }
    }
  }

  function d(arrow) {
    let temp = [0, 0, 0];
    if (arrow === "-") {
      // 앞 왼 오 뒤
      for (let i = 0; i < 3; i++) {
        temp[i] = F[2][i];
      }
      // 앞면 왼쪽 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], L[2][i]] = [L[2][i], temp[i]];
      }
      // 왼면 뒷면 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], B[2][i]] = [B[2][i], temp[i]];
      }
      // 뒷면 오쪽 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], R[2][i]] = [R[2][i], temp[i]];
      }
      for (let i = 0; i < 3; i++) {
        [temp[i], F[2][i]] = [F[2][i], temp[i]];
      }
    } else {
      for (let i = 0; i < 3; i++) {
        temp[i] = F[2][i];
      }
      // 앞면 오른쪽 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], R[2][i]] = [R[2][i], temp[i]];
      }
      // 오른쪽면 뒷면 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], B[2][i]] = [B[2][i], temp[i]];
      }
      // 뒷면 왼쪽 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], L[2][i]] = [L[2][i], temp[i]];
      }
      for (let i = 0; i < 3; i++) {
        [temp[i], F[2][i]] = [F[2][i], temp[i]];
      }
    }
  }

  function f(arrow) {
    let temp = [0, 0, 0];
    if (arrow === "-") {
      for (let i = 0; i < 3; i++) {
        temp[i] = U[2][i];
      }
      // 윗면 왼쪽 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], L[i][2]] = [L[i][2], temp[i]];
      }
      // 왼면 아래면 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], D[0][i]] = [D[0][i], temp[i]];
      }
      // 아래면 오쪽 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], R[i][0]] = [R[i][0], temp[i]];
      }
      for (let i = 0; i < 3; i++) {
        [temp[i], U[2][i]] = [U[2][i], temp[i]];
      }
    } else {
      for (let i = 0; i < 3; i++) {
        temp[i] = U[2][i];
      }
      // 윗면 오른쪽 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], R[i][0]] = [R[i][0], temp[i]];
      }
      // 오른쪽면 아래면 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], D[0][i]] = [D[0][i], temp[i]];
      }
      // 아래면 왼쪽 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], L[i][2]] = [L[i][2], temp[i]];
      }
      for (let i = 0; i < 3; i++) {
        [temp[i], U[2][i]] = [U[2][i], temp[i]];
      }
    }
  }

  function b(arrow) {
    let temp = [0, 0, 0];
    if (arrow === "-") {
      for (let i = 0; i < 3; i++) {
        temp[i] = U[0][i];
      }
      // 윗면 오른쪽 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], R[i][2]] = [R[i][2], temp[i]];
      }
      // 오른쪽면 아래면 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], D[2][i]] = [D[2][i], temp[i]];
      }
      // 아래면 왼쪽 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], L[i][0]] = [L[i][0], temp[i]];
      }
      for (let i = 0; i < 3; i++) {
        [temp[i], U[0][i]] = [U[0][i], temp[i]];
      }
    } else {
      for (let i = 0; i < 3; i++) {
        temp[i] = U[0][i];
      }
      // 윗면 왼쪽 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], L[i][0]] = [L[i][0], temp[i]];
      }
      // 왼면 아래면 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], D[2][i]] = [D[2][i], temp[i]];
      }
      // 아래면 오쪽 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], R[i][2]] = [R[i][2], temp[i]];
      }
      for (let i = 0; i < 3; i++) {
        [temp[i], U[0][i]] = [U[0][i], temp[i]];
      }
    }
  }

  function r(arrow) {
    //오른쪽면을 돌렸을땐 F,U,B,D 이 움직여야함
    let temp = [0, 0, 0];
    if (arrow === "-") {
      for (let i = 0; i < 3; i++) {
        temp[i] = U[i][2];
      }
      // 윗면 앞쪽 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], F[i][2]] = [F[i][2], temp[i]];
      }
      // 앞면 아래면 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], D[i][2]] = [D[i][2], temp[i]];
      }
      // 아래면 뒷쪽 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], B[i][0]] = [B[i][0], temp[i]];
      }
      for (let i = 0; i < 3; i++) {
        [temp[i], U[i][2]] = [U[i][2], temp[i]];
      }
    } else {
      for (let i = 0; i < 3; i++) {
        temp[i] = U[i][2];
      }
      //윗면 뒷면 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], B[i][0]] = [B[i][0], temp[i]];
      }
      // 뒷면 밑면변경
      for (let i = 0; i < 3; i++) {
        [temp[i], D[i][2]] = [D[i][2], temp[i]];
      }
      //밑면 앞면
      for (let i = 0; i < 3; i++) {
        [temp[i], F[i][2]] = [F[i][2], temp[i]];
      }
      for (let i = 0; i < 3; i++) {
        [temp[i], U[i][2]] = [U[i][2], temp[i]];
      }
    }
  }

  function rotate(matrix, arrow) {
    let newMatrix = Array(3)
      .fill(0)
      .map((el) => Array(3).fill(0));

    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if (arrow === "-") {
          newMatrix[y][x] = matrix[x][3 - y - 1];
        } else {
          newMatrix[x][3 - y - 1] = matrix[y][x];
        }
      }
    }
    return newMatrix;
  }

  function l(arrow) {
    //왼쪽면을 돌렸을땐 U,F,B,D 이 움직여야함
    let temp = [0, 0, 0];
    if (arrow === "-") {
      for (let i = 0; i < 3; i++) {
        temp[i] = U[i][0];
      }
      //윗면 뒷면 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], B[i][2]] = [B[i][2], temp[i]];
      }
      // 뒷면 밑면변경
      for (let i = 0; i < 3; i++) {
        [temp[i], D[i][0]] = [D[i][0], temp[i]];
      }
      //밑면 앞면
      for (let i = 0; i < 3; i++) {
        [temp[i], F[i][0]] = [F[i][0], temp[i]];
      }
      for (let i = 0; i < 3; i++) {
        [temp[i], U[i][0]] = [U[i][0], temp[i]];
      }
    } else {
      for (let i = 0; i < 3; i++) {
        temp[i] = U[i][0];
      }
      // 윗면 앞쪽 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], F[i][0]] = [F[i][0], temp[i]];
      }
      // 앞면 아래면 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], D[i][0]] = [D[i][0], temp[i]];
      }
      // 아래면 뒷쪽 변경
      for (let i = 0; i < 3; i++) {
        [temp[i], B[i][2]] = [B[i][2], temp[i]];
      }
      for (let i = 0; i < 3; i++) {
        [temp[i], U[2 - i][0]] = [U[2 - i][0], temp[i]];
      }
    }
  }
  commands.forEach((cases, i) => {
    U = Array(3)
      .fill(0)
      .map((el) => Array(3).fill("w"));
    D = Array(3)
      .fill(0)
      .map((el) => Array(3).fill("y"));
    F = Array(3)
      .fill(0)
      .map((el) => Array(3).fill("r"));
    B = Array(3)
      .fill(0)
      .map((el) => Array(3).fill("o"));
    L = Array(3)
      .fill(0)
      .map((el) => Array(3).fill("g"));
    R = Array(3)
      .fill(0)
      .map((el) => Array(3).fill("b"));
    cases.forEach((el) => {
      let cmd = el[0];
      let arrow = el[1];

      switch (cmd) {
        case "U":
          U = rotate(U, arrow);
          u(arrow);
          break;
        case "D":
          D = rotate(D, arrow);
          d(arrow);
          break;
        case "F":
          F = rotate(F, arrow);
          f(arrow);
          break;
        case "B":
          B = rotate(B, arrow);
          b(arrow);
          break;
        case "L":
          L = rotate(L, arrow);
          l(arrow);
          break;
        case "R":
          R = rotate(R, arrow);
          r(arrow);
          break;
      }
    });
    U.forEach((el) => console.log(el.join("")));
  });
}

solution(commands);
