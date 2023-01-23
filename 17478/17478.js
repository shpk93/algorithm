var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString();
// console.log(input);
input = +input;

function solution(input) {
  let answer = "어느 한 컴퓨터공학과 학생이 유명한 교수님을 찾아가 물었다.";
  let strArr = [
    '"재귀함수가 뭔가요?"',
    '"잘 들어보게. 옛날옛날 한 산 꼭대기에 이세상 모든 지식을 통달한 선인이 있었어.',
    "마을 사람들은 모두 그 선인에게 수많은 질문을 했고, 모두 지혜롭게 대답해 주었지.",
    '그의 답은 대부분 옳았다고 하네. 그런데 어느 날, 그 선인에게 한 선비가 찾아와서 물었어."',
    "라고 답변하였지.",
  ];
  function rec(count) {
    let startStr = "____".repeat(count);
    let answer = "";
    for (let i = 0; i < strArr.length - 1; i++) {
      if (i === 1 && count === input)
        return (
          answer +
          startStr +
          '"재귀함수는 자기 자신을 호출하는 함수라네"' +
          "\n" +
          startStr +
          "라고 답변하였지."
        );
      answer += startStr + strArr[i] + "\n";
    }
    return answer + rec(count + 1) + "\n" + startStr + "라고 답변하였지.";
  }

  answer += "\n" + rec(0);

  return answer.trim();
}

console.log(solution(input));
