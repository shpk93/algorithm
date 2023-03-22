var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);

input.forEach((el) => {
  solution(el);
});

function solution(S) {
  S = S.split("");
  let fn = (strArr) => {
    let index1 = strArr.indexOf("<");
    let index2 = strArr.indexOf(">");
    if (index1 === -1) {
      return strArr;
    }

    let newArr = [...strArr.slice(index1, index2 + 1)];

    strArr.splice(index1, index2 + 1 - index1, newArr);
    return fn(strArr);
  };
  let a = fn(S);
  let newArr = [];
  for (let i = 0; i < a.length; i++) {
    if (typeof a[i] === "object") {
      if (newArr.length) {
        a.splice(i - newArr.length, newArr.length, newArr.reverse());
        i = i - newArr.length;
        newArr = [];
      }
      continue;
    }
    if (a[i] === " ") {
      a.splice(i - newArr.length, newArr.length, newArr.reverse());
      i = i - newArr.length + 1;
      newArr = [];
    } else newArr.push(a[i]);
  }

  if (newArr.length) {
    a.splice(a.length - newArr.length, newArr.length, newArr.reverse());
    newArr = [];
  }
  let answer = "";
  a.forEach((el) => {
    if (typeof el === "object") {
      answer = answer + el.join("");
    } else {
      answer += el;
    }
  });
  console.log(answer);
}
