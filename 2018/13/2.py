import sys

m = {}
yMax = 0
xMax = 0
for y, line in enumerate(open('input.txt').read().split('\n')):
  for x, c in enumerate(line):
    m[x,y] = c
  xMax = x + 1
yMax = y + 1

dirCodes = ['^', '>', 'v', '<']
dirVector = [[0, -1], [1,0], [0, 1], [-1, 0]]
cars = []

def calcNextDir(p, d, nextTurn):
  t = m[p]
  
  if t in ['-', '|']:
    return (d, nextTurn)
  if (t == '\\' and d % 2 == 0) or (t == '/' and d % 2 == 1): # left turn
    return ((d - 1) % 4, nextTurn)
  if (t == '\\' and d % 2 == 1) or (t == '/' and d % 2 == 0): # right turn
    return ((d + 1) % 4, nextTurn)

  return ((d + (nextTurn - 1)) % 4, (nextTurn + 1) % 3)

def checkColision():
  global cars
  for i in range(len(cars) -1):
    for j in range(i+1, len(cars)):
      if cars[i][0] == cars[j][0]:
        del cars[j]
        del cars[i]
        return
  return

def printTracks():
  for y in range(yMax):
    for x in range(xMax):
      pc = m[x,y]
      for c in cars:
        if c[0] == (x,y):
          pc = dirCodes[c[1]]  
          break
      sys.stdout.write(pc)
    sys.stdout.write('\n')
  sys.stdout.write('\n')
  sys.stdout.flush()
  
#### race setup
for j in range(yMax):
  for i in range(xMax):
    c = m[i,j]
    if c in dirCodes:
      cars.append([(i,j), dirCodes.index(c), 0]) # [pos, dir, 0]
      hasVertical, hasHorizontal = False, False

      if j > 0 and j < len(m) and m[i,j-1] in ['|', '/', '\\', '+'] and m[i,j+1] in ['|', '/', '\\', '+']:
        hasVertical = True
      if i > 0 and  i < len(line) and m[i-1, j] in ['-', '/', '\\', '+'] and m[i+1, j] in ['-', '/', '\\', '+']:
        hasHorizontal = True
      m[i,j] = '+' if hasVertical and hasHorizontal else '|' if hasVertical else '-'

collision = False
printTracks()

while len(cars) > 1:
  cars = sorted(cars, key=lambda x: (x[0][1], x[0][0])) # needed optimization
  for i, c in enumerate(cars):
    dv = dirVector[c[1]]
    newPos = (c[0][0] + dv[0], c[0][1] + dv[1])
    newState = calcNextDir(newPos, c[1], c[2])
    cars[i] = [(newPos), newState[0], newState[1]]
    checkColision()
  
  printTracks()
print(cars[0][0])
