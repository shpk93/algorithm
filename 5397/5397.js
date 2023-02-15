var fs = require("fs");
const filepath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const splitStr = process.platform === "linux" ? "\n" : "\r\n";
var input = fs.readFileSync(filepath).toString().split(splitStr);
let n = +input[0];
let commands = input.slice(1, n + 1);

function solution(command) {
  let data = Array(100005).fill(null);
  let nxt = Array(100005).fill(-1);
  let pre = Array(100005).fill(-1);

  let unUsed = 1;
  let curser = 0;

  function insert(addr, v) {
    data[unUsed] = v;
    pre[unUsed] = addr;
    nxt[unUsed] = nxt[addr];
    if (nxt[addr] !== -1) pre[nxt[addr]] = unUsed;
    nxt[addr] = unUsed;
    unUsed++;
  }
  function erase(addr) {
    nxt[pre[addr]] = nxt[addr];
    if (nxt[addr] !== -1) pre[nxt[addr]] = pre[addr];
  }

  function travel() {
    let str = "";
    let cur = nxt[0];
    while (cur !== -1) {
      str += data[cur];
      cur = nxt[cur];
    }
    return str;
  }

  for (let i = 0; i < command.length; i++) {
    if (command[i] === "<") {
      if (pre[curser] !== -1) curser = pre[curser];
    } else if (command[i] === ">") {
      if (nxt[curser] !== -1) curser = nxt[curser];
    } else if (command[i] === "-") {
      if (curser !== 0) {
        erase(curser);
        curser = pre[curser];
      }
    } else {
      insert(curser, command[i]);
      curser = nxt[curser];
    }
  }

  console.log(travel());
}

commands.forEach((cmd) => solution(cmd));
