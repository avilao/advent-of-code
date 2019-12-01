var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


const getFuel = (mass) => {
  const fuel = Math.floor(mass/3) - 2;
  return fuel > 0 ? fuel + getFuel(fuel) : 0;
}

let totalFuel = 0;

rl.on('line', function(line){
    totalFuel += getFuel(parseInt(line));
}).on('close', () => console.log(totalFuel));