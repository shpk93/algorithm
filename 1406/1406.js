var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
let str = input[0];
let n = +input[1];
let commands = input.slice(2);

function solution(str, n, commands) {
  const data = Array(str.length + 10).fill(null);
  const prev = Array(str.length + 10).fill(-1);
  const next = Array(str.length + 10).fill(-1);

  let unUsed = 1;

  let curser = 0;

  function insert(addr, v) {
    data[unUsed] = v;
    prev[unUsed] = addr;
    next[unUsed] = next[addr];
    if (next[addr] !== -1) prev[next[addr]] = unUsed;
    next[addr] = unUsed;
    unUsed++;
  }
  function erase(addr) {
    next[prev[addr]] = next[addr];
    if (next[addr] !== -1) prev[next[addr]] = prev[addr];
  }

  for (let i = 0; i < str.length; i++) {
    insert(i, str[i]);
    curser++;
  }
  travel();

  for (let i = 0; i < commands.length; i++) {
    // console.log("d", commands[i]);
    let [command, v] = commands[i].split(" ");
    if (command === "L") {
      if (prev[curser] !== -1) curser--;
    }
    if (command === "R") {
      if (next[curser] !== -1) curser++;
    }
    if (command === "P") {
      insert(curser, v);
      curser = next[curser];
    }
    if (command === "B") {
      if (curser !== 0) {
        erase(curser);
        curser = prev[curser];
      }
    }
  }
  function travel() {
    let str = "";
    let addr = next[0];
    while (addr !== -1) {
      str += data[addr];
      addr = next[addr];
    }

    console.log(str);
  }
  console.log(data, next, prev);
  travel();
}

solution(str, n, commands);
