import math

SERIAL = int(open('input.txt').read())
GRID_SIZE = 300
def energy(x, y):
  rackId = x + 10
  e = rackId * y
  e += SERIAL
  e *= rackId
  e = math.floor((e / 100) % 10)
  return int(e - 5)

m = [[ energy(x + 1, y + 1) for y in range(GRID_SIZE)] for x in range(GRID_SIZE)]

sat = [[ 0 for y in range(GRID_SIZE)] for x in range(GRID_SIZE)]
for y in range(GRID_SIZE):
  for x in range(GRID_SIZE):
      for b in range (y+1):
        for a in range(x+1):
          sat[x][y] += m[a][b]     
      
answer = [-5 * GRID_SIZE * GRID_SIZE, 0, 0, 0]
for y in range(GRID_SIZE):
  for x in range(GRID_SIZE):
    for z in range(GRID_SIZE):
      if z+y < GRID_SIZE and x+z < GRID_SIZE:
        s = sat[x+z][y+z]
        if x > 0 and y > 0:
          s += sat[x-1][y-1]
        if x > 0:
          s -= sat[x-1][y+z]
        if y > 0:
          s -= sat[x+z][y-1]
        if s > answer[0]:
          answer = [s, x, y, z]
        
print("%s,%s,%s" % (answer[1], answer[2], answer[3])
