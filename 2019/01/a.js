var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


const getFuel = (mass) => (Math.floor(mass/3) - 2)
let totalFuel = 0;

rl.on('line', function(line){
    totalFuel += getFuel(parseInt(line));
}).on('close', () => console.log(totalFuel));