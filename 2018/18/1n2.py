import sys
import itertools

land = map(lambda s: list(' ' + s + ' '), open('input.txt').read().split("\n"))
land.insert(0, list(' '*len(land[0])))
land.append(list(' '*len(land[0])))

def printLand(land):
  for y in range(len(land)):
    for x in range(len(land[0])):
      sys.stdout.write(land[y][x])
    sys.stdout.write('\n')
  sys.stdout.write('\n')
  sys.stdout.flush()

def countLand(land):
  trees, lumber = 0, 0
  for y in range(len(land)):
    for x in range(len(land[0])):
      trees += 1 if land[y][x] == '|' else 0
      lumber += 1 if land[y][x] == '#' else 0
  return trees * lumber

def getHash(land):
  s = ''
  for y in range(len(land)):
    for x in range(len(land[0])):
      s += land[y][x]
  return s
  

def update(x,y,land):
  if x == 0 or y == 0 or x == len(land[0]) - 1 or y == len(land) - 1:
    return ' '
  
  i, j, trees, lumber = -1, - 1, 0, 0
  while j < 2:
    i = -1
    while i < 2:
      if i != 0 or j != 0:
        trees += 1 if land[j+y][i+x] == '|' else 0
        lumber += 1 if land[j+y][i+x] == '#' else 0
      i += 1
    j += 1

  if land[y][x] == '#' and (trees == 0 or lumber == 0):
    return '.'
  if land[y][x] == '.' and trees >= 3:
    return '|'
  if land[y][x] == '|' and lumber >= 3:
    return '#'
  return land[y][x]
      
ITERATIONS = 1000000000
hm = { getHash(land): 0}
for m in itertools.count(1):
  land = [[update(x,y,land) for x in range(len(land[0]))] for y in range(len(land))]
  hv = getHash(land)

  if m == 10:
    print(countLand(land))

  if hm.get(hv):
    remainingIterations = (ITERATIONS - m) % (m - hm[hv])

    for n in range(remainingIterations):
      land = [[update(x,y,land) for x in range(len(land[0]))] for y in range(len(land))]
    
    print(countLand(land))
    break
  hm[hv] = m
