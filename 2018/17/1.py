import re
import sys
xMin, xMax, yMin, yMax = 500, 500, 1, 1
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
    xMin = x if x < xMin else xMin
    xMax = x if x > xMax else xMax
    yMin = y if y < yMin else yMin
    yMax = y if y > yMax else yMax
    scan[x,y] = '#'

map(processLine, open('input.txt').read().split('\n'))
scan[(500,0)] = '|'
m = [[ scan.get((x,y)) if scan.get((x,y)) else '.' for y in range(yMin - 1, yMax + 2)] for x in range(xMin - 1, xMax + 2)]


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
  while m[i][y+1] in ['#', '~'] and i > 0:
    if m[i][y] == '#':
      hasLeft = True
      break
    i -= 1

  i = x + 1
  while m[i][y+1] in ['#', '~'] and i < xMax - xMin:
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
  print(count)
print(newCount - 1)
