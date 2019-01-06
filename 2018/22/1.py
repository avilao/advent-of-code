import sys, re
Y_ZERO = 16807
X_ZERO = 48271
MOD_FACTOR = 20183

inp = open('input.txt').readlines()
depth = map(int, re.findall("\d+", inp[0]))[0]
target = map(int, re.findall("\d+", inp[1]))

def printMap(ero):
  for y in range(target[1] + 1):
    for x in range(target[0] + 1):
      c = '.' if ero[x][y] == 0 else '=' if ero[x][y] == 1 else '|'
      sys.stdout.write(c)
    sys.stdout.write('\n')
  sys.stdout.write('\n')
  sys.stdout.flush()

def initialGeo(x,y):
  if (x == 0 and y == 0) or (x == target[0] and y == target[1]):
    return depth % MOD_FACTOR
  if y == 0:
    return (x * Y_ZERO + depth) % MOD_FACTOR
  if x == 0:
    return (y * X_ZERO + depth) % MOD_FACTOR
  return 0

erosion = [[ initialGeo(x,y) for y in range(target[1] + 1)] for x in range(target[0] + 1)]
for x in range(1, target[0] + 1):
  for y in range(1, target[1] + 1):
    if x != target[0] or y != target[1]:
      erosion[x][y] = (erosion[x-1][y] * erosion[x][y-1] + depth) % MOD_FACTOR

risk = 0
for x in range(target[0] + 1):
  for y in range(target[1] + 1):
    risk += erosion[x][y] % 3

print(risk)
