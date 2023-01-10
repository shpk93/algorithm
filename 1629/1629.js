var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(" ").map(BigInt);

let [a, b, c] = input;
function pow(a, b) {
  if (b == 0) {
    return BigInt(1);
  } else {
    const temp = pow(a, BigInt(parseInt(b / BigInt(2))));
    if (b % BigInt(2) == 0) {
      return (temp * temp) % c;
    } else {
      return (temp * temp * a) % c;
    }
  }
}
function solution(a, b, c) {
  let answer = pow(a, b);
  console.log(parseInt(answer));
}

solution(a, b, c);
