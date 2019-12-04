var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function isValid(n) {
  const a = (""+ n ).split("").map((t) => parseInt(t))
  let adjacent = false;
  for (let i = 0; i < a.length - 1; i++) {
    if (a[i] > a[i+1]) return false;
    if (a[i] === a[i+1] && (i + 2 >= a.length || a[i+2] !== a[i+1]) && (i < 0 || a[i-1] !== a[i])) adjacent = true;
  }
  return adjacent;
}

rl.on("line", function(line) {
  range = line.split("-").map(v => parseInt(v));
  let valid = 0;

  for(let i = range[0]; i <= range[1]; i++) {
    valid += isValid(i) ? 1 : 0;
  }
  console.log(valid);
});
