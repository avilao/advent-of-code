const utils = require('../utils');


function findAsteroidsInLos(p) {
  let count = [];

  for(let by = 0; by < m.length; by++) {
    for(let bx = 0; bx < m[by].length; bx++) {
      if(m[by][bx] === '#' && !isSameCoordinate(p, [bx, by])) {
        if(checkIfOnlyAsteroidsInLine(p, [bx, by])) {
          count.push([bx, by]);
        }
      }
    }
  }
  return count;
}

function checkIfOnlyAsteroidsInLine(p1, p2) {
  const xRange = [p1[0], p2[0]].sort();
  const yRange = [p1[1], p2[1]].sort();

  for(let cy = yRange[0]; cy <= yRange[1]; cy++) {
    for(let cx = xRange[0]; cx <= xRange[1]; cx++) {
      if(m[cy][cx] === '#' && arePointsCollinear(p1, p2, [cx, cy]) && !isSameCoordinate(p1, [cx, cy]) && !isSameCoordinate(p2, [cx, cy])) {
        return false;
      }
    }
  }
  return true;
}


function arePointsCollinear(p1, p2, p3) {
  return (p1[0] * (p2[1] - p3[1]) + p2[0] * (p3[1] - p1[1]) + p3[0] * (p1[1] - p2[1])) === 0.0;
}

function isSameCoordinate(p1, p2) {
	if (p1.length !== p2.length) return false;
	for (let i = 0; i < p1.length; i++) {
		if (p1[i] !== p2[i]) return false;
	}
	return true;
}

let m = [];
let result = {}
utils.rl.on("line", function(line) {
  m.push(line.split(""));
}).on('close', function() {
  
  for(let ay = 0; ay < m.length; ay++) {
    for(let ax = 0; ax < m[ay].length; ax++) {
      result[`${ax},${ay}`] = m[ay][ax] === '.' ? 0 : findAsteroidsInLos([ax, ay]); 
    }
  }

  console.log(result)
  for(let ay = 0; ay < m.length; ay++) {
    let line = '';
    for(let ax = 0; ax < m.length; ax++) {
      line += result[`${ax},${ay}`].length || 0;
    }
    console.log(line);
  }

  let max = { value: 0, p: [] };
  for(let y = 0; y < m.length; y++) {
    for(let x = 0; x < m.length; x++) {
      if (result[`${x},${y}`].length > max.value) {
        max.value = result[`${x},${y}`].length;
        max.p = [x, y];
      } 
    }
  }

  console.log(max);
});
