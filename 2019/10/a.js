const utils = require('../utils');


// function findLoS(a, b) {
//   let visible = {}

//   for(let y = 0; y < m.length; y++) {
//     for(let x = 0; x < m[y].length; x++) {
    
//       if(m[y][x] === '#') {
//         visible[y-xa-x][]
//       }
//     }
//   }


// }

let m = [];
let result = {}
utils.rl.on("line", function(line) {
  m.push(line.split(""));
}).on('close', function() {
  
  for(let y = 0; y < m.length; y++) {
    for(let x = 0; x < m[y].length; x++) {
      result[`${x},${y}`] = m[y][x] === '.' ? 0 : findLoS(x, y); 

      // console.log(x, y, utils.commonDenominators(x,y))
    }
  }

  console.log(result);
});
