import re
import sys
xMin, xMax, yMin, yMax = 500, 500, 9999, 1
scan = {}

def printMap():
  for y in range(len(m[0])):
    for x in range(len(m)):
      sys.stdout.write(m[x][y])
    sys.stdout.write('\n')
  sys.stdout.write('\n')
  sys.stdout.flush()

def processLine(s):
  global xMin, xMax, yMin, yMax
  data = map(lambda str: re.split('=|\.\.', str)  ,s.split(', '))
  minClay = int(data[1][1])
  maxClay = int(data[1][2])
  pivot = int(data[0][1])

  for n in range(minClay, maxClay + 1):
    x, y = (pivot, n)  if data[0][0] == 'x' else (n, pivot)
    xMin = min(x, xMin)
    xMax = max(x, xMax)
    yMin = min(y, yMin)
    yMax = max(y, yMax)
    scan[x,y] = '#'

map(processLine, open('input.txt').read().split('\n'))
scan[(500,yMin)] = '|'
m = [[ scan.get((x,y)) if scan.get((x,y)) else '.' for y in range(yMin, yMax + 1)] for x in range(xMin - 2, xMax + 3)]

def floodLine(x,y):
  i = x - 1
  while m[i][y] != '#' and m[i+1][y+1] in ['#', '~']:
    m[i][y] = '|'
    i -= 1
  i = x + 1
  while m[i][y] != '#' and m[i-1][y+1] in ['#', '~']:
    m[i][y] = '|'
    i += 1

def fillLine(x,y):
  i = x - 1
  while m[i][y] != '#':
    m[i][y] = '~'
    i -= 1
  i = x
  while m[i][y] != '#':
    m[i][y] = '~'
    i += 1

def isContained(x,y):
  hasLeft, hasRight = False, False
  i = x - 1
  while i > 0 and m[i][y+1] in ['#', '~']:
    if m[i][y] == '#':
      hasLeft = True
      break
    i -= 1

  i = x + 1
  while  i < len(m) and m[i][y+1] in ['#', '~']:
    if m[i][y] == '#':
      hasRight = True
      break
    i += 1
  return hasRight and hasLeft

def drop():
  count = 0
  for y in range(len(m[0]) - 1):
    for x in range(1, len(m) - 1):
      s = m[x][y + 1]

      if m[x][y] in ['~', '|']:
        count += 1

      if m[x][y] == '|':
        if s in ['#', '~']:
          if isContained(x,y):
            fillLine(x,y)
          else:
            floodLine(x,y)
    
        if s == '.':
          m[x][y+1] = '|'
  return count

count = 0
while True:
  newCount = drop()
  if newCount == count:
    break
  count = newCount

total_water = 0
still_water = 0
for y in range(0, len(m[0])):
  for x in range(len(m)):
    if m[x][y]  == '~':
      total_water += 1
      still_water += 1
    if m[x][y]  == '|':
      total_water += 1

print(total_water)
print(still_water)
