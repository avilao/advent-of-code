const utils = require('../utils');

const ITERIATIONS = 1000;

function updateVelocity(m1, m2) {
  for(let p = 0; p < m1.position.length; p++) {
    m2.velocity[p] = m2.velocity[p] +  (m1.position[p] === m2.position[p] ? 0 : (m1.position[p] > m2.position[p] ? 1 : -1));
  } 
}

function updatePosition() {
  moons.forEach(moon => {
    moon.position.forEach((v , i) => {
      moon.position[i] = v + moon.velocity[i]
    });
  });
}

function getEnergyTotal() {
  return moons.reduce((acc,  moon) => acc + (moon.position.reduce((acc, pos) => acc + Math.abs(pos), 0)) * (moon.velocity.reduce((acc, v) => acc + Math.abs(v), 0)), 0);
}

const moons = [];
utils.rl.on("line",  function(line) {
  const matches = line.match(/-?\d+/g);
  moons.push({ position: matches.map(p => parseInt(p)), velocity: new Array(matches.length).fill(0) })
}).on("close", () =>{
  for(let i = 0; i < ITERIATIONS; i++) {
    for(let a = 0; a < moons.length; a++) {
      for(let b = a + 1; b < moons.length + a; b++) {
        updateVelocity(moons[a], moons[b % moons.length]);
      }
    }
    updatePosition();    
  }
  console.log(getEnergyTotal());
});
