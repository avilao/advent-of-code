const utils = require('../utils');

const getFuel = (mass) => (Math.floor(mass/3) - 2)
let totalFuel = 0;

utils.rl.on('line', function(line){
    totalFuel += getFuel(parseInt(line));
}).on('close', () => console.log(totalFuel));